// Mock data for Echelon Equity - Student-Led Private Equity Initiative

export const heroData = {
  tagline: "The Work Is the Credential.",
  headline: "Prove You Can Operate at a High Level",
  subheadline: "Student-led private equity initiative. Institutional-grade analysis. Reviewed by Wall Street professionals. Built in NYC, 2025.",
  ctaPrimary: "Apply to Echelon",
  ctaSecondary: "View Research"
};

export const statsData = [
  {
    value: "32",
    label: "Active Analysts"
  },
  {
    value: "100+",
    label: "Applications Received"
  },
  {
    value: "6",
    label: "Sectors Covered"
  },
  {
    value: "24",
    label: "Models Built"
  }
];

export const missionData = {
  title: "This Is Not a Course",
  description: "Echelon is a proving ground for future investors and operators. We don't teach finance—we demand execution. DCF models, three-statement analyses, LBO models, and formal investment memos reviewed against institutional standards by working Wall Street analysts.",
  principles: [
    "Output over credentials",
    "Institutional rigor",
    "Peer accountability",
    "Professional review"
  ]
};

export const programTracksData = [
  {
    id: 1,
    track: "01",
    name: "Three-Statement Modeling",
    description: "Build integrated Income Statement, Balance Sheet, and Cash Flow models from 10-K filings. Master the foundation of financial analysis.",
    deliverable: "Integrated IS/BS/CF from 10-K",
    skills: ["Financial statement linkage", "Working capital analysis", "Accounting mechanics", "Model structure"]
  },
  {
    id: 2,
    track: "02",
    name: "DCF Valuation & Sensitivity",
    description: "Develop discounted cash flow models with dynamic sensitivity tables. Learn to value companies like institutional analysts.",
    deliverable: "DCF with ±1% WACC / ±0.5% TGR tables",
    skills: ["Valuation theory", "WACC calculation", "Terminal value", "Sensitivity analysis"]
  },
  {
    id: 3,
    track: "03",
    name: "Investment Memo",
    description: "Write comprehensive investment theses reviewed by experienced Wall Street analysts. Defend your conviction.",
    deliverable: "8–12 page memo reviewed by Wall St. analyst",
    skills: ["Investment thesis", "Industry analysis", "Competitive positioning", "Risk assessment"]
  },
  {
    id: 4,
    track: "04",
    name: "LBO Modeling",
    description: "Build leveraged buyout models with debt schedules, IRR calculations, and returns waterfalls. Understand private equity mechanics.",
    deliverable: "Dynamic LBO with debt schedule, IRR, returns waterfall",
    skills: ["Leverage analysis", "Credit structure", "IRR optimization", "Exit scenarios"]
  }
];

export const portfolioCompaniesData = [
  {
    ticker: "PLTR",
    company: "Palantir Technologies",
    sector: "Technology · SaaS",
    status: "Active",
    conviction: "Hold",
    dcfValue: "$31.20"
  },
  {
    ticker: "DG",
    company: "Dollar General",
    sector: "Consumer · Retail",
    status: "Active",
    conviction: "Buy",
    dcfValue: "$147.50"
  },
  {
    ticker: "ISRG",
    company: "Intuitive Surgical",
    sector: "Healthcare · MedTech",
    status: "Watch",
    conviction: "Neutral",
    dcfValue: "$415.00"
  },
  {
    ticker: "EPD",
    company: "Enterprise Products",
    sector: "Energy · Midstream",
    status: "Closed",
    conviction: "Thesis ✓",
    dcfValue: "$32.80"
  },
  {
    ticker: "V",
    company: "Visa Inc.",
    sector: "Financial Services",
    status: "Active",
    conviction: "Buy",
    dcfValue: "$298.00"
  },
  {
    ticker: "TDG",
    company: "TransDigm Group",
    sector: "Industrials · Aerospace",
    status: "Watch",
    conviction: "Neutral",
    dcfValue: "$1,240.00"
  }
];

export const reviewersData = [
  {
    id: 1,
    firm: "Verani Capital Partners",
    role: "IB Analyst",
    experience: "2yr"
  },
  {
    id: 2,
    firm: "Aldridge & Monroe Securities",
    role: "Equity Research Analyst",
    experience: "3yr"
  },
  {
    id: 3,
    firm: "Thornfield Advisory Group",
    role: "Corporate Finance Analyst",
    experience: "2yr"
  }
];

export const standardsData = {
  title: "Standards of Practice",
  description: "We operate to institutional standards. Every model, memo, and presentation follows the same protocols used by top-tier firms.",
  sops: [
    {
      rule: "Blue/Black Rule",
      description: "Black for all numbers and text. Blue for cell references only. No other colors."
    },
    {
      rule: "File Naming",
      description: "[TICKER]_ModelType_v1_[LastName].extension"
    },
    {
      rule: "Version Control",
      description: "v1, v2, v3 — never 'final'"
    },
    {
      rule: "Balance Sheet Must Balance",
      description: "Non-compliant files returned without review"
    },
    {
      rule: "Sensitivity Tables Required",
      description: "±1% WACC, ±0.5% TGR on all DCF work"
    },
    {
      rule: "Peer Review",
      description: "Required before pipeline submission"
    }
  ]
};

export const applicationProcessData = {
  title: "Application Process",
  description: "Acceptance is earned, not given. We review every application for technical aptitude, work ethic, and intellectual curiosity.",
  steps: [
    {
      step: 1,
      title: "Submit Application",
      description: "Complete the application form with your background, interests, and why you're ready for Echelon."
    },
    {
      step: 2,
      title: "Technical Assessment",
      description: "Selected candidates complete a modeling exercise to demonstrate baseline competency."
    },
    {
      step: 3,
      title: "Interview",
      description: "Final round conversation with founding team and senior analysts."
    },
    {
      step: 4,
      title: "Onboarding",
      description: "Accepted analysts join our Slack, receive track assignments, and begin building."
    }
  ]
};

