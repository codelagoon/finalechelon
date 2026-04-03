# Google Sheets Setup Guide for Echelon Equity Members

This guide explains how to set up and manage the Members section using Google Sheets as your **live production data source**.

## ⚠️ Important: Production vs Development Mode

**Production Mode (Live Google Sheets):**
- Activated when `REACT_APP_MEMBERS_SHEET_URL` is configured in `.env`
- Members page shows **ONLY** real data from your Google Sheet
- No sample/demo data is displayed
- Cache duration: 2 hours (for live form updates)
- If sheet fails to load, shows error message (not fallback data)

**Development Mode (Local Fallback):**
- Activated when `REACT_APP_MEMBERS_SHEET_URL` is **not** configured
- Uses local sample data from `membersData.js`
- Useful for testing and development

---

## Quick Start

1. **Create a new Google Sheet** or copy this template: [Template Link]
2. **Set up columns** in the exact order specified below
3. **Publish the sheet** to the web (File → Share → Publish to web)
4. **Add the URL** to your environment variables
5. **Restart frontend** and verify production mode is active
6. **Done!** The Members page will automatically fetch live data from your sheet

---

## Sheet Structure

### Required Columns (must have data):

| Column Name | Description | Example |
|------------|-------------|---------|
| `name` | Full name of the member (REQUIRED) | "Alexander Chen" |
| `role` | Job title or position (REQUIRED) | "Director of Research" |

**Note:** Members missing `name` or `role` will be skipped and not displayed.

### Optional Columns (can be empty):

| Column Name | Description | Example |
|------------|-------------|---------|
| `track` | Research track/category | "Equity Research" |
| `preview` | Short bio (1-2 sentences) | "Specializing in technology sector analysis..." |
| `bio` | Full bio (2-3 paragraphs) | "Alexander leads the research division..." |
| `email` | Contact email | "alexander.chen@echelonequity.co" |
| `linkedin` | LinkedIn profile URL | "https://linkedin.com/in/alexanderchen" |
| `image` | Profile image URL | "https://images.unsplash.com/photo-xxx" |
| `skills` | Comma-separated skills | "Financial Modeling, Python, DCF Analysis" |
| `institution` | University/school | "MIT" |
| `academicLevel` | Academic level | "Undergraduate" |

---

## Sheet Setup Instructions

### 1. Create Your Google Sheet

```
A. Go to Google Sheets: https://sheets.google.com
B. Create a new blank spreadsheet
C. Name it "Echelon Equity - Team Members"
```

### 2. Add Column Headers (Row 1)

Copy and paste these headers into the first row:

```
name | role | track | preview | bio | email | linkedin | image | skills | institution | academicLevel
```

### 3. Add Member Data (Row 2+)

**Example Row:**

| name | role | track | preview | bio | email | linkedin | image | skills | institution | academicLevel |
|------|------|-------|---------|-----|-------|----------|-------|--------|-------------|---------------|
| Sarah Martinez | Senior Analyst | Equity Research | Focus on healthcare and biotech sector coverage | Sarah specializes in healthcare and biotechnology research, bringing rigorous analytical frameworks to complex scientific and financial problems. | sarah.martinez@echelonequity.co | https://linkedin.com/in/sarahmartinez | https://images.unsplash.com/photo-xxx | Healthcare Analysis, Biotech Valuation, FDA Process | Stanford University | Undergraduate |

**Tips:**
- Required fields: `name` and `role` must always have values
- Optional fields: Leave empty if not applicable (do NOT use "N/A", "None", etc.)
- Skills: Separate with commas only (no semicolons or other separators)
- URLs: Must be complete URLs starting with `https://`
- Line breaks: Keep each field to a single line (no line breaks within cells)

---

## Publishing Your Sheet

### Step 1: Publish to Web

1. Open your Google Sheet
2. Click **File** → **Share** → **Publish to web**
3. In the dropdown, select **Entire Document**
4. In the second dropdown, select **Comma-separated values (.csv)**
5. Click **Publish**
6. Click **OK** to confirm
7. **Copy the published URL** (it will look like: `https://docs.google.com/spreadsheets/d/e/2PACX-xxx/pub?output=csv`)

### Step 2: Add URL to Environment Variables

1. Open your `.env` file in the frontend folder: `/app/frontend/.env`
2. Add this line (replace with your actual published URL):

```bash
REACT_APP_MEMBERS_SHEET_URL=https://docs.google.com/spreadsheets/d/e/2PACX-xxx/pub?output=csv
```

3. Save the file
4. Restart your frontend server: `sudo supervisorctl restart frontend`

---

## Data Update Workflow

### How to Update Member Information:

1. **Edit the Google Sheet** directly (no code changes needed)
2. **Changes are live** within 6 hours (automatic cache refresh)
3. **Force immediate update**: Clear browser localStorage and refresh the page

### To Force Immediate Refresh:

Open browser console (F12) and run:
```javascript
localStorage.removeItem('echelon_members_cache');
location.reload();
```

---

## Field-Specific Guidelines

### Profile Images (`image` field)

**Option 1: Use Unsplash (Free Stock Photos)**
```
https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop
```

**Option 2: Host on Your Server**
```
https://yourdomain.com/images/team/member-name.jpg
```

**Option 3: Use a CDN (e.g., Cloudinary, Imgur)**
```
https://res.cloudinary.com/your-account/image/upload/v1/members/profile.jpg
```

**Fallback:**
If no image URL is provided, the system shows the member's first initial in a clean circle.

### Skills (`skills` field)

