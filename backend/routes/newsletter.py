import json
import logging
import os
import asyncio
import uuid
from collections import defaultdict, deque
from datetime import datetime, timezone
from time import monotonic
from typing import Any, Deque, Dict, Optional

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, StringConstraints
from pymongo.errors import DuplicateKeyError
from typing_extensions import Annotated
import resend

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/newsletter", tags=["newsletter"])

SourceField = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]
SegmentField = Annotated[Optional[str], StringConstraints(strip_whitespace=True, max_length=80)]
EventNameField = Annotated[str, StringConstraints(strip_whitespace=True, min_length=3, max_length=80)]

IP_RATE_WINDOW_SECONDS = int(os.environ.get("NEWSLETTER_IP_WINDOW_SECONDS", "60"))
IP_RATE_LIMIT = int(os.environ.get("NEWSLETTER_IP_RATE_LIMIT", "20"))
EMAIL_RATE_WINDOW_SECONDS = int(os.environ.get("NEWSLETTER_EMAIL_WINDOW_SECONDS", "3600"))
EMAIL_RATE_LIMIT = int(os.environ.get("NEWSLETTER_EMAIL_RATE_LIMIT", "5"))
NEWSLETTER_FROM_EMAIL = os.environ.get("NEWSLETTER_FROM_EMAIL", os.environ.get("SENDER_EMAIL", "onboarding@resend.dev"))
NEWSLETTER_TEAM_EMAIL = os.environ.get(
    "NEWSLETTER_TEAM_EMAIL",
    os.environ.get("ADMISSIONS_EMAIL", "admissions@echelonequity.co"),
)
NEWSLETTER_REPLY_TO = os.environ.get("NEWSLETTER_REPLY_TO")
NEWSLETTER_CONTACT_SEGMENT_ID = os.environ.get("NEWSLETTER_CONTACT_SEGMENT_ID")
NEWSLETTER_AUDIENCE_ID = os.environ.get("NEWSLETTER_AUDIENCE_ID")

resend.api_key = os.environ.get("RESEND_API_KEY")

_ip_hits: Dict[str, Deque[float]] = defaultdict(deque)
_email_hits: Dict[str, Deque[float]] = defaultdict(deque)


def is_rate_limited(bucket: Dict[str, Deque[float]], key: str, window_seconds: int, max_requests: int) -> bool:
    now = monotonic()
    timestamps = bucket[key]

    while timestamps and (now - timestamps[0]) > window_seconds:
        timestamps.popleft()

    if len(timestamps) >= max_requests:
        return True

    timestamps.append(now)
    return False


class NewsletterSubscribeRequest(BaseModel):
    email: EmailStr
    source: SourceField
    segment: SegmentField = None
    website: SegmentField = None


class NewsletterSubscribeResponse(BaseModel):
    success: bool
    message: str
    subscriber_id: str
    email: EmailStr
    request_id: str


class NewsletterAnalyticsEventRequest(BaseModel):
    event: EventNameField
    source: SourceField
    segment: SegmentField = None
    status: SegmentField = None
    request_id: SegmentField = None


class AnalyticsHook:
    async def track(self, event_name: str, payload: Dict[str, Any]) -> None:
        # This log is an intentional integration hook for future analytics providers.
        logger.info("analytics_event=%s payload=%s", event_name, json.dumps(payload, default=str))


