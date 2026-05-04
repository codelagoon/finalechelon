from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import os
from supabase import create_client, Client
from resend import Resend
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Echelon Equity API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://echelonequity.co", "https://www.echelonequity.co"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

# Initialize Resend
resend = Resend(api_key=os.getenv("RESEND_API_KEY"))

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@app.post("/api/contact")
async def submit_contact_form(form: ContactForm):
    try:
        # 1. Store in Supabase
        result = supabase.table("contact_submissions").insert({
            "name": form.name,
            "email": form.email,
            "subject": form.subject,
            "message": form.message
        }).execute()

        if not result.data:
            raise HTTPException(status_code=500, detail="Failed to store submission")

        submission_id = result.data[0]["id"]

        # 2. Send email notification via Resend
        email_result = send_contact_notification(form, submission_id)

        # 3. Update submission with email status
        supabase.table("contact_submissions").update({
            "email_sent": email_result["success"],
            "status": "notified" if email_result["success"] else "email_failed"
        }).eq("id", submission_id).execute()

        return {
            "success": True,
            "message": "Message received. We'll respond within 24-48 hours.",
            "submission_id": submission_id
        }

    except Exception as e:
        print(f"Contact form error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process submission")

def send_contact_notification(form: ContactForm, submission_id: str):
    """Send email notification for new contact submission"""
    try:
        subject_labels = {
            "investment": "Investment Inquiry",
            "partnership": "Partnership Opportunity",
            "media": "Media & Press",
            "other": "Other"
        }

        # Send to Echelon team
        resend.emails.send({
            "from": "Echelon Equity <contact@echelonequity.co>",
            "to": ["team@echelonequity.co"],
            "reply_to": form.email,
            "subject": f"New Contact: {subject_labels.get(form.subject, form.subject)}",
            "html": f"""
            <div style="font-family: Georgia, serif; max-width: 600px; padding: 20px;">
                <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
                    New Contact Submission
                </h2>
                
                <p><strong>From:</strong> {form.name} ({form.email})</p>
                <p><strong>Subject:</strong> {subject_labels.get(form.subject, form.subject)}</p>
                <p><strong>Submission ID:</strong> {submission_id}</p>
                
                <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 3px solid #000;">
                    <p style="white-space: pre-wrap; margin: 0;">{form.message}</p>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                <p style="color: #666; font-size: 12px;">
                    Received: {result.data[0]["created_at"] if result.data else "Just now"}<br>
                    View in admin dashboard
                </p>
            </div>
            """
        })

        # Send confirmation to user
        resend.emails.send({
            "from": "Echelon Equity <contact@echelonequity.co>",
            "to": [form.email],
            "subject": "We've received your message",
            "html": f"""
            <div style="font-family: Georgia, serif; max-width: 600px; padding: 20px;">
                <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
                    Message Received
                </h2>
                
                <p>Hi {form.name},</p>
                
                <p>Thanks for reaching out. We've received your message regarding 
                <strong>{subject_labels.get(form.subject, form.subject)}</strong> and will get back to you within 24-48 hours.</p>
                
                <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 3px solid #000;">
                    <p style="margin: 0; font-style: italic;">Your message:</p>
                    <p style="white-space: pre-wrap; margin: 10px 0 0 0;">{form.message}</p>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                <p style="color: #666; font-size: 12px;">
                    Echelon Equity<br>
                    the bar is higher
                </p>
            </div>
            """
        })

        return {"success": True}

    except Exception as e:
        print(f"Email sending error: {str(e)}")
        return {"success": False, "error": str(e)}

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
