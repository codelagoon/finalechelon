#!/usr/bin/env python3
"""
Simple test server for contact form without requiring Supabase/Resend setup
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import json
from datetime import datetime

app = FastAPI(title="Echelon Contact Test API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://echelonequity.co", "https://www.echelonequity.co"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ApplicationForm(BaseModel):
    name: str
    email: EmailStr
    role: str
    institution: str
    academic_level: str
    graduation_year: str
    field_of_study: str
    why_echelon: str
    relevant_experience: Optional[str] = None
    analytical_response: Optional[str] = None
    resume_url: Optional[str] = None
    work_sample_url: Optional[str] = None

@app.post("/api/contact")
async def submit_contact_form(form: ContactForm):
    try:
        # Log the submission
        timestamp = datetime.now().isoformat()
        submission_data = {
            "timestamp": timestamp,
            "name": form.name,
            "email": form.email,
            "subject": form.subject,
            "message": form.message
        }
        
        print(f"[{timestamp}] Contact Form Submission:")
        print(f"  From: {form.name} ({form.email})")
        print(f"  Subject: {form.subject}")
        print(f"  Message: {form.message[:100]}...")
        
        # Save to a local file for testing
        with open("contact_submissions.json", "a") as f:
            f.write(json.dumps(submission_data) + "\n")
        
        return {
            "success": True,
            "message": "Message received. We'll respond within 24-48 hours.",
            "submission_id": f"test_{timestamp.replace(':', '-').replace('.', '-')}"
        }

    except Exception as e:
        print(f"Contact form error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process submission")

@app.post("/functions/v1/submit-application")
async def submit_application(form: ApplicationForm):
    try:
        # Log the application submission
        timestamp = datetime.now().isoformat()
        application_data = {
            "timestamp": timestamp,
            "name": form.name,
            "email": form.email,
            "role": form.role,
            "institution": form.institution,
            "academic_level": form.academic_level,
            "graduation_year": form.graduation_year,
            "field_of_study": form.field_of_study,
            "why_echelon": form.why_echelon,
            "relevant_experience": form.relevant_experience,
            "analytical_response": form.analytical_response,
            "resume_url": form.resume_url,
            "work_sample_url": form.work_sample_url
        }
        
        print(f"[{timestamp}] Application Submission:")
        print(f"  From: {form.name} ({form.email})")
        print(f"  Role: {form.role}")
        print(f"  Institution: {form.institution}")
        print(f"  Academic Level: {form.academic_level}")
        print(f"  Field: {form.field_of_study}")
        
        # Save to a local file for testing
        with open("application_submissions.json", "a") as f:
            f.write(json.dumps(application_data) + "\n")
        
        return {
            "success": True,
            "message": "Application submitted successfully! We will review your application and be in touch.",
            "application_id": f"app_{timestamp.replace(':', '-').replace('.', '-')}"
        }

    except Exception as e:
        print(f"Application submission error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process application")

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Contact form test server running"}

if __name__ == "__main__":
    import uvicorn
    print("Starting contact form test server on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