class NewsletterProviderGateway:
    async def _add_contact_to_segment(self, email: str, segment_id: str) -> Optional[str]:
        try:
            response = await asyncio.to_thread(
                resend.Contacts.Segments.add,
                {"email": email, "segment_id": segment_id},
            )
            return response.get("id") if isinstance(response, dict) else None
        except Exception as exc:
            logger.warning(
                "newsletter_contact_segment_add_failed email=%s segment_id=%s error=%s",
                email,
                segment_id,
                str(exc),
            )
            return None

    async def _create_contact(self, subscriber: Dict[str, Any]) -> Optional[str]:
        if not resend.api_key:
            return None

        params: Dict[str, Any] = {
            "email": subscriber["email"],
            "unsubscribed": False,
            "properties": {
                "source": subscriber.get("source") or "unknown",
                "segment": subscriber.get("segment") or "none",
            },
        }

        try:
            response = await asyncio.to_thread(resend.Contacts.create, params)
            return response.get("id") if isinstance(response, dict) else None
        except Exception as exc:
            error_message = str(exc).lower()
            if "already exists" in error_message or "409" in error_message:
                logger.info("newsletter_contact_exists email=%s attempting_update=true", subscriber["email"])
                try:
                    update_params: Dict[str, Any] = {
                        "email": subscriber["email"],
                        "unsubscribed": False,
                    }
                    update_params["properties"] = params.get("properties", {})

                    update_response = await asyncio.to_thread(resend.Contacts.update, update_params)
                    return update_response.get("id") if isinstance(update_response, dict) else None
                except Exception as update_exc:
                    logger.warning("newsletter_contact_update_failed error=%s", str(update_exc))
                    return None
            logger.warning("newsletter_contact_create_failed error=%s", str(exc))
            return None

    async def _send_email(self, params: Dict[str, Any]) -> Optional[str]:
        if not resend.api_key:
            logger.info("newsletter_resend_skipped reason=missing_api_key")
            return None

        try:
            response = await asyncio.to_thread(resend.Emails.send, params)
            message_id = response.get("id") if isinstance(response, dict) else None
            return message_id
        except Exception as exc:
            logger.warning("newsletter_resend_failed error=%s", str(exc))
            return None

    async def on_subscriber_created(self, subscriber: Dict[str, Any]) -> None:
        contact_id = await self._create_contact(subscriber)
        audience_membership_id = None
        segment_membership_id = None
        if NEWSLETTER_AUDIENCE_ID:
            audience_membership_id = await self._add_contact_to_segment(
                subscriber["email"], NEWSLETTER_AUDIENCE_ID
            )
        if NEWSLETTER_CONTACT_SEGMENT_ID:
            segment_membership_id = await self._add_contact_to_segment(
                subscriber["email"], NEWSLETTER_CONTACT_SEGMENT_ID
            )

        reply_to = [NEWSLETTER_REPLY_TO] if NEWSLETTER_REPLY_TO else None
        team_email_id = await self._send_email(
            {
                "from": NEWSLETTER_FROM_EMAIL,
                "to": [NEWSLETTER_TEAM_EMAIL],
                "subject": f"New newsletter subscriber: {subscriber['email']}",
                "html": (
                    f"<p>A new newsletter subscription was captured.</p>"
                    f"<p><strong>Email:</strong> {subscriber['email']}</p>"
                    f"<p><strong>Source:</strong> {subscriber.get('source') or 'unknown'}</p>"
                    f"<p><strong>Segment:</strong> {subscriber.get('segment') or 'none'}</p>"
                    f"<p><strong>Subscriber ID:</strong> {subscriber['id']}</p>"
                ),
                **({"reply_to": reply_to} if reply_to else {}),
            }
        )

        welcome_email_id = await self._send_email(
            {
                "from": NEWSLETTER_FROM_EMAIL,
                "to": [subscriber["email"]],
                "subject": "You’re subscribed to Echelon Equity newsletter",
                "html": (
                    "<p>Thanks for subscribing to Echelon Equity market notes.</p>"
                    "<p>You’ll receive student-led equity research, memo highlights, and market context.</p>"
                    "<p>If this was not you, you can ignore this email.</p>"
                ),
                **({"reply_to": reply_to} if reply_to else {}),
            }
        )

        logger.info(
            "newsletter_provider_hook event=subscriber_created subscriber_id=%s contact_id=%s audience_membership_id=%s segment_membership_id=%s team_email_id=%s welcome_email_id=%s",
            subscriber["id"],
            contact_id,
            audience_membership_id,
            segment_membership_id,
            team_email_id,
            welcome_email_id,
        )


