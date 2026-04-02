import os
import asyncio
import logging
import uuid
from datetime import datetime, timezone
from typing import Optional
from pathlib import Path
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel, EmailStr, Field
import resend
from supabase import create_client, Client

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

# Initialize Resend
resend.api_key = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
ADMISSIONS_EMAIL = os.environ.get("ADMISSIONS_EMAIL", "admissions@echelonequity.co")

# Initialize Supabase
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
SUPABASE_BUCKET = os.environ.get("SUPABASE_BUCKET", "applications")

logger.info(f"Supabase URL configured: {bool(SUPABASE_URL)}")
logger.info(f"Supabase Key configured: {bool(SUPABASE_KEY)}")

supabase: Client = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        logger.info("Supabase client initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Supabase: {e}")
else:
    logger.warning("Supabase credentials not found in environment")

router = APIRouter(prefix="/applications", tags=["applications"])

# Pydantic Models
class Application(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    institution: str
    academic_level: str
    graduation_year: str
    field_of_study: str
    track_of_interest: str
    why_echelon: str
    relevant_experience: Optional[str] = None
    analytical_response: Optional[str] = None
    resume_url: Optional[str] = None
    work_sample_url: Optional[str] = None
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Helper Functions
async def upload_file_to_supabase(file: UploadFile, applicant_name: str) -> str:
    """Upload file to Supabase Storage and return public URL"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    
    try:
        # Generate unique filename
        file_extension = file.filename.split(".")[-1] if "." in file.filename else "pdf"
        sanitized_name = applicant_name.replace(" ", "_").lower()
        file_name = f"{sanitized_name}/{uuid.uuid4()}.{file_extension}"
        
        # Read file content
        file_content = await file.read()
        
        # Validate file size (10MB limit)
        if len(file_content) > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail=f"File {file.filename} exceeds 10MB limit")
        
        # Upload to Supabase
        response = supabase.storage.from_(SUPABASE_BUCKET).upload(
            path=file_name,
            file=file_content,
            file_options={
                "content-type": file.content_type or "application/pdf",
                "upsert": "false"
            }
        )
        
        # Get public URL
        public_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(file_name)
        
        logger.info(f"File uploaded successfully: {file_name}")
        return public_url
        
    except Exception as e:
        logger.error(f"Supabase upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")


async def send_application_email(application: Application):
    """Send email notification to admissions team"""
    try:
        # Build HTML email content
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
                        New Application Received
                    </h2>
                    
                    <h3 style="margin-top: 30px;">Applicant Information</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px; font-weight: bold; width: 40%;">Full Name:</td>
                            <td style="padding: 8px;">{application.full_name}</td>
                        </tr>
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 8px; font-weight: bold;">Email:</td>
                            <td style="padding: 8px;">{application.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold;">Institution:</td>
                            <td style="padding: 8px;">{application.institution}</td>
                        </tr>
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 8px; font-weight: bold;">Academic Level:</td>
                            <td style="padding: 8px;">{application.academic_level}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold;">Graduation Year:</td>
                            <td style="padding: 8px;">{application.graduation_year}</td>
                        </tr>
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 8px; font-weight: bold;">Field of Study:</td>
                            <td style="padding: 8px;">{application.field_of_study}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold;">Track of Interest:</td>
                            <td style="padding: 8px;">{application.track_of_interest}</td>
                        </tr>
                    </table>
                    
                    <h3 style="margin-top: 30px;">Why Echelon</h3>
                    <p style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid #000;">
                        {application.why_echelon}
                    </p>
                    
                    {f'''
                    <h3 style="margin-top: 30px;">Relevant Experience</h3>
                    <p style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid #000;">
                        {application.relevant_experience}
                    </p>
                    ''' if application.relevant_experience else ''}
                    
                    {f'''
                    <h3 style="margin-top: 30px;">Short Response</h3>
                    <p style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid #000;">
                        {application.analytical_response}
                    </p>
                    ''' if application.analytical_response else ''}
                    
                    <h3 style="margin-top: 30px;">Uploaded Documents</h3>
                    <div style="background-color: #f5f5f5; padding: 15px;">
                        {f'<p>📄 <strong>Resume/CV:</strong> <a href="{application.resume_url}" style="color: #000;">Download Resume</a></p>' if application.resume_url else '<p>No resume uploaded</p>'}
                        {f'<p>📊 <strong>Work Sample:</strong> <a href="{application.work_sample_url}" style="color: #000;">Download Work Sample</a></p>' if application.work_sample_url else '<p>No work sample uploaded</p>'}
                    </div>
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #ccc; padding-top: 15px;">
                        Submitted: {application.submitted_at.strftime("%B %d, %Y at %I:%M %p UTC")}
                    </p>
                </div>
            </body>
        </html>
        """
        
        # Send email using Resend (async)
        params = {
            "from": SENDER_EMAIL,
            "to": [ADMISSIONS_EMAIL],
            "subject": f"New Application: {application.full_name} - {application.track_of_interest}",
            "html": html_content
        }
        
        email_response = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent successfully: {email_response.get('id')}")
        
    except Exception as e:
        # Log but don't fail - Resend testing mode requires domain verification
        error_msg = str(e)
        if "testing emails" in error_msg.lower() or "verify a domain" in error_msg.lower():
            logger.warning(f"Email not sent (Resend requires domain verification for production): {error_msg}")
        else:
            logger.error(f"Email sending failed: {error_msg}")
        # Don't raise exception - application is still saved successfully


# Routes
@router.post("/submit")
async def submit_application(
    full_name: str = Form(...),
    email: EmailStr = Form(...),
    institution: str = Form(...),
    academic_level: str = Form(...),
    graduation_year: str = Form(...),
    field_of_study: str = Form(...),
    track_of_interest: str = Form(...),
    why_echelon: str = Form(...),
    relevant_experience: Optional[str] = Form(None),
    analytical_response: Optional[str] = Form(None),
    resume: Optional[UploadFile] = File(None),
    work_sample: Optional[UploadFile] = File(None)
):
    """
    Submit application with file uploads to Supabase Storage
    """
    try:
        # Validate and upload resume (PDF only)
        resume_url = None
        if resume:
            if not resume.content_type == "application/pdf":
                raise HTTPException(status_code=400, detail="Resume must be a PDF file")
            resume_url = await upload_file_to_supabase(resume, full_name)
        
        # Validate and upload work sample
        work_sample_url = None
        if work_sample:
            allowed_types = ["application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
                           "application/vnd.ms-excel", "application/msword",
                           "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
            if work_sample.content_type not in allowed_types:
                raise HTTPException(
                    status_code=400, 
                    detail="Work sample must be PDF, Excel (.xlsx, .xls), or Word (.doc, .docx)"
                )
            work_sample_url = await upload_file_to_supabase(work_sample, full_name)
        
        # Create application object
        application = Application(
            full_name=full_name,
            email=email,
            institution=institution,
            academic_level=academic_level,
            graduation_year=graduation_year,
            field_of_study=field_of_study,
            track_of_interest=track_of_interest,
            why_echelon=why_echelon,
            relevant_experience=relevant_experience,
            analytical_response=analytical_response,
            resume_url=resume_url,
            work_sample_url=work_sample_url
        )
        
        # Save to MongoDB (get db from dependency injection)
        from server import db as database
        await database.applications.insert_one(
            application.model_dump()
        )
        
        # Send email notification (async, don't wait)
        asyncio.create_task(send_application_email(application))
        
        return {
            "success": True,
            "message": "Application submitted successfully",
            "application_id": application.id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Application submission error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Application submission failed: {str(e)}")


@router.get("/")
async def get_applications():
    """
    Retrieve all applications from database
    """
    try:
        from server import db as database
        applications = await database.applications.find(
            {}, {"_id": 0}
        ).sort("submitted_at", -1).to_list(1000)
        
        return {
            "success": True,
            "count": len(applications),
            "applications": applications
        }
        
    except Exception as e:
        logger.error(f"Failed to retrieve applications: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve applications: {str(e)}")
