"""
Newsletter Issues Seed Data
Initialize the database with example issues for development/testing.
"""
import logging
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

SEED_ISSUES = []


async def seed_newsletter_issues(database):
    """
    Seed the database with example newsletter issues if none exist.
    Idempotent: only inserts if collection is empty.
    """
    try:
        count = await database.newsletter_issues.count_documents({})
        if count > 0:
            logger.info(f"Newsletter issues already seeded ({count} issues found)")
            return

        issues = [
            {
                "id": f"issue_{i}",
                **issue,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }
            for i, issue in enumerate(SEED_ISSUES, 1)
        ]

        result = await database.newsletter_issues.insert_many(issues)
        logger.info(f"Seeded {len(result.inserted_ids)} newsletter issues")
    except Exception as e:
        logger.warning(f"Newsletter seed skipped (may already exist): {e}")
