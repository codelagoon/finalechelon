# Echelon Equity - Landing Page PRD

## Project Overview
**Project Name:** Echelon Equity Landing Page  
**Type:** Student-led private equity research initiative website  
**Tech Stack:** React (Frontend), FastAPI (Backend - future), MongoDB (Database - future)  
**Design System:** Black & white minimalist, premium, "quiet wealth" aesthetic  
**Tagline:** "The Work Is the Credential"

## Problem Statement
Build a highly selective, professional landing page for Echelon Equity - a student-led private equity initiative where students conduct institutional-grade investment research, reviewed by Wall Street professionals. The page must feel elite, competitive, and merit-based—NOT a casual educational program, but a proving ground for future investors and operators.

## User Personas
1. **Ambitious Students** - Undergraduate/graduate students interested in finance, private equity, and investment research
2. **Early-Career Professionals** - Young professionals looking to build credible investment portfolios
3. **Recruiters/Employers** - Professionals evaluating candidate quality based on work output
4. **Wall Street Reviewers** - Industry professionals who review analyst work

## Core Requirements (Static)

### Design Requirements
- **Color Scheme:** Black (#000000) & White (#FFFFFF) only with subtle gray tones
- **Typography:** Playfair Display (display) + Inter (body)
- **Tone:** Elite, competitive, intelligent, ambitious, serious
- **Feel:** Hedge fund / research desk, NOT student club or bootcamp
- **No AI emojis:** Use Lucide React icons only

### Content Sections
1. ✅ Hero - Bold headline, tagline, strategic chess imagery
2. ✅ Stats - 32 analysts, 100+ applications, 6 sectors, 24 models
3. ✅ Mission - "This Is Not a Course" positioning
4. ✅ Program Tracks - 4 analyst tracks (Three-Statement, DCF, Investment Memo, LBO)
5. ✅ Portfolio Companies - 6 real companies with tickers, sectors, convictions, DCF values
6. ✅ What You'll Do - Real analysis, memos, presentations, professional review
7. ✅ Reviewers - 3 Wall Street professionals with firm names and experience
8. ✅ Standards of Practice - 6 SOPs (Blue/Black Rule, file naming, version control, etc.)
9. ✅ Application Process - 4-step selective process
10. ✅ Testimonials - 3 analyst testimonials
11. ✅ FAQ - 6 questions addressing selectivity, time commitment, outcomes
12. ✅ Careers - 4 open positions (Technical Analyst, Equity Research, Macro Policy, PR/Marketing)
13. ✅ Final CTA - "Ready to Prove Yourself?"
14. ✅ Header - Fixed nav with Research, Apply, Careers, Contact
15. ✅ Footer - Contact info (team@echelonequity.co, admissions@echelonequity.co), links, co-founder credits

## What's Been Implemented (March 2026)

### Phase 1: Frontend with Mock Data ✅
**Date Completed:** March 2026

**Components Created:**
- `Hero.jsx` - Hero section with tagline, headline, chess image, CTAs
- `Stats.jsx` - 4-metric stats grid
- `Mission.jsx` - "This Is Not a Course" section with principles
- `ProgramTracks.jsx` - 4 analyst track cards with deliverables and skills
- `Portfolio.jsx` - Portfolio companies table with tickers, sectors, status, conviction, DCF values
- `WhatYouDo.jsx` - 4 activity cards explaining what analysts do
- `Reviewers.jsx` - 3 Wall Street reviewer cards
- `Standards.jsx` - 6 SOP cards
- `ApplicationProcess.jsx` - 4-step application process
- `Testimonials.jsx` - 3 analyst testimonial cards
- `FAQ.jsx` - Accordion FAQ with 6 questions
- `Careers.jsx` - Careers hero image + 4 role cards + application dialog
- `Header.jsx` - Fixed header with navigation
- `Footer.jsx` - Footer with contact info and links
- `FinalCTA.jsx` - Final CTA section
- `ApplicationDialog.jsx` - Application form modal (mock submission)
- `ContactDialog.jsx` - Contact form modal (mock submission)
- `CareerApplicationDialog.jsx` - Career application form modal (mock submission)

**Mock Data File:** `/app/frontend/src/mockData.js`
- All content structured for easy backend integration
- Mock form submission handlers with console logging
- Real data from Echelon Equity .md file

**Styling:** `/app/frontend/src/App.css`
- Black & white minimalist premium design
- Playfair Display + Inter typography
- Professional table styling for portfolio
- Hover states and transitions
- Responsive breakpoints (desktop, tablet, mobile)
- shadcn/ui component integration

**Images Used:**
- Chess pieces (strategic thinking) - https://images.unsplash.com/photo-1705931819853-cce7c8d69f10
- Chess game (strategic planning) - https://images.unsplash.com/photo-1560174068-db2f21bed320
- Black knight chess (sophisticated strategy) - https://images.unsplash.com/photo-1560174038-da43ac74f01b
- Abstract water droplets (growth) - https://images.unsplash.com/photo-1599422282890-45178092318a
- MacBook workspace (team/careers) - https://images.unsplash.com/photo-1512296014055-b49bbcd707d2

**Frontend Status:** ✅ Fully functional with mock data
- All forms work with local state management
- Toast notifications on form submission
- Smooth scroll navigation
- Responsive design
- All interactions functional

## Prioritized Backlog

### P0 Features (Critical)
- None - MVP complete with frontend

### P1 Features (High Priority - Next Phase)
- Backend API for form submissions (application, contact, career)
- Database schema for storing applications and contact requests
- Email notifications for new applications (to admissions@echelonequity.co)
- Admin dashboard to review applications

### P2 Features (Nice to Have)
- Portfolio company detail pages with full DCF analysis
- Analyst portal login
- Research publication section
- Blog/insights section
- LinkedIn/Twitter integration
- Application status tracking for applicants

## API Contracts (Future Backend Integration)

### POST /api/applications
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "university": "string",
  "major": "string",
  "gradYear": "string",
  "whyEchelon": "string",
  "experience": "string"
}
```
**Response:** `{ "success": boolean, "message": "string" }`

### POST /api/contact
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```
**Response:** `{ "success": boolean, "message": "string" }`

