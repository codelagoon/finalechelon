"""
Echelon Equity - Member API Route
Fetches team members from Google Sheets for the public Team page
"""
import csv
import io
import json
import os
import logging
from datetime import datetime
from pathlib import Path
import re
import ssl
from typing import Any, Dict, List, Optional, Tuple
from urllib.error import HTTPError, URLError
from urllib.request import urlopen
import certifi
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/members", tags=["members"])

BACKEND_DIR = Path(__file__).resolve().parent.parent
SPREADSHEETS_READONLY_SCOPE = ['https://www.googleapis.com/auth/spreadsheets.readonly']
SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())


class MembersDataError(RuntimeError):
    """Raised when member data cannot be loaded from the configured source."""


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


TIMESTAMP_FORMATS = (
    "%m/%d/%Y %H:%M:%S",
    "%m/%d/%Y %H:%M",
)


def get_members_sheet_reference() -> Optional[str]:
    """Read the configured Google Sheet reference from the environment."""
    return normalize_text(os.environ.get("MEMBERS_SHEET_ID"))


def get_credentials_path() -> Path:
    """Resolve the credentials file path relative to the backend directory."""
    raw_path = normalize_text(os.environ.get("GOOGLE_CREDENTIALS_PATH")) or "./credentials.json"
    credentials_path = Path(raw_path)
    if credentials_path.is_absolute():
        return credentials_path
    return (BACKEND_DIR / credentials_path).resolve()


def normalize_text(value: Any) -> Optional[str]:
    """Safely normalize text values from sheet"""
    if value is None:
        return None
    text = str(value).strip()
    return text if text else None


def normalize_member_key(value: Optional[str]) -> Optional[str]:
    """Create a stable comparison key for deduplicating member submissions."""
    text = normalize_text(value)
    if not text:
        return None
    return re.sub(r'\s+', ' ', text).strip().lower()


def normalize_public_role(value: Optional[str]) -> Optional[str]:
    """Normalize common role variants to consistent public-facing titles."""
    text = normalize_text(value)
    if not text:
        return None

    normalized_role = re.sub(r'[^a-z0-9]+', ' ', text.lower()).strip()
    role_map = {
        'macro policy': "Investment Team: Macro Policy Analyst",
        'macro policy analyst': "Investment Team: Macro Policy Analyst",
        'investment team macro policy analyst': "Investment Team: Macro Policy Analyst",
        'technical analysis': "Investment Team: Technical Analyst",
        'technical analyst': "Investment Team: Technical Analyst",
        'investment team technical analyst': "Investment Team: Technical Analyst",
        'equity research': "Investment Team: Equity Research Analyst",
        'equity research analyst': "Investment Team: Equity Research Analyst",
        'investment team equity research analyst': "Investment Team: Equity Research Analyst",
        'pr marketing': "Marketing / Content",
        'marketing': "Marketing / Content",
        'content': "Marketing / Content",
        'marketing content': "Marketing / Content",
        'marketing and content': "Marketing / Content",
        'content marketing': "Marketing / Content",
        'leadership': "Leadership",
        'leadership team': "Leadership",
        'fundraising': "Fundraising",
        'fundraising partnerships': "Fundraising",
    }

    return role_map.get(normalized_role, text)


def parse_sheet_timestamp(value: Any) -> Optional[datetime]:
    """Parse Google Form timestamp strings when available."""
    text = normalize_text(value)
    if not text:
        return None

    for timestamp_format in TIMESTAMP_FORMATS:
        try:
            return datetime.strptime(text, timestamp_format)
        except ValueError:
            continue

    return None


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


def extract_private_sheet_key(sheet_reference: Optional[str]) -> Optional[str]:
    """
    Extract a private spreadsheet key from either a raw key or a Google Sheets edit URL.
    Published IDs (`2PACX-...`) are intentionally excluded because `open_by_key` does not
    accept them.
    """
    if not sheet_reference:
        return None

    reference = sheet_reference.strip()
    if reference.startswith("2PACX-"):
        return None

    url_match = re.search(r'/spreadsheets/d/([a-zA-Z0-9_-]+)', reference)
    if url_match:
        return url_match.group(1)

    if re.fullmatch(r'[a-zA-Z0-9_-]{20,}', reference):
        return reference

    return None


