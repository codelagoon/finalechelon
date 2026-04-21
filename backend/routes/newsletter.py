import json
import logging
import os
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

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/newsletter", tags=["newsletter"])

SourceField = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]
SegmentField = Annotated[Optional[str], StringConstraints(strip_whitespace=True, max_length=80)]
EventNameField = Annotated[str, StringConstraints(strip_whitespace=True, min_length=3, max_length=80)]

IP_RATE_WINDOW_SECONDS = int(os.environ.get("NEWSLETTER_IP_WINDOW_SECONDS", "60"))
IP_RATE_LIMIT = int(os.environ.get("NEWSLETTER_IP_RATE_LIMIT", "20"))
EMAIL_RATE_WINDOW_SECONDS = int(os.environ.get("NEWSLETTER_EMAIL_WINDOW_SECONDS", "3600"))
EMAIL_RATE_LIMIT = int(os.environ.get("NEWSLETTER_EMAIL_RATE_LIMIT", "5"))

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
    async def on_subscriber_created(self, subscriber: Dict[str, Any]) -> None:
        # Integration hook for future provider sync (e.g., Resend/Audience API).
        logger.info(
            "newsletter_provider_hook event=subscriber_created subscriber_id=%s",
            subscriber["id"],
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