class NewsletterSubscriptionService:
    def __init__(
        self,
        database,
        analytics_hook: Optional[AnalyticsHook] = None,
        provider_gateway: Optional[NewsletterProviderGateway] = None,
    ):
        self.database = database
        self.analytics_hook = analytics_hook or AnalyticsHook()
        self.provider_gateway = provider_gateway or NewsletterProviderGateway()

    @staticmethod
    def normalize_email(email: str) -> str:
        return email.strip().lower()

    async def subscribe(self, payload: NewsletterSubscribeRequest) -> Dict[str, Any]:
        email_normalized = self.normalize_email(str(payload.email))
        existing = await self.database.newsletter_subscribers.find_one(
            {"email_normalized": email_normalized},
            {"_id": 0, "id": 1, "subscribed_at": 1},
        )

        if existing:
            await self.analytics_hook.track(
                "newsletter_subscribe_duplicate",
                {
                    "email": email_normalized,
                    "source": payload.source,
                    "segment": payload.segment,
                    "existing_subscriber_id": existing.get("id"),
                },
            )
            return {
                "ok": False,
                "status_code": 409,
                "body": {
                    "success": False,
                    "error": {
                        "code": "already_subscribed",
                        "message": "This email is already subscribed.",
                    },
                },
            }

        subscriber = {
            "id": str(uuid.uuid4()),
            "email": email_normalized,
            "email_normalized": email_normalized,
            "source": payload.source,
            "segment": payload.segment,
            "status": "active",
            "subscribed_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }

        try:
            await self.database.newsletter_subscribers.insert_one(subscriber)
        except DuplicateKeyError:
            await self.analytics_hook.track(
                "newsletter_subscribe_duplicate_race",
                {
                    "email": email_normalized,
                    "source": payload.source,
                    "segment": payload.segment,
                },
            )
            return {
                "ok": False,
                "status_code": 409,
                "body": {
                    "success": False,
                    "error": {
                        "code": "already_subscribed",
                        "message": "This email is already subscribed.",
                    },
                },
            }

        await self.analytics_hook.track(
            "newsletter_subscribed",
            {
                "subscriber_id": subscriber["id"],
                "email": email_normalized,
                "source": payload.source,
                "segment": payload.segment,
            },
        )
        await self.provider_gateway.on_subscriber_created(subscriber)

        return {
            "ok": True,
            "status_code": 201,
            "body": {
                "success": True,
                "message": "Subscription confirmed.",
                "subscriber_id": subscriber["id"],
                "email": subscriber["email"],
            },
        }


@router.post("/analytics", status_code=202)
async def newsletter_analytics_event(payload: NewsletterAnalyticsEventRequest):
    logger.info(
        "newsletter_analytics event=%s source=%s segment=%s status=%s request_id=%s",
        payload.event,
        payload.source,
        payload.segment,
        payload.status,
        payload.request_id,
    )
    return {"success": True}


@router.post("/subscribe", response_model=NewsletterSubscribeResponse, status_code=201)
async def subscribe_newsletter(payload: NewsletterSubscribeRequest, request: Request):
    from server import db as database

    service = NewsletterSubscriptionService(database=database)
    request_id = str(uuid.uuid4())
    client_ip = request.client.host if request.client else "unknown"

    if payload.website:
        logger.warning("newsletter_subscribe_honeypot_triggered request_id=%s ip=%s", request_id, client_ip)
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "error": {
                    "code": "invalid_request",
                    "message": "Invalid request.",
                },
                "request_id": request_id,
            },
        )

    if is_rate_limited(_ip_hits, client_ip, IP_RATE_WINDOW_SECONDS, IP_RATE_LIMIT):
        return JSONResponse(
            status_code=429,
            content={
                "success": False,
                "error": {
                    "code": "rate_limited",
                    "message": "Too many requests. Please try again later.",
                },
                "request_id": request_id,
            },
        )

    normalized_email = service.normalize_email(str(payload.email))
    if is_rate_limited(_email_hits, normalized_email, EMAIL_RATE_WINDOW_SECONDS, EMAIL_RATE_LIMIT):
        return JSONResponse(
            status_code=429,
            content={
                "success": False,
                "error": {
                    "code": "email_rate_limited",
                    "message": "Too many attempts for this email. Please try again later.",
                },
                "request_id": request_id,
            },
        )

    try:
        result = await service.subscribe(payload)
        if result["ok"]:
            result["body"]["request_id"] = request_id
            return result["body"]

        result["body"]["request_id"] = request_id
        return JSONResponse(status_code=result["status_code"], content=result["body"])
    except Exception:
        logger.exception("newsletter_subscribe_failed request_id=%s", request_id)
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": {
                    "code": "newsletter_subscribe_failed",
                    "message": "Failed to process newsletter subscription.",
                },
                "request_id": request_id,
            },
        )