### POST /api/career-applications
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "role": "string",
  "whyEchelon": "string"
}
```
**Response:** `{ "success": boolean, "message": "string" }`

## Next Tasks
1. ✅ Create frontend with mock data
2. ⏭️ Get user feedback on design and messaging
3. ⏭️ Build backend API for form submissions
4. ⏭️ Integrate frontend with backend
5. ⏭️ Set up email notifications
6. ⏭️ Deploy to production (echelonequity.co)

## Design System Notes
- **Font Stack:** Playfair Display for headings, Inter for body
- **Color Tokens:** 
  - Primary: #000000 (black)
  - Secondary: #FFFFFF (white)
  - Gray scale: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Spacing Scale:** 4pt/8dp system (0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem, 8rem)
- **Border Radius:** 2px (minimal, sharp)
- **Transitions:** 150-300ms ease for interactions
- **No emojis:** Lucide React icons only
- **Portfolio Table:** 
  - Status badges: Active (black), Watch (gray-200), Closed (gray-100)
  - Conviction badges: Buy (black), Hold (gray-700), Neutral (gray-300), Thesis (gray-100)

## Success Metrics
- Page feels selective, elite, and professional (NOT casual or educational)
- Clear differentiation from courses/bootcamps
- Forms functional with proper validation
- Mobile-responsive and accessible
- Fast load times (<3s)
- Professional portfolio table presentation

## Notes
- All form submissions are currently MOCKED - they log to console and show success toast
- Ready for backend integration when needed
- Real data from Echelon Equity internal documentation
- Co-founders: George Afram (Operations), Jonathan Silva (Research)
- Websites: echelonequity.co, portal.echelonequity.co
- Contact: team@echelonequity.co, admissions@echelonequity.co
