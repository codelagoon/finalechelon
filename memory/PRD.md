# Echelon Equity - Institutional Landing Page PRD

## Project Overview
**Project Name:** Echelon Equity Landing Page (Institutional Refinement)  
**Type:** Student-led private equity research initiative website  
**Tech Stack:** React (Frontend), FastAPI (Backend - future), MongoDB (Database - future)  
**Design System:** Black & white institutional, Playfair Display + Inter typography  
**Tagline:** "The Work Is the Credential"

## Core Positioning
**Echelon is:**
- Student-led investment research platform
- NOT a fund, NOT a course
- Selective proving ground for future analysts
- Experience NOT required, but standards are high

**Key Message:** "Experience is not required. Meeting the standard is."

## Design System (Final Institutional)

### Typography
- **Serif (Headings):** Playfair Display - 700/800 weight
- **Sans (Body):** Inter - 400/500/600/700 weight
- **H1 Hero:** 56px (3.5rem), -0.02em letter-spacing
- **H2 Section:** 42px (2.625rem), -0.01em letter-spacing  
- **Body Large:** 17px (1.0625rem), 1.6 line-height
- **Body:** 15px (0.9375rem), 1.5 line-height

### Colors
- **Black:** #000000
- **White:** #FFFFFF
- **Gray Text:** #666666
- **Gray Border:** #EAEAEA
- **Gray Hover:** #F5F5F5

### Layout
- **Max Width:** 1100px (down from 1400px)
- **Section Padding:** 120px top/bottom
- **Hero Padding:** 160px top / 120px bottom
- **Grid Gap:** 2-2.5rem

### Buttons
**Primary:**
- Black bg, white text
- Padding: 14px 22px (0.875rem 1.375rem)

**Secondary:**
- White bg, black border (1px)
- Hover: inverts to black bg

## Final Page Structure

### 1. Hero Section ✅
- Tagline: "THE WORK IS THE CREDENTIAL"
- Headline: "Operate at an Institutional Standard"
- Subheadline: Student-led platform messaging
- CTAs: "Apply to Echelon" + "View Research"
- Chess image (grayscale, 95% opacity)

### 2. Stats Bar ✅
- 32 Active Analysts
- 100+ Applicants Screened  
- 6 Sectors Covered
- 24 Models Completed
- 2px top/bottom border

### 3. Positioning Section ✅
- Title: "This Is Not a Course"
- 2 paragraphs explaining proving ground concept
- 4 principles in 2×2 bordered grid:
  - Output over credentials
  - Institutional rigor
  - Peer accountability
  - Professional review

### 4. Active Coverage (Portfolio) ✅
- Title: "Active Coverage"
- Professional table with 2px black border
- 6 companies: PLTR, DG, ISRG, EPD, V, TDG
- Status badges: Active (black), Monitoring (gray), Complete (light gray)
- Conviction badges: Long (black), Hold (dark gray), Neutral (mid gray), Validated (light gray)
- Right-aligned Fair Value column (monospace font)

### 5. What You Do ✅
- Title: "Produce Institutional-Grade Work"
- 4 cards in 2×2 grid:
  - Financial Modeling
  - Valuation
  - Investment Memos
  - Market Analysis
- Black icon boxes, minimal borders

### 6. Review Section ✅
- Title: "Reviewed to Institutional Standards"
- 2 quote cards with 4px black left border
- Quotes from Aldridge & Monroe and Verani Capital
- Italic quotes, professional attributions

### 7. Standards Section ✅
- Title: "Standards of Practice"
- Intro paragraph
- Example standard box:
  - Black text for numbers/outputs
  - Blue for references only
  - No additional formatting

### 8. Analyst Tracks ✅
- Title: "Analyst Tracks"
- 4 tracks in 2×2 grid:
  - Track 01: Three-Statement Modeling
  - Track 02: DCF Valuation & Sensitivity
  - Track 03: Investment Memo
  - Track 04: LBO Modeling
