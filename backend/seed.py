"""
Newsletter Issues Seed Data
Initialize the database with example issues for development/testing.
"""
import logging
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

SEED_ISSUES = [
    {
        "volume": "Vol. 09",
        "date": "April 2026",
        "title": "Semiconductor Cash Cycles, AI Capex, and Variant Paths",
        "summary": "A focused read on pricing power durability, inventory normalization, and where downside scenarios still hide in plain sight.",
        "highlights": [
            {"text": "Earnings-quality checklist for margin resilience"},
            {"text": "Three market signals we track before adding exposure"},
            {"text": "Memo excerpt: base case vs. variant case assumptions"},
        ],
        "body": None,
        "status": "published",
    },
    {
        "volume": "Vol. 08",
        "date": "March 2026",
        "title": "Margin Compression Watchlist and Quality Screens",
        "summary": "How we separate temporary pressure from structural deterioration in operating margins.",
        "highlights": [
            {"text": "Operating leverage walkthrough"},
            {"text": "Gross margin trends vs. market expectations"},
            {"text": "Portfolio positioning on margin risk"},
        ],
        "body": None,
        "status": "published",
    },
    {
        "volume": "Vol. 07",
        "date": "February 2026",
        "title": "Banks, Duration, and Credit Re-Pricing",
        "summary": "A memo-driven walkthrough of where sensitivity hides in regional balance sheets.",
        "highlights": [
            {"text": "Duration risk assessment framework"},
            {"text": "Deposit beta trends across bank tiers"},
            {"text": "Case study: regional bank valuation after rates"},
        ],
        "body": None,
        "status": "published",
    },
]


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