def extract_published_sheet_id(sheet_reference: Optional[str]) -> Optional[str]:
    """Extract a published Google Sheets ID (`2PACX-...`) from an ID or publish URL."""
    if not sheet_reference:
        return None

    reference = sheet_reference.strip()
    if reference.startswith("2PACX-"):
        return reference

    url_match = re.search(r'/spreadsheets/d/e/([a-zA-Z0-9_-]+)', reference)
    if url_match:
        return url_match.group(1)

    return None


def convert_google_drive_link(url: Optional[str]) -> Optional[str]:
    """
    Convert Google Drive share links to direct image URLs.
    Supports:
    - https://drive.google.com/file/d/{FILE_ID}/view
    - https://drive.google.com/open?id={FILE_ID}
    Returns a stable direct image URL or None if conversion fails.
    """
    if not url:
        return None
    
    url = url.strip()

    def build_direct_drive_image_url(file_id: str) -> str:
        return f"https://drive.usercontent.google.com/download?id={file_id}&export=view"
    
    # Pattern 1: /file/d/{FILE_ID}/view
    file_pattern = r'https://drive\.google\.com/file/d/([a-zA-Z0-9_-]+)'
    match = re.search(file_pattern, url)
    if match:
        file_id = match.group(1)
        return build_direct_drive_image_url(file_id)
    
    # Pattern 2: ?id={FILE_ID}
    open_pattern = r'[?&]id=([a-zA-Z0-9_-]+)'
    match = re.search(open_pattern, url)
    if match:
        file_id = match.group(1)
        return build_direct_drive_image_url(file_id)
    
    # Support existing Google Drive direct URLs and normalize them to the final content host.
    if 'drive.google.com' in url and 'uc?export=view' in url:
        match = re.search(open_pattern, url)
        if match:
            return build_direct_drive_image_url(match.group(1))
        return url

    if 'drive.usercontent.google.com' in url:
        return url
    
    # If it looks like a regular image URL, return it
    if url.startswith(('http://', 'https://')) and not 'drive.google.com' in url:
        return url
    
    return None