export const whatYouWillDoData = {
  title: "What You'll Do",
  activities: [
    {
      title: "Build Real Analysis",
      description: "Construct DCF models, three-statement models, and LBO analyses on public companies across six sectors.",
      icon: "FileSpreadsheet"
    },
    {
      title: "Write Investment Memos",
      description: "Develop 8-12 page investment theses defending your conviction—buy, hold, or sell.",
      icon: "FileText"
    },
    {
      title: "Present to Peers",
      description: "Defend your work in group sessions. Answer tough questions. Refine your thinking.",
      icon: "Presentation"
    },
    {
      title: "Get Professional Review",
      description: "Every deliverable reviewed by working Wall Street analysts. Real feedback. Institutional standards.",
      icon: "CheckCircle2"
    }
  ]
};

export const testimonialsData = [
  {
    id: 1,
    name: "Alex Martinez",
    role: "Analyst, Technology Sector",
    content: "Echelon forced me to think like a professional from day one. The feedback from Wall Street reviewers was more valuable than any classroom lecture.",
    avatar: "AM"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Analyst, Healthcare Sector",
    content: "This isn't about certificates or grades. It's about producing work that actually matters. That's what separates Echelon.",
    avatar: "PP"
  },
  {
    id: 3,
    name: "James Chen",
    role: "Analyst, Financial Services",
    content: "The rigor is real. My DCF models are now part of my portfolio when talking to recruiters. That speaks for itself.",
    avatar: "JC"
  }
];

export const faqData = [
  {
    id: 1,
    question: "Who is Echelon for?",
    answer: "Ambitious students and early-career professionals who want to prove they can operate at an institutional level. If you're serious about finance, investing, or private equity—and willing to do the work—Echelon is for you."
  },
  {
    id: 2,
    question: "Is this a course or bootcamp?",
    answer: "No. Echelon is not a course. We don't lecture. We assign real work, hold you to professional standards, and review your output like a Wall Street firm would. You learn by doing."
  },
  {
    id: 3,
    question: "What's the time commitment?",
    answer: "Expect 10-15 hours per week including model building, memo writing, and peer sessions. This is rigorous work—treat it like a real analyst position."
  },
  {
    id: 4,
    question: "Do I need prior finance experience?",
    answer: "Basic financial literacy helps, but we've accepted analysts with diverse backgrounds. What matters is work ethic, intellectual curiosity, and willingness to meet institutional standards."
  },
  {
    id: 5,
    question: "How selective is the program?",
    answer: "Very. We've received 100+ applications and currently have 32 active analysts. We're building a community of top talent, not maximizing headcount."
  },
  {
    id: 6,
    question: "What do I get out of this?",
    answer: "A portfolio of institutional-grade work, direct feedback from Wall Street professionals, and a signal to future employers that you can execute. The work is the credential."
  }
];

export const careersData = {
  intro: {
    title: "Join the Team",
    description: "We're looking for exceptional individuals to help build Echelon. High-performance culture. High standards. Top-tier talent only."
  },
  roles: [
    {
      id: 1,
      title: "Technical Analyst",
      description: "Build and maintain sophisticated data infrastructure, portfolio modeling systems, and analytics platforms that power our investment decisions.",
      requirements: [
        "Strong Python/SQL skills with financial data experience",
        "Systems thinking and architecture mindset",
        "Obsessive attention to detail and data integrity",
        "Ability to translate complex requirements into elegant solutions"
      ]
    },
    {
      id: 2,
      title: "Equity Research Analyst",
      description: "Conduct deep-dive fundamental analysis on public equities, identify high-conviction opportunities, and deliver institutional-grade research.",
      requirements: [
        "CFA Level 2+ or equivalent experience",
        "Track record of generating actionable investment ideas",
        "Expert financial modeling and valuation skills",
        "Clear, compelling written communication"
      ]
    },
    {
      id: 3,
      title: "Macro Policy Analyst",
      description: "Analyze global economic trends, monetary policy, and geopolitical developments to inform our strategic asset allocation and risk management.",
      requirements: [
        "Deep understanding of macroeconomics and capital markets",
        "Ability to synthesize complex information into actionable insights",
        "Strong quantitative and qualitative research skills",
        "Intellectual curiosity and contrarian thinking"
      ]
    },
    {
      id: 4,
      title: "PR / Marketing",
      description: "Shape Echelon's brand narrative, manage communications, and drive growth through strategic content and partnerships.",
      requirements: [
        "Experience in finance, education, or premium brand marketing",
        "Exceptional writing and storytelling ability",
        "Understanding of student/early-career audience",
        "Creative and data-driven approach to growth"
      ]
    }
  ]
};

// Form submission mock handlers
export const handleApplicationSubmit = (formData) => {
  console.log("Application submission:", formData);
  return {
    success: true,
    message: "Application received. We review all submissions carefully and will be in touch within 7 business days."
  };
};

export const handleContactSubmit = (formData) => {
  console.log("Contact form submission:", formData);
  return {
    success: true,
    message: "Message received. We'll respond within 24-48 hours."
  };
};

export const handleCareerApplicationSubmit = (formData) => {
  console.log("Career application submission:", formData);
  return {
    success: true,
    message: "Application received. If there's a fit, we'll reach out within 2 weeks."
  };
};