- Each with deliverable section (border-top separator)

### 9. Selection Process ✅
- Title: "Selection Process"
- Subtitle: "We do not accept everyone"
- Simple numbered list:
  1. Application submission
  2. Technical / written evaluation
  3. Final selection

### 10. Final CTA ✅
- Black background section
- Title: "Apply to Echelon"
- Subtitle: "Access is limited. Selection is deliberate."
- White button: "Submit Application"

### 11. Header ✅
- Fixed position
- Logo: "ECHELON EQUITY" (Playfair Display, 700)
- Nav: Research, Apply, Tracks, Contact (outlined button)

### 12. Footer ✅
- 4-column grid
- Contact emails: team@, admissions@
- Legal links, resources
- Co-founder attribution

## What Was Refined (March 2026)

### Copy Changes
- Sharper, more institutional language throughout
- Removed educational/friendly tone
- Emphasized "evaluation" over "teaching"
- "Applicants Screened" instead of "Applications Received"
- "Long" instead of "Buy" for conviction
- "Monitoring" instead of "Watch" for status

### Design Improvements
- Reduced max-width: 1400px → 1100px (tighter, more focused)
- Increased headline sizes for impact
- Standardized spacing system
- 2px borders on major elements (table, stats bar)
- Quote-style review cards with left border accent
- Cleaner table design with column separators
- Monospace fonts for tickers and values
- Right-aligned numbers in tables
- Simplified track cards (removed skill tags, used deliverable separator)
- More authoritative button labels

### Typography Refinements
- Larger serif headlines (Playfair Display)
- Tighter letter-spacing on headlines (-0.02em)
- Consistent uppercase labels (0.08em tracking)
- Improved line-height ratios (1.5-1.7)
- Serif for section titles, sans for body

### UI Polish
- Removed rounded corners (0-1px only)
- Cleaner borders (1px standard, 2px for emphasis)
- Subtle hover states (no over-animation)
- Professional table styling (feels like internal research)
- Icon boxes reduced to 48px (was 56-60px)
- Cards feel less "marketing" more "documentation"

## Technical Implementation

### Components Created
All components use "-final" class suffix for institutional design:
- `Hero.jsx` - Hero with tagline, headline, CTAs
- `Stats.jsx` - 4-stat grid with borders
- `Positioning.jsx` - "This Is Not a Course" section
- `Portfolio.jsx` - Professional portfolio table
- `WhatYouDo.jsx` - 4 activity cards
- `Review.jsx` - 2 quote cards from Wall Street reviewers
- `Standards.jsx` - Standards box with example
- `Tracks.jsx` - 4 analyst track cards
- `Selection.jsx` - Simple selection process
- `FinalCTA.jsx` - Black CTA section
- `Header.jsx` - Fixed institutional header
- `Footer.jsx` - Standard footer

### Removed Components
- Mission.jsx (merged into Positioning)
- ProgramTracks.jsx (replaced with Tracks)
- Reviewers.jsx (replaced with Review)
- Testimonials.jsx (removed)
- FAQ.jsx (removed for cleaner experience)
- Careers.jsx (removed from landing page)
- ApplicationProcess.jsx (replaced with Selection)
- WhatYouWillDoData (simplified to WhatYouDo)

### CSS Architecture
- Single App.css with institutional design system
- Class naming: `-final` suffix for all new styles
- CSS variables for colors and spacing
- Mobile-responsive breakpoints at 968px and 640px
- No gradients, minimal shadows
- Professional hover states only

## Success Metrics
✅ Feels like Goldman Sachs/Blackstone recruiting page  
✅ NOT a student project or course aesthetic  
✅ Sharp, institutional copy throughout  
✅ Professional table presentation (like internal research)  
✅ Quote-based credibility (not resume cards)  
✅ Minimal, authoritative design  
✅ Black & white only (no color)  
✅ Playfair + Inter typography properly implemented  

