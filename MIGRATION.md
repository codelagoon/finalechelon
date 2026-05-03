# Railway to Supabase Migration

## Overview

Successfully migrated the backend from Railway (FastAPI/Python) to Supabase (Postgres + Edge Functions).

## What Changed

### 1. Database (Supabase Postgres)
- **Table**: `applications`
- **Columns**:
  - `id` (uuid, primary key)
  - `created_at` (timestamp)
  - `name` (text, required)
  - `email` (text, required)
  - `role` (text, required)
  - `resume_url` (text)
  - `experience` (text)
  - `institution` (text)
  - `academic_level` (text)
  - `graduation_year` (text)
  - `field_of_study` (text)
  - `why_echelon` (text)
  - `relevant_experience` (text)
  - `analytical_response` (text)
  - `work_sample_url` (text)

### 2. Backend (Supabase Edge Function)
- **Function**: `submit-application`
- **URL**: `https://okabukmffsmfinamrnrl.supabase.co/functions/v1/submit-application`
- **Features**:
  - Validates name, email, role (required)
  - Inserts into `applications` table
  - Sends confirmation email via Resend
  - CORS enabled for Vercel frontend

### 3. Email (Resend)
- **Provider**: Resend API
- **From**: `Echelon Equity <team@echelonequity.co>`
- **Subject**: "Application Received – Echelon Equity"
- **Content**: HTML confirmation with review timeline

### 4. Frontend (Updated)
- **File**: `frontend/src/pages/Apply.jsx`
- Changes:
  - Replaced `REACT_APP_BACKEND_URL` with `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`
  - Changed from FormData (multipart) to JSON payload
  - Updated endpoint to Edge Function URL
  - Added Authorization header with anon key

### 5. Removed
- `/backend` folder (entire Railway/FastAPI backend)
- Express/FastAPI server
- MongoDB dependencies
- Python backend code

## Environment Variables

### Required (Vercel)
```
REACT_APP_SUPABASE_URL=https://okabukmffsmfinamrnrl.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

### Required (Supabase Edge Function Secrets)
```
RESEND_API_KEY=your_resend_api_key
SUPABASE_URL=https://okabukmffsmfinamrnrl.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Setup Instructions

### 1. Configure Supabase Secrets
In Supabase Dashboard → Edge Functions → Secrets:
```bash
RESEND_API_KEY=your_resend_api_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Configure Vercel Environment Variables
```bash
REACT_APP_SUPABASE_URL=https://okabukmffsmfinamrnrl.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_key
```

### 3. Verify Resend Domain
Ensure `echelonequity.co` is verified in Resend dashboard for sending emails.

## Architecture

```
┌─────────────┐      ┌─────────────────────────────┐      ┌─────────────┐
│   Vercel    │──────▶│  Supabase Edge Function     │──────▶│  Resend     │
│  (Frontend) │      │  /functions/v1/submit-app   │      │  (Email)    │
└─────────────┘      └─────────────────────────────┘      └─────────────┘
                              │
                              ▼
                       ┌─────────────┐
                       │  Supabase   │
                       │  Postgres   │
                       │ applications│
                       └─────────────┘
```

## Testing

1. Fill out application form at `/apply`
2. Submit application
3. Check:
   - Success toast appears
   - Data appears in Supabase Table Editor
   - Confirmation email received

## Rollback Plan

If issues arise:
1. Restore `backend/` folder from git history
2. Update `REACT_APP_BACKEND_URL` in Vercel
3. Redeploy Railway backend
