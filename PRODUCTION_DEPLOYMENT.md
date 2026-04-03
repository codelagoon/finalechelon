# Production Deployment Guide - Google Sheets Live Integration

## ⚠️ Critical: Production vs Development Mode

### Current Status: **DEVELOPMENT MODE**

Your Members section is currently in **Development Mode** because `REACT_APP_MEMBERS_SHEET_URL` is not configured.

---

## Switching to Production Mode

### Step 1: Prepare Your Google Sheet

1. **Create your Google Sheet** with live member data
2. **Set up columns** (exact order required):
   ```
   name | role | track | preview | bio | email | linkedin | image | skills | institution | academicLevel
   ```
3. **Publish to web:**
   - File → Share → Publish to web
   - Select: **Entire Document** → **CSV format**
   - Click **Publish**
   - Copy the published URL (looks like: `https://docs.google.com/spreadsheets/d/e/2PACX-xxx/pub?output=csv`)

---

### Step 2: Configure Environment Variable

1. **Open** `/app/frontend/.env`
2. **Update** the `REACT_APP_MEMBERS_SHEET_URL` line:

   ```bash
   # Before (Development Mode):
   REACT_APP_MEMBERS_SHEET_URL=
   
   # After (Production Mode):
   REACT_APP_MEMBERS_SHEET_URL=https://docs.google.com/spreadsheets/d/e/2PACX-xxx/pub?output=csv
   ```

3. **Save** the file

---

### Step 3: Restart Frontend

```bash
sudo supervisorctl restart frontend
```

Wait 10-15 seconds for the service to restart.

---

### Step 4: Verify Production Mode

1. **Open browser console** (F12)
2. **Navigate to** `/members` page
3. **Look for console log:**
   - ✅ **Production Mode:** `🚀 Production mode: Fetching from Google Sheets`
   - ✅ **Success:** `✅ Loaded X members from Google Sheets`
   - ❌ **Failure:** `❌ Production mode: Failed to load Google Sheets data`

---

## Key Differences: Development vs Production

| Feature | Development Mode | Production Mode |
|---------|-----------------|-----------------|
| **Data Source** | Local `membersData.js` | Live Google Sheets |
| **Sample Data** | 8 demo members shown | **NO sample data shown** |
| **Fallback** | Uses local data always | Shows error if sheet fails |
| **Cache Duration** | Not cached | 2 hours |
| **Updates** | Requires code deployment | Updates from Google Form automatically |
| **Console Log** | `📋 Development mode` | `🚀 Production mode` |

---

## Production Behavior

### When Sheet Loads Successfully:
- ✅ Shows only real member data from Google Sheets
- ✅ No mixing with sample/demo data
- ✅ Professional fallback image for members without photos
- ✅ Caches data for 2 hours (fast loading)
- ✅ Handles incomplete form submissions gracefully

### When Sheet Fails to Load:
- ❌ Shows error message: "Unable to load member data from Google Sheets"
- ❌ Does **NOT** show sample/demo members as fallback
- ❌ Prompts user to check connection or contact support

---

## Live Form Integration

### Your Google Sheet is Connected to a Live Form

**Expected Behavior:**
- New rows added automatically as people submit the form
- Some fields may be missing or incomplete
- Frontend handles messy data gracefully

**Data Handling:**
- **Required fields:** `name`, `role` (rows without these are skipped)
- **Optional fields:** Everything else (cleanly omitted if missing)
- **Image fallback:** Professional stock photo if no image submitted
- **Skills parsing:** Handles comma-separated or semicolon-separated lists
- **Duplicate handling:** Each member gets unique ID to prevent conflicts

**Normalization:**
- Trims whitespace automatically
- Treats empty strings as missing values
- Validates URLs before rendering
- Handles different column name variations (e.g., `name` or `Name` or `NAME`)

---

## Cache Management in Production

### Automatic Cache Refresh:
- Cache expires every **2 hours** (optimized for live form updates)
- New submissions will appear within 2 hours maximum

### Manual Cache Refresh:
If you need immediate updates, users can manually clear cache:

**Browser Console:**
```javascript
localStorage.removeItem('echelon_members_cache');
location.reload();
```

---

