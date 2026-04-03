# Live Form Field Mapping - Members Section

## Exact Google Sheet Column Names

The Members section now uses the **exact** column names from your live Google Form responses. Do not rename or reorder these columns in the sheet.

---

## Required Columns

| Google Sheet Column | Maps To | Required | Notes |
|-------------------|---------|----------|-------|
| **Full Name** | member.name | ✅ YES | Member's display name |
| **Role** | member.role | ✅ YES | Job title or position |
| **Show my profile on the website?** | visibility control | ✅ YES | Must be "yes", "true", "y", or "1" to display |

**Members missing any required field OR not approved for display will be skipped.**

---

## Optional Columns

| Google Sheet Column | Maps To | Optional | Notes |
|-------------------|---------|----------|-------|
| **Short Bio** | member.preview | ☑️ Optional | Card preview text (1-2 sentences) |
| **Full Bio** | member.bio | ☑️ Optional | Expanded profile description |
| **Email** | member.email | ☑️ Optional | Contact email (shows icon if present) |
| **LinkedIn URL** | member.linkedin | ☑️ Optional | LinkedIn profile (shows icon if present) |
| **Headshot** | member.image | ☑️ Optional | Profile photo URL |
| **school** | member.institution | ☑️ Optional | School/university name |
| **Skills / Sectors of Interest** | member.skills | ☑️ Optional | Comma or semicolon-separated tags |

---

## Visibility Control

### "Show my profile on the website?" Field

**Approved Values (case-insensitive):**
- `yes`
- `true`
- `y`
- `1`

**Rejected Values:**
- `no`
- `false`
- `n`
- `0`
- Empty/blank
- Any other value

**Behavior:**
- Only members with approved values are displayed publicly
- Rejected members are skipped (with console log)
- Console log: `Skipping member at row X: profile not approved for public display`

---

## Image Handling (Important Change)

### Headshot Field Behavior

**If Headshot is provided:**
- Image displayed in card and modal
- Image error handling: if URL fails to load, image section is hidden

**If Headshot is missing/empty:**
- **No image section rendered at all**
- No fallback stock photo
- No placeholder initials
- No broken image icon
- Layout adapts gracefully (extra padding on card content)

**This is intentional** - members without headshots render cleanly without any image area.

---

## Field Normalization

### Automatic Data Cleaning:

1. **Whitespace:** All fields trimmed automatically
2. **Empty strings:** Treated as missing values (null)
3. **Case-insensitive:** Column names accept any capitalization
   - Example: `Full Name`, `full name`, `FULL NAME` all work
4. **URL validation:** LinkedIn URL and Headshot must be valid URLs starting with `https://`
5. **Skills parsing:** Accepts comma-separated OR semicolon-separated lists

### Examples:

**Short Bio + Full Bio:**
- If both exist: Short Bio used for card preview, Full Bio for modal
- If only Short Bio: Used for both card and modal
- If only Full Bio: Truncated for card (150 chars), full text in modal
- If neither: No bio text displayed

**Skills / Sectors of Interest:**
- Input: `Financial Modeling, Python; DCF Analysis`
- Output: `["Financial Modeling", "Python", "DCF Analysis"]`
- Automatically handles both commas and semicolons

---

## Column Name Variations Supported

The system is flexible and accepts multiple variations:

| Primary Column | Also Accepts |
|---------------|--------------|
| Full Name | full name, NAME, name |
| Role | role, ROLE, title, Title |
| Short Bio | short bio, preview, Preview |
| Full Bio | full bio, bio, Bio, description |
| Email | email, EMAIL |
| LinkedIn URL | linkedin url, LinkedIn, linkedin |
| Headshot | headshot, image, photo, Photo |
| school | School, institution, university |
| Skills / Sectors of Interest | skills / sectors of interest, Skills, skills, expertise |
| Show my profile on the website? | show my profile on the website?, Show Profile, show profile |

---

## Example Google Sheet Structure

