"""Newsletter Issues API."""
import logging
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel, StringConstraints
from typing_extensions import Annotated

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/issues", tags=["issues"])

TitleField = Annotated[str, StringConstraints(strip_whitespace=True, min_length=3, max_length=200)]
SummaryField = Annotated[str, StringConstraints(strip_whitespace=True, min_length=10, max_length=500)]
BodyField = Annotated[str, StringConstraints(strip_whitespace=True, min_length=20)]


class IssueHighlight(BaseModel):
    text: str


class IssueCreateRequest(BaseModel):
    volume: str  # e.g., "Vol. 08"
    date: str  # e.g., "April 2026"
    title: TitleField
    summary: SummaryField
    highlights: List[IssueHighlight]
    body: Optional[BodyField] = None
    status: Optional[str] = "draft"  # "draft" or "published"


class IssueResponse(BaseModel):
    id: str
    volume: str
    date: str
    title: str
    summary: str
    highlights: List[IssueHighlight]
    body: Optional[str] = None
    status: str
    created_at: str
    updated_at: str


class IssuesListResponse(BaseModel):
    success: bool
    count: int
    issues: List[IssueResponse]


def build_issue_document(payload: IssueCreateRequest) -> Dict[str, Any]:
    issue = {
        "id": str(uuid.uuid4()),
        "volume": payload.volume,
        "date": payload.date,
        "title": payload.title,
        "summary": payload.summary,
        "highlights": [h.model_dump() for h in payload.highlights],
        "status": (payload.status or "draft").strip() or "draft",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }

    if payload.body is not None:
        issue["body"] = payload.body

    return issue


def require_admin_token(x_admin_token: Optional[str] = Header(default=None)) -> None:
    admin_api_token = os.environ.get("ADMIN_API_TOKEN")

    if not admin_api_token:
        raise HTTPException(status_code=503, detail="Issue admin token is not configured")

    if x_admin_token != admin_api_token:
        raise HTTPException(status_code=403, detail="Forbidden")


@router.post("", response_model=IssueResponse, status_code=201)
@router.post("/", response_model=IssueResponse, status_code=201)
async def create_issue(
    payload: IssueCreateRequest,
    _: None = Depends(require_admin_token),
):
    """Create a new newsletter issue."""
    from server import db as database

    issue = build_issue_document(payload)

    try:
        result = await database.newsletter_issues.insert_one(issue)
        logger.info(f"Issue created: {issue['id']}")
        return IssueResponse(**issue)
    except Exception as exc:
        logger.exception("issue_create_failed")
        raise HTTPException(status_code=500, detail=f"Failed to create issue: {str(exc)}")


@router.get("", response_model=IssuesListResponse)
@router.get("/", response_model=IssuesListResponse)
async def list_issues(status: Optional[str] = None, limit: int = 100):
    """List all issues, optionally filtered by status."""
    from server import db as database

    try:
        query = {}
        if status:
            query["status"] = status

        issues = await database.newsletter_issues.find(query, {"_id": 0}).sort(
            "created_at", -1
        ).to_list(limit)

        return IssuesListResponse(success=True, count=len(issues), issues=issues)
    except Exception as exc:
        logger.exception("issue_list_failed")
        raise HTTPException(status_code=500, detail=f"Failed to list issues: {str(exc)}")


@router.get("/{issue_id}", response_model=IssueResponse)
async def get_issue(issue_id: str):
    """Get a single issue by ID."""
    from server import db as database

    try:
        issue = await database.newsletter_issues.find_one({"id": issue_id}, {"_id": 0})
        if not issue:
            raise HTTPException(status_code=404, detail="Issue not found")
        return IssueResponse(**issue)
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("issue_get_failed")
        raise HTTPException(status_code=500, detail=f"Failed to get issue: {str(exc)}")


@router.patch("/{issue_id}", response_model=IssueResponse)
async def update_issue(
    issue_id: str,
    payload: Dict[str, Any],
    _: None = Depends(require_admin_token),
):
    """Update an issue (partial updates allowed)."""
    from server import db as database

    try:
        issue = await database.newsletter_issues.find_one({"id": issue_id}, {"_id": 0})
        if not issue:
            raise HTTPException(status_code=404, detail="Issue not found")

        # Only allow updating certain fields
        allowed_fields = {"title", "summary", "body", "status", "highlights"}
        update_data = {k: v for k, v in payload.items() if k in allowed_fields}
        update_data["updated_at"] = datetime.now(timezone.utc).isoformat()

        result = await database.newsletter_issues.update_one(
            {"id": issue_id}, {"$set": update_data}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Issue not found")

        updated_issue = await database.newsletter_issues.find_one(
            {"id": issue_id}, {"_id": 0}
        )
        logger.info(f"Issue updated: {issue_id}")
        return IssueResponse(**updated_issue)
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("issue_update_failed")
        raise HTTPException(status_code=500, detail=f"Failed to update issue: {str(exc)}")


@router.delete("/{issue_id}")
async def delete_issue(
    issue_id: str,
    _: None = Depends(require_admin_token),
):
    """Delete an issue."""
    from server import db as database

    try:
        result = await database.newsletter_issues.delete_one({"id": issue_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Issue not found")
        logger.info(f"Issue deleted: {issue_id}")
        return {"success": True, "message": "Issue deleted"}
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("issue_delete_failed")
        raise HTTPException(status_code=500, detail=f"Failed to delete issue: {str(exc)}")
