"""
Echelon Equity - Member API Route
Fetches approved members from Google Sheets for public Team page
"""
import os
import logging
import re
from typing import List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/members", tags=["members"])

# Google Sheets configuration from environment
MEMBERS_SHEET_ID = os.environ.get("MEMBERS_SHEET_ID")
GOOGLE_CREDENTIALS_PATH = os.environ.get("GOOGLE_CREDENTIALS_PATH", "./credentials.json")


class TeamMember(BaseModel):
    """Team member data model"""
    id: str
    full_name: str
    role: str
    short_bio: Optional[str] = None
    full_bio: Optional[str] = None
    email: Optional[str] = None
    linkedin_url: Optional[str] = None
    headshot_url: Optional[str] = None
    school: Optional[str] = None
    skills: List[str] = []


class MembersResponse(BaseModel):
    """Response model for members list"""
    success: bool
    count: int
    members: List[TeamMember]
    source: str  # 'sheet' or 'unavailable'


def normalize_text(value: any) -> Optional[str]:
    """Safely normalize text values from sheet"""
    if value is None:
        return None
    text = str(value).strip()
    return text if text else None


def is_approved_visibility(value: any) -> bool:
    """
    Check if visibility value indicates approved for display.
    Treats: yes, Yes, YES, true, TRUE, y, 1 as approved.
    """
    if value is None:
        return False
    text = str(value).strip().lower()
    return text in ('yes', 'true', 'y', '1')


def normalize_url(url: Optional[str]) -> Optional[str]:
    """Normalize and validate URLs"""
    if not url:
        return None
    url = url.strip()
    if not url or url.lower() in ('n/a', 'na', 'none', '-'):
        return None
    
    # Basic URL validation - must start with http
    if not url.startswith(('http://', 'https://')):
        return None
    
    return url


def convert_google_drive_link(url: Optional[str]) -> Optional[str]:
    """
    Convert Google Drive share links to direct image URLs.
    Supports:
    - https://drive.google.com/file/d/{FILE_ID}/view
    - https://drive.google.com/open?id={FILE_ID}
    Returns direct link format for images or None if conversion fails.
    """
    if not url:
        return None
    
    url = url.strip()
    
    # Pattern 1: /file/d/{FILE_ID}/view
    file_pattern = r'https://drive\.google\.com/file/d/([a-zA-Z0-9_-]+)'
    match = re.search(file_pattern, url)
    if match:
        file_id = match.group(1)
        return f"https://drive.google.com/uc?export=view&id={file_id}"
    
    # Pattern 2: ?id={FILE_ID}
    open_pattern = r'[?&]id=([a-zA-Z0-9_-]+)'
    match = re.search(open_pattern, url)
    if match:
        file_id = match.group(1)
        return f"https://drive.google.com/uc?export=view&id={file_id}"
    
    # If it's already a direct-ish URL, return as-is
    if 'drive.google.com' in url and 'uc?export=view' in url:
        return url
    
    # If it looks like a regular image URL, return it
    if url.startswith(('http://', 'https://')) and not 'drive.google.com' in url:
        return url
    
    return None


def parse_skills(skills_value: any) -> List[str]:
    """
    Parse skills from checkbox or text values.
    Handles comma-separated, semicolon-separated, and list formats.
    """
    if not skills_value:
        return []
    
    text = str(skills_value).strip()
    if not text or text.lower() in ('n/a', 'na', 'none', '-'):
        return []
    
    # Split by comma or semicolon
    delimiters = [',', ';']
    for delim in delimiters:
        if delim in text:
            skills = [s.strip() for s in text.split(delim)]
            return [s for s in skills if s]
    
    # Single value or checkbox value
    return [text] if text else []


def process_sheet_row(row: dict, column_map: dict, row_index: int) -> Optional[TeamMember]:
    """
    Process a single sheet row into a TeamMember object.
    Returns None if row should not be displayed.
    """
    # Get visibility field
    visibility_col = column_map.get('show_profile', 'Show my profile on the website?')
    visibility_value = row.get(visibility_col)
    
    if not is_approved_visibility(visibility_value):
        return None
    
    # Required fields
    full_name_col = column_map.get('full_name', 'Full Name')
    role_col = column_map.get('role', 'Role')
    
    full_name = normalize_text(row.get(full_name_col))
    role = normalize_text(row.get(role_col))
    
    if not full_name or not role:
        logger.debug(f"Row {row_index}: Missing required fields (name or role)")
        return None
    
    # Optional fields
    short_bio_col = column_map.get('short_bio', 'Short Bio')
    full_bio_col = column_map.get('full_bio', 'Full Bio')
    email_col = column_map.get('email', 'Email')
    linkedin_col = column_map.get('linkedin', 'LinkedIn URL')
    headshot_col = column_map.get('headshot', 'Headshot')
    school_col = column_map.get('school', 'school')
    skills_col = column_map.get('skills', 'Skills / Sectors of Interest')
    
    # Process headshot URL
    raw_headshot = normalize_text(row.get(headshot_col))
    headshot_url = convert_google_drive_link(raw_headshot) if raw_headshot else None
    
    # Create unique ID from name (lowercase, replace spaces with hyphens)
    member_id = re.sub(r'[^a-zA-Z0-9\s]', '', full_name).strip().lower().replace(' ', '-')
    
    member = TeamMember(
        id=member_id,
        full_name=full_name,
        role=role,
        short_bio=normalize_text(row.get(short_bio_col)),
        full_bio=normalize_text(row.get(full_bio_col)),
        email=normalize_text(row.get(email_col)),
        linkedin_url=normalize_url(normalize_text(row.get(linkedin_col))),
        headshot_url=headshot_url,
        school=normalize_text(row.get(school_col)),
        skills=parse_skills(row.get(skills_col))
    )
    
    return member