## Next Phase (Backend Integration)
1. POST /api/applications - Application form submissions
2. POST /api/contact - Contact form submissions
3. Email notifications to admissions@echelonequity.co
4. Admin dashboard for application review

## Brand Guidelines
**DO:**
- Use institutional language
- Emphasize output and execution
- Make it feel selective and rigorous
- Use "analyst" terminology
- Reference Wall Street standards

**DON'T:**
- Make it feel beginner-friendly
- Say "anyone can join"
- Use course/bootcamp language
- Add color or decorative elements
- Over-explain or be verbose

## Final Assessment
The site now feels like:
- **Investment bank career page** (Goldman, JP Morgan)
- **Hedge fund research platform** (serious, data-driven)
- **Private equity memo** (rigorous, evidence-based)

The message is clear and confident:
**"Experience is not required. Meeting the standard is."**

## Latest Updates (Elite-But-Accessible Refinement)

### Header Update
- Changed logo from "ECHELON EQUITY" to **"Echelon."** (with period)
- More refined, editorial brand presentation

### Finnhub API Integration ✅
**Implementation:**
- Created `finnhubService.js` with real-time stock data fetching
- API Key: `d6meb3pr01qi0ajltsp0d6meb3pr01qi0ajltspg`
- Fetches live quotes for all 6 portfolio companies
- Auto-refreshes every 60 seconds
- Added "Current Price" column alongside "Target Price"

**Portfolio Table Now Shows:**
- Ticker, Company, Sector, Status, Conviction
- **Current Price** (live from Finnhub)
- **Target Price** (DCF fair value)
- Market data attribution note

**Real-Time Data:**
- PLTR: $146.28
- DG: $118.73
- ISRG: $460.99
- EPD: $37.84
- V: $302.24
- TDG: $1,158.96

### Application Form Refinement ✅
**Strategy: Elite but accessible**
- Open to high school AND university applicants
- "Prior experience not a prerequisite" (not "not required")
- Maintains selective, rigorous positioning

**New Fields:**
1. **Full Name** - Standard text input
2. **Email Address** - Standard email input
3. **School / University** - Works for both audiences
4. **Academic Level** - NEW dropdown:
   - High School
   - Undergraduate
   - Other
5. **Graduation Year** - e.g., 2026
6. **Field of Study / Academic Focus** - Better for high school students
7. **Track of Interest** - Dropdown:
   - Technical Analysis
   - Equity Research
   - Macro Policy
   - PR / Marketing
8. **Why Echelon** - "What draws you to Echelon? What do you intend to demonstrate through your work?"
9. **Relevant Experience (Optional)** - Includes high school-friendly examples:
   - "coursework, personal projects, competitions, research, or internships"
   - States: "Prior experience is not required"
10. **Resume / CV Upload (Optional)** - PDF, with note "You may apply without one"
11. **Work Sample (Optional, Highly Recommended)** - For models, analyses, writing samples

**Footer Note:**
"Echelon is open to both high school and university-level applicants. Prior experience is not a prerequisite. Selection is based on demonstrated potential and ability to meet the standard."

### Key Positioning Language
**What We Say:**
- "Not a prerequisite"
- "Evaluated on execution"
- "Standard remains high"
- "Demonstrated potential"
- "Ability to meet the standard"

**What We Never Say:**
- "For beginners"
- "Learn finance"
- "No experience needed 😊"
- "Anyone can join"

### Result
Now positioned as:
- **Accessible** → anyone with potential can apply
- **Selective** → not everyone gets in
- **Serious** → work defines you, not background

Perfect for elite pipelines that widen access while maintaining rigor.

## Technical Stack
**Frontend:**
- React 19.0.0
- Tailwind CSS + shadcn/ui components
- Playfair Display + Inter typography
- Finnhub API integration for real-time market data

**External Services:**
- Finnhub Stock API (real-time quotes)

**Future Backend:**
- FastAPI (Python)
- MongoDB (database)
- File upload handling for resumes/work samples
- Email notifications via SendGrid or similar