def parse_skills(skills_value: Any) -> List[str]:
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
    Returns None only when a row is missing the minimum data needed to render.
    """
    # Required fields
    full_name_col = column_map.get('full_name', 'Full Name')
    role_col = column_map.get('role', 'Role')
    
    full_name = normalize_text(row.get(full_name_col))
    role = normalize_public_role(row.get(role_col))
    
    if not full_name:
        logger.debug(f"Row {row_index}: Missing required field (name)")
        return None

    if not role:
        role = "Team Member"
    
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


def header_matches(actual_header: str, candidates: List[str]) -> bool:
    """Match column headers leniently to handle form-driven or descriptive headers."""
    normalized_header = actual_header.lower().strip()
    return any(
        candidate == normalized_header
        or candidate in normalized_header
        or normalized_header in candidate
        for candidate in candidates
    )


def build_column_map(headers: List[str]) -> dict:
    """
    Build a column mapping from actual sheet headers.
    Handles case-insensitive matching and common variations.
    """
    column_map = {}
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
        'timestamp': ['timestamp', 'submitted at', 'submission time', 'created at'],
        'show_profile': ['show my profile on the website?', 'show profile', 'visible', 'display', 'show on website']
    }
    
    for key, possible_names in mappings.items():
        for header in headers:
            if header_matches(header, possible_names):
                column_map[key] = header
                break
    
    return column_map


def dedupe_members(members_with_meta: List[Tuple[TeamMember, Optional[datetime], int]]) -> List[TeamMember]:
    """
    Keep only the latest submission per member.
    Dedupes primarily by normalized full name because the form may contain blank
    or changed emails across resubmissions.
    """
    latest_by_key: Dict[str, Tuple[TeamMember, Optional[datetime], int]] = {}

    for member, timestamp, row_index in members_with_meta:
        dedupe_key = normalize_member_key(member.full_name)
        if not dedupe_key:
            continue

        existing = latest_by_key.get(dedupe_key)
        if not existing:
            latest_by_key[dedupe_key] = (member, timestamp, row_index)
            continue

        _, existing_timestamp, existing_row_index = existing

        should_replace = False
        if timestamp and existing_timestamp:
            should_replace = timestamp >= existing_timestamp
        elif timestamp and not existing_timestamp:
            should_replace = True
        elif not timestamp and not existing_timestamp:
            should_replace = row_index >= existing_row_index
        else:
            should_replace = row_index >= existing_row_index

        if should_replace:
            latest_by_key[dedupe_key] = (member, timestamp, row_index)

    deduped_members = [
        item[0]
        for item in sorted(latest_by_key.values(), key=lambda value: value[2])
    ]

    duplicates_removed = len(members_with_meta) - len(deduped_members)
    if duplicates_removed > 0:
        logger.info("Removed %s duplicate member submissions", duplicates_removed)

    return deduped_members


def process_records(headers: List[str], all_records: List[dict]) -> List[TeamMember]:
    """Build the public team list from raw sheet headers and row data."""
    if not all_records:
        logger.info("No records found in sheet")
        return []

    column_map = build_column_map(headers)
    logger.info("Processing %s rows from sheet", len(all_records))

    timestamp_col = column_map.get('timestamp', 'Timestamp')
    members_with_meta = []
    for i, row in enumerate(all_records, start=2):  # start=2 because row 1 is headers
        try:
            member = process_sheet_row(row, column_map, i)
            if member:
                members_with_meta.append((
                    member,
                    parse_sheet_timestamp(row.get(timestamp_col)),
                    i,
                ))
                logger.debug("Row %s: Added member %s", i, member.full_name)
        except Exception as e:
            logger.warning("Row %s: Error processing row: %s", i, e)
            continue

    members = dedupe_members(members_with_meta)
    logger.info("Successfully processed %s approved members", len(members))
    return members


def load_service_account_credentials():
    """Load Google service account credentials from file or JSON env var."""
    from google.oauth2.service_account import Credentials

    credentials_path = get_credentials_path()
    if credentials_path.exists():
        return Credentials.from_service_account_file(
            str(credentials_path),
            scopes=SPREADSHEETS_READONLY_SCOPE
        )

    creds_json = os.environ.get("GOOGLE_CREDENTIALS_JSON")
    if creds_json:
        creds_dict = json.loads(creds_json)
        return Credentials.from_service_account_info(
            creds_dict,
            scopes=SPREADSHEETS_READONLY_SCOPE
        )

    raise MembersDataError(
        f"Google credentials not found. Checked {credentials_path} and GOOGLE_CREDENTIALS_JSON."
    )


def fetch_private_sheet_records(sheet_key: str) -> List[TeamMember]:
    """Fetch rows from a private Google Sheet using service-account access."""
    import gspread

    credentials = load_service_account_credentials()
    gc = gspread.authorize(credentials)
    spreadsheet = gc.open_by_key(sheet_key)
    worksheet = spreadsheet.sheet1
    headers = worksheet.row_values(1)
    records = worksheet.get_all_records()
    return process_records(headers, records)


def fetch_published_sheet_records(published_sheet_id: str) -> List[TeamMember]:
    """Fetch rows from a published Google Sheet using its public CSV export."""
    csv_url = f"https://docs.google.com/spreadsheets/d/e/{published_sheet_id}/pub?output=csv"

    try:
        with urlopen(csv_url, timeout=10, context=SSL_CONTEXT) as response:
            csv_text = response.read().decode("utf-8-sig")
    except HTTPError as exc:
        raise MembersDataError(
            f"Published sheet request failed with HTTP {exc.code} for {csv_url}"
        ) from exc
    except URLError as exc:
        raise MembersDataError(
            f"Could not reach published Google Sheet at {csv_url}: {exc.reason}"
        ) from exc

    reader = csv.DictReader(io.StringIO(csv_text))
    headers = reader.fieldnames or []
    records = list(reader)
    return process_records(headers, records)


async def fetch_members_from_sheet() -> tuple[List[TeamMember], str]:
    """
    Fetch and process members from Google Sheets.
    Returns list of TeamMember objects.
    """
    sheet_reference = get_members_sheet_reference()
    if not sheet_reference:
        raise MembersDataError("MEMBERS_SHEET_ID environment variable is not set.")

    private_sheet_key = extract_private_sheet_key(sheet_reference)
    published_sheet_id = extract_published_sheet_id(sheet_reference)

    errors = []

    if private_sheet_key:
        try:
            return fetch_private_sheet_records(private_sheet_key), "sheet"
        except Exception as exc:
            logger.warning("Private Google Sheet fetch failed: %s", exc)
            errors.append(f"private sheet: {exc}")

    if published_sheet_id:
        try:
            return fetch_published_sheet_records(published_sheet_id), "published_sheet"
        except Exception as exc:
            logger.warning("Published Google Sheet fetch failed: %s", exc)
            errors.append(f"published sheet: {exc}")

    if not errors:
        raise MembersDataError(
            "MEMBERS_SHEET_ID must be a Google Sheets edit URL/key or a published `2PACX-...` ID/URL."
        )

    raise MembersDataError("Unable to load team members. " + " | ".join(errors))


@router.get("/", response_model=MembersResponse)
async def get_members():
    """
    Get all team members from Google Sheets.
    """
    try:
        members, source = await fetch_members_from_sheet()
        
        return MembersResponse(
            success=True,
            count=len(members),
            members=members,
            source=source
        )
    except MembersDataError as e:
        logger.error("Failed to fetch members: %s", e)
        raise HTTPException(
            status_code=503,
            detail=str(e)
        )
    except Exception as e:
        logger.exception("Unexpected error fetching members")
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
        sheet_reference = get_members_sheet_reference()
        if not sheet_reference:
            return {"error": "No sheet ID configured"}

        private_sheet_key = extract_private_sheet_key(sheet_reference)
        published_sheet_id = extract_published_sheet_id(sheet_reference)
        credentials_path = get_credentials_path()

        debug_info = {
            "sheet_reference_prefix": sheet_reference[:16] + "..." if sheet_reference else None,
            "private_sheet_key_detected": bool(private_sheet_key),
            "published_sheet_detected": bool(published_sheet_id),
            "credentials_path": str(credentials_path),
            "credentials_exists": credentials_path.exists(),
        }

        if private_sheet_key:
            import gspread

            credentials = load_service_account_credentials()
            gc = gspread.authorize(credentials)
            spreadsheet = gc.open_by_key(private_sheet_key)
            worksheet = spreadsheet.sheet1
            headers = worksheet.row_values(1)
            all_records = worksheet.get_all_records()
            debug_info.update({
                "mode": "private_sheet",
                "headers": headers,
                "total_rows": len(all_records),
                "sample_row": all_records[0] if all_records else None,
            })
            return debug_info

        if published_sheet_id:
            csv_url = f"https://docs.google.com/spreadsheets/d/e/{published_sheet_id}/pub?output=csv"
            with urlopen(csv_url, timeout=10, context=SSL_CONTEXT) as response:
                csv_text = response.read().decode("utf-8-sig")
            reader = csv.DictReader(io.StringIO(csv_text))
            records = list(reader)
            debug_info.update({
                "mode": "published_sheet",
                "csv_url": csv_url,
                "headers": reader.fieldnames or [],
                "total_rows": len(records),
                "sample_row": records[0] if records else None,
            })
            return debug_info

        return {**debug_info, "error": "Sheet reference format is not recognized"}
        
    except Exception as e:
        return {"error": str(e)}