```
| Full Name       | Role           | Show my profile on the website? | Short Bio                  | Full Bio                               | Email                    | LinkedIn URL                  | Headshot                      | school              | Skills / Sectors of Interest          |
|----------------|----------------|--------------------------------|----------------------------|----------------------------------------|-------------------------|-------------------------------|-------------------------------|---------------------|-------------------------------------|
| Jane Smith     | Research Analyst | yes                           | Focus on tech sector       | Jane specializes in...                | jane@echelon.co         | https://linkedin.com/in/jane  | https://images.unsplash.com/... | Stanford University | Financial Modeling, Python, AI      |
| John Doe       | Senior Analyst  | yes                           | Healthcare specialist      | John has 3 years experience...        | john@echelon.co         |                              |                              | MIT                 | Healthcare, Biotech                 |
| Mary Johnson   | Analyst        | no                            | Private profile            | Mary prefers...                       | mary@echelon.co         | https://linkedin.com/in/mary  | https://images.unsplash.com/... | Harvard             | Macro Policy                        |
```

**Result:**
- Jane Smith: ✅ Displayed (approved, has headshot)
- John Doe: ✅ Displayed (approved, no headshot - image section hidden)
- Mary Johnson: ❌ Not displayed (not approved - "no" in visibility field)

---

## Console Logging

### Member Skipping Logs:

**Missing required fields:**
```
⚠️ Skipping member at row 5: missing required fields (Full Name: "", Role: "Analyst")
```

**Not approved for display:**
```
🔒 Skipping member at row 8: profile not approved for public display (Full Name: "John Private")
```

### Success Logs:

**Development mode:**
```
📋 Development mode: Using local fallback member data
💡 To enable production mode, set REACT_APP_MEMBERS_SHEET_URL in .env
```

**Production mode:**
```
🚀 Production mode: Fetching from Google Sheets
✅ Loaded 12 members from Google Sheets
💾 Members data cached
```

---

## Testing Your Sheet

### Checklist Before Going Live:

1. ✅ Column names match exactly (case-insensitive is OK)
2. ✅ All members have `Full Name` and `Role`
3. ✅ "Show my profile on the website?" is "yes" for public members
4. ✅ LinkedIn URLs start with `https://`
5. ✅ Headshot URLs start with `https://` (or leave blank)
6. ✅ Skills use commas or semicolons to separate
7. ✅ Sheet is published to web as CSV
8. ✅ `REACT_APP_MEMBERS_SHEET_URL` is configured

### Test with Various Scenarios:

- ✅ Member with all fields filled
- ✅ Member with no Headshot (verify image section hidden)
- ✅ Member with no LinkedIn (verify icon hidden)
- ✅ Member with no Email (verify icon hidden)
- ✅ Member with no Skills (verify skills section hidden)
- ✅ Member with "no" in visibility field (verify not displayed)
- ✅ Member with empty Short Bio but Full Bio present
- ✅ Member with skills using semicolons instead of commas

---

## Common Issues & Solutions

### Issue: Member not showing on page

**Check:**
1. Does row have `Full Name` AND `Role`?
2. Is "Show my profile on the website?" set to "yes"?
3. Check browser console for skip messages

**Solution:**
- Fill in `Full Name` and `Role`
- Set visibility to "yes"
- Clear cache: `localStorage.removeItem('echelon_members_cache')`

---

### Issue: Broken image showing

**This should NOT happen** - images failing to load are hidden automatically.

**If it does:**
- Check Headshot URL is valid and accessible
- Ensure URL starts with `https://`
- Try opening URL directly in browser

---

### Issue: Skills not parsing correctly

**Check:**
- Are skills separated by commas or semicolons?
- Is there extra whitespace around skill names?

**Example Good Format:**
```
Financial Modeling, Python, Healthcare Analysis
```

**Example Bad Format:**
```
"Financial Modeling" & "Python" & "Healthcare"
```

---

**Last Updated:** December 2025  
**Version:** 3.0 (Live Form Integration)