## Monitoring Production Health

### Check Console Logs:

**Healthy Production:**
```
🚀 Production mode: Fetching from Google Sheets
✅ Loaded 12 members from Google Sheets
💾 Members data cached
```

**Using Cached Data:**
```
📦 Using cached member data
```

**Production Error:**
```
❌ Production mode: Failed to load Google Sheets data
💡 Members page will show error message
```

---

## Troubleshooting Production Issues

### Issue: Error message showing on Members page

**Check:**
1. Is `REACT_APP_MEMBERS_SHEET_URL` correctly set in `.env`?
   ```bash
   cat /app/frontend/.env | grep MEMBERS_SHEET
   ```

2. Is the Google Sheet published correctly?
   - Visit the CSV URL directly in browser
   - Should see raw CSV data

3. Are there any network/firewall issues?
   ```bash
   curl "YOUR_SHEET_URL_HERE"
   ```

**Solution:**
- Fix the sheet URL or publication settings
- Restart frontend: `sudo supervisorctl restart frontend`
- Clear cache: `localStorage.removeItem('echelon_members_cache')`

---

### Issue: No members showing (but no error)

**Cause:** All members are missing required fields (`name` or `role`)

**Check:**
- Open your Google Sheet
- Verify `name` and `role` columns have data
- Check column headers match exactly: `name`, `role`

**Solution:**
- Fill in `name` and `role` for all members
- Wait 2 hours for cache to expire, or manually clear cache

---

### Issue: Some members not showing

**Cause:** Those members are missing `name` or `role` in the sheet

**Check Console:**
```
⚠️ Skipping member at row 5: missing required fields (name: "", role: "Analyst")
```

**Solution:**
- Fill in missing required fields in Google Sheet
- Clear cache to see updates immediately

---

### Issue: Broken images showing

**This should NOT happen** - the system automatically uses fallback images.

**If it does:**
- Check browser console for errors
- Verify fallback image URL is accessible:
  ```
  https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop&q=80
  ```

---

## Rollback to Development Mode

If you need to temporarily disable Google Sheets integration:

1. **Edit** `/app/frontend/.env`:
   ```bash
   REACT_APP_MEMBERS_SHEET_URL=
   ```

2. **Restart frontend:**
   ```bash
   sudo supervisorctl restart frontend
   ```

3. **Verify development mode** in console:
   ```
   📋 Development mode: Using local fallback member data
   ```

---

## Production Checklist

Before going live, verify:

- [ ] Google Sheet is published to web as CSV
- [ ] `REACT_APP_MEMBERS_SHEET_URL` is set in `/app/frontend/.env`
- [ ] Frontend service restarted after environment change
- [ ] Browser console shows `🚀 Production mode`
- [ ] Members page loads successfully (no error message)
- [ ] At least one member has `name` and `role` filled in
- [ ] Test: Submit a new form entry and verify it appears within 2 hours
- [ ] Test: Clear cache manually to see immediate updates

---

## Best Practices

### Data Quality:
- Always fill in `name` and `role` (required)
- Provide profile images when possible (or leave empty for fallback)
- Use complete, valid URLs for `image` and `linkedin` fields
- Separate skills with commas: `"Financial Modeling, Python, DCF"`

### Performance:
- Keep sheet size reasonable (under 100 members for best performance)
- Use high-quality but optimized images (400x400px recommended)
- Avoid extremely long text in `bio` or `preview` fields

### Security:
- Published Google Sheets are **public** (anyone with URL can view)
- Do **NOT** include sensitive personal information
- Only include professional contact info (email, LinkedIn)

---

## Support

**Documentation:**
- Full Google Sheets setup: `/app/GOOGLE_SHEETS_SETUP.md`
- Service code: `/app/frontend/src/services/memberDataService.js`

**Console Logs:**
- All data fetching operations are logged in browser console
- Check console for detailed error messages and debugging info

**Need Help?**
- Check console logs for specific error messages
- Verify sheet publication settings
- Test CSV URL directly in browser
- Review `/app/GOOGLE_SHEETS_SETUP.md` for detailed field specifications

---

**Last Updated:** December 2025  
**Version:** 2.0 (Production-Ready)
