"""
Newsletter Signup API Route
Handles newsletter subscriptions and adds contacts to Resend
"""
import os
import logging
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr
import resend

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/newsletter", tags=["newsletter"])

# Initialize Resend
resend.api_key = os.environ.get("RESEND_API_KEY")

class NewsletterSignup(BaseModel):
    email: EmailStr
    source: str = "unknown"
    segment: str = None

@router.post("/subscribe")
async def subscribe(signup: NewsletterSignup, request: Request):
    # Rate limiting and validation can be added here if needed
    try:
        # Add contact to Resend
        contact_params = {
            "email": signup.email,
            "unsubscribed": False,
            "audiences": [],  # Optionally specify audience IDs
            "user_supplied_id": None,
            "first_name": None,
            "last_name": None,
            "custom_fields": {
                "source": signup.source,
                "segment": signup.segment,
                "ip": request.client.host
            }
        }
        contact = resend.Contacts.create(contact_params)
        logger.info(f"Newsletter contact created: {contact}")
        return {"success": True, "message": "You are subscribed to Echelon market notes."}
    except resend.errors.ResendAPIError as e:
        logger.error(f"Resend API error: {e}")
        raise HTTPException(status_code=400, detail="Failed to subscribe. Please try again later.")
    except Exception as e:
        logger.error(f"Newsletter signup error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")