**Correct Format:**
```
Financial Modeling, Python, DCF Analysis, Equity Valuation
```

**Incorrect Formats (Don't Use):**
```
❌ Financial Modeling; Python; DCF Analysis
❌ Financial Modeling | Python | DCF Analysis
❌ ["Financial Modeling", "Python"]
```

### LinkedIn URLs (`linkedin` field)

**Correct Formats:**
```
https://linkedin.com/in/username
https://www.linkedin.com/in/username
```

**Incorrect Formats (Don't Use):**
```
❌ linkedin.com/in/username (missing https://)
❌ @username
❌ username
```

---

## Validation & Error Handling

### The system automatically handles:

✅ **Empty optional fields** - Hidden from UI cleanly  
✅ **Missing images** - Shows initial letter fallback  
✅ **Invalid URLs** - Filtered out safely  
✅ **Extra whitespace** - Automatically trimmed  
✅ **Missing skills** - Skills section not displayed  
✅ **Sheet unavailable** - Falls back to local data  

### What causes a member to be skipped:

❌ Missing `name` field  
❌ Missing `role` field  
❌ Both `name` and `role` are empty  

---

## Caching & Performance

### How Caching Works:

1. **First Load**: Fetches data from Google Sheets → Caches in browser
2. **Subsequent Loads**: Uses cached data (instant loading)
3. **Cache Expiry**: After **2 hours**, fetches fresh data automatically (optimized for live form updates)
4. **Production Mode**: If sheet fails, shows error message (no fallback to sample data)
5. **Development Mode**: Uses local sample data as fallback

### Cache Management:

**Clear Cache (Browser Console):**
```javascript
localStorage.removeItem('echelon_members_cache');
```

**Force Refresh All Data:**
```javascript
localStorage.clear();
location.reload();
```

---

## Track Categories

The `track` field should use one of these values:

- `Equity Research`
- `Technical Analysis`
- `Macro Policy`
- `PR/Marketing`
- `General` (default if not specified)

You can add new tracks by updating `/app/frontend/src/data/membersData.js` in the `trackFilters` array.

---

## Testing Your Setup

### 1. Verify Sheet is Published:

Open your CSV URL in a browser. You should see raw CSV data like:

```
name,role,track,preview,bio,email,linkedin,image,skills,institution,academicLevel
Alexander Chen,Director of Research,Equity Research,Specializing in...
```

### 2. Check Environment Variable:

```bash
cat /app/frontend/.env | grep MEMBERS_SHEET
```

Should show your URL.

### 3. Test the Members Page:

1. Open browser console (F12)
2. Navigate to `/members`
3. Look for console logs:
   - `✅ Loaded X members from Google Sheets` (success)
   - `📦 Using cached member data` (using cache)
   - `📋 Using fallback local member data` (fallback mode)

---

## Troubleshooting

### Issue: "No members showing on page"

**Check:**
1. Is the sheet published correctly? (Visit CSV URL in browser)
2. Is `REACT_APP_MEMBERS_SHEET_URL` set in `.env`?
3. Are `name` and `role` fields filled for all members?
4. Are there any typos in column headers (case-sensitive)?

**Solution:**
Clear cache and reload:
```javascript
localStorage.removeItem('echelon_members_cache');
location.reload();
```

### Issue: "Member cards showing broken layout"

**Check:**
1. Are there special characters in text fields? (Should be fine, but check)
2. Are URLs properly formatted? (Must start with `https://`)
3. Are skills comma-separated (not semicolon)?

### Issue: "Changes not appearing"

**Reason:** Cache is active (6 hour duration)

**Solution:** Force refresh:
```javascript
localStorage.removeItem('echelon_members_cache');
location.reload();
```

---

## Security & Privacy

### Is my sheet data public?

**Yes**, when published to web:
- Anyone with the CSV URL can view the data
- This is intentional for a public-facing members page
- Do NOT include sensitive/private information

### What should NOT be in the sheet:

❌ Personal phone numbers  
❌ Home addresses  
❌ Private/internal notes  
❌ Salary information  
❌ Passwords or API keys  

### What's safe to include:

✅ Names  
✅ Professional roles  
✅ Professional email addresses  
✅ Public LinkedIn profiles  
✅ University names  
✅ Professional skills  
✅ Professional bios  

---

## Sample Template

Here's a complete example row you can copy:

```csv
name,role,track,preview,bio,email,linkedin,image,skills,institution,academicLevel
Sarah Martinez,Senior Analyst,Equity Research,Focus on healthcare and biotech sector coverage with fundamental analysis expertise,Sarah specializes in healthcare and biotechnology research bringing rigorous analytical frameworks to complex scientific and financial problems. She has published research on pharmaceutical valuation methodologies.,sarah.martinez@echelonequity.co,https://linkedin.com/in/sarahmartinez,https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop,Healthcare Analysis, Biotech Valuation, FDA Process, Clinical Trial Assessment,Stanford University,Undergraduate
```

---

## Need Help?

**Common Questions:**

1. **Can I add custom fields?**  
   Yes, but they won't display unless you modify the code. Stick to the columns above for now.

2. **Can I change the order of columns?**  
   No, the CSV parser expects the exact order specified above.

3. **What if I want to hide a member temporarily?**  
   Delete the row or clear the `name` field (member will be skipped).

4. **Can I use Excel instead of Google Sheets?**  
   Not directly, but you can export Excel to CSV and host it somewhere accessible.

---

**Last Updated:** December 2025  
**Version:** 1.0