def build_column_map(headers: List[str]) -> dict:
    """
    Build a column mapping from actual sheet headers.
    Handles case-insensitive matching and common variations.
    """
    column_map = {}
    header_lower = {h.lower().strip(): h for h in headers}
    
    # Map expected columns to actual header names
    mappings = {
        'email': ['email', 'e-mail', 'mail'],
        'role': ['role', 'title', 'position'],
        'short_bio': ['short bio', 'shortbio', 'bio short', 'preview'],
        'full_name': ['full name', 'fullname', 'name', 'display name'],
        'headshot': ['headshot', 'photo', 'image', 'picture', 'profile photo'],
        'school': ['school', 'institution', 'university', 'college'],
        'full_bio': ['full bio', 'long bio', 'bio', 'biography', 'description'],
        'linkedin': ['linkedin url', 'linkedin', 'linked in', 'li url'],
        'skills': ['skills / sectors of interest', 'skills', 'sectors', 'interests', 'tags'],
        'show_profile': ['show my profile on the website?', 'show profile', 'visible', 'display', 'show on website']
    }
    
    for key, possible_names in mappings.items():
        for name in possible_names:
            if name in header_lower:
                column_map[key] = header_lower[name]
                break
    
    return column_map


async def fetch_members_from_sheet() -> List[TeamMember]:
    """
    Fetch and process members from Google Sheets.
    Returns list of approved TeamMember objects.
    """
    try:
        # Import gspread here to handle case where it's not installed
        import gspread
        from google.oauth2.service_account import Credentials
        
        # Authenticate with service account
        if os.path.exists(GOOGLE_CREDENTIALS_PATH):
            credentials = Credentials.from_service_account_file(
                GOOGLE_CREDENTIALS_PATH,
                scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
            )
        else:
            # Try to load credentials from environment variable
            import json
            creds_json = os.environ.get("GOOGLE_CREDENTIALS_JSON")
            if creds_json:
                creds_dict = json.loads(creds_json)
                credentials = Credentials.from_service_account_info(
                    creds_dict,
                    scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
                )
            else:
                logger.error("No Google credentials found")
                return []
        
        gc = gspread.authorize(credentials)
        
        if not MEMBERS_SHEET_ID:
            logger.error("MEMBERS_SHEET_ID environment variable not set")
            return []
        
        # Open the spreadsheet and first worksheet
        spreadsheet = gc.open_by_key(MEMBERS_SHEET_ID)
        worksheet = spreadsheet.sheet1
        
        # Get all records
        all_records = worksheet.get_all_records()
        
        if not all_records:
            logger.info("No records found in sheet")
            return []
        
        # Get headers and build column mapping
        headers = worksheet.row_values(1)
        column_map = build_column_map(headers)
        
        logger.info(f"Processing {len(all_records)} rows from sheet")
        
        # Process each row
        members = []
        for i, row in enumerate(all_records, start=2):  # start=2 because row 1 is headers
            try:
                member = process_sheet_row(row, column_map, i)
                if member:
                    members.append(member)
                    logger.debug(f"Row {i}: Added member {member.full_name}")
            except Exception as e:
                logger.warning(f"Row {i}: Error processing row: {e}")
                continue
        
        logger.info(f"Successfully processed {len(members)} approved members")
        return members
        
    except Exception as e:
        logger.error(f"Error fetching from Google Sheets: {e}")
        return []


@router.get("/", response_model=MembersResponse)
async def get_members():
    """
    Get all approved team members from Google Sheets.
    Returns only members with approved visibility setting.
    """
    try:
        members = await fetch_members_from_sheet()
        
        return MembersResponse(
            success=True,
            count=len(members),
            members=members,
            source="sheet"
        )
        
    except Exception as e:
        logger.error(f"Failed to fetch members: {e}")
        # Return error response - don't fall back to sample data
        raise HTTPException(
            status_code=503,
            detail="Team member data is currently unavailable. Please try again later."
        )


@router.get("/debug")
async def get_members_debug():
    """
    Debug endpoint to check raw sheet data.
    Only returns limited info for troubleshooting.
    """
    if os.environ.get("ENVIRONMENT") != "development":
        raise HTTPException(status_code=404)
    
    try:
        import gspread
        from google.oauth2.service_account import Credentials
        
        if os.path.exists(GOOGLE_CREDENTIALS_PATH):
            credentials = Credentials.from_service_account_file(
                GOOGLE_CREDENTIALS_PATH,
                scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
            )
        else:
            import json
            creds_json = os.environ.get("GOOGLE_CREDENTIALS_JSON")
            if creds_json:
                creds_dict = json.loads(creds_json)
                credentials = Credentials.from_service_account_info(
                    creds_dict,
                    scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
                )
            else:
                return {"error": "No credentials found"}
        
        gc = gspread.authorize(credentials)
        
        if not MEMBERS_SHEET_ID:
            return {"error": "No sheet ID configured"}
        
        spreadsheet = gc.open_by_key(MEMBERS_SHEET_ID)
        worksheet = spreadsheet.sheet1
        
        headers = worksheet.row_values(1)
        all_records = worksheet.get_all_records()
        
        return {
            "sheet_id": MEMBERS_SHEET_ID[:10] + "..." if MEMBERS_SHEET_ID else None,
            "headers": headers,
            "total_rows": len(all_records),
            "sample_row": all_records[0] if all_records else None
        }
        
    except Exception as e:
        return {"error": str(e)}
