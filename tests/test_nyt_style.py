"""Test and refine newsletter styling to match NYT quality."""
import pytest
from playwright.sync_api import Page, expect
import os

API_URL = os.environ.get("API_URL", "http://localhost:8000")


def test_capture_issue_page_for_review(page: Page):
    """Capture screenshot of issue page for visual review"""
    # Navigate to an existing issue
    page.goto("http://localhost:3000/newsletter/82f5a1d0-a833-46c7-8594-720c505e70c2")
    page.wait_for_selector('[data-testid="issue-title"]')
    
    # Take full page screenshot
    page.screenshot(path="/Users/george/finalechelon/tests/screenshots/issue_page_current.png", full_page=True)
    
    # Also take viewport screenshot of article section
    article = page.locator("article").first
    article.screenshot(path="/Users/george/finalechelon/tests/screenshots/issue_article_current.png")
    
    print("Screenshots saved for review")
