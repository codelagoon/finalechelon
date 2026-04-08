// Echelon Equity - Final Institutional-Grade Copy

export const heroData = {
  tagline: "STUDENT-LED INVESTMENT RESEARCH",
  headline: "Echelon Equity Operates at Institutional Standards",
  subheadline:
    "Echelon Equity is a student-run investment research platform where analysts build models, write investment memos, and develop under institutional standards.",
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
    label: "Applicants Screened"
  },
  {
    value: "6",
    label: "Sectors Covered"
  },
  {
    value: "24",
    label: "Models Completed"
  }
];

export const positioningData = {
  title: "Why Echelon Equity Is Different",
  paragraphs: [
    "Echelon Equity is a student-led investment research platform built for analysts who want to produce real work, not just consume finance content.",
    "Members contribute investment research, valuation work, and formal memos that are reviewed against institutional standards and sharpened through structured feedback."
  ],
  principles: [
    "Output over credentials",
    "Institutional rigor",
    "Peer accountability",
    "Professional review"
  ]
};

export const coverageData = {
  title: "Investment Research Coverage",
  subtitle: "Active research coverage across public equities. Each position is supported by structured investment research, updated market context, and analyst review.",
  attribution: "Market data sourced from Finnhub. Updated periodically."
};

export const whatYouDoData = {
  title: "What Research Analysts Do",
  subtitle: "Members contribute investment research through structured workflows that mirror institutional expectations.",
  activities: [
    {
      title: "Financial Modeling",
      description: "Build integrated three-statement models directly from filings.",
      icon: "FileSpreadsheet"
    },
    {
      title: "Valuation",
      description: "Develop DCF models with sensitivity analysis and defensible assumptions.",
      icon: "Calculator"
    },
    {
      title: "Investment Memos",
      description: "Write structured theses supported by data, risk analysis, and catalysts.",
      icon: "FileText"
    },
    {
      title: "Market Analysis",
      description: "Evaluate sectors, macro trends, and positioning.",
      icon: "TrendingUp"
    }
  ]
};

export const reviewData = {
  title: "Research Reviewed Against Institutional Standards",
  subtitle: "Every deliverable is evaluated for clarity, structure, and valuation discipline against serious professional expectations.",
  reviews: [
    {
      quote: "Work produced here meets expectations for junior analysts.",
      attribution: "Equity Research Analyst, Aldridge & Monroe Securities"
    },
    {
      quote: "Strong attention to structure and valuation discipline.",
      attribution: "IB Analyst, Verani Capital Partners"
    }
  ]
};

export const analystWorkData = {
  title: "Recent Analyst Work",
  subtitle: "Selected excerpts from current analyst output.",
  samples: [
    {
      id: 1,
      title: "DCF Output — Palantir Technologies",
      description: "Revenue projections, margin expansion assumptions, terminal value sensitivity."
    },
    {
      id: 2,
      title: "Investment Memo — Visa Inc.",
      description: "Positioning, competitive moat, risk factors, and valuation range."
    },
    {
      id: 3,
      title: "Three-Statement Model — Dollar General",
      description: "Integrated financials built directly from filings."
    },
    {
      id: 4,
      title: "LBO Analysis — TransDigm Group",
      description: "Leverage structure, debt schedule, IRR scenarios, and exit multiples."
    }
  ],
  footer: "Full materials are internal."
};

export const partnershipsData = {
  title: "Platform & Industry Partnerships",
  subtitle: "Built with tools and resources used in professional investment workflows.",
  partners: [
    { name: "TIKR", logo: "tikr" },
    { name: "Adventis CG", logo: "adventis" },
    { name: "Excel Exercises", logo: "excel-exercises" },
    { name: "YIS.org", logo: "yis" }
  ]
};

export const standardsData = {
  title: "Research Standards and Methodology",
  intro: "Echelon Equity operates with standards designed to make student-led investment research clearer, more defensible, and more professional. Every model, memo, and presentation follows structured protocols so the work can stand up to review.",
  exampleStandard: {
    title: "Example Standard:",
    rules: [
      "Black text for all numbers and outputs.",
      "Blue reserved strictly for references.",
      "No additional formatting."
    ]
  }
};

export const tracksData = {
  title: "Analyst Tracks",
  subtitle: "Analysts operate within structured tracks aligned to institutional workflows.",
  tracks: [
    {
      id: 1,
      number: "01",
      name: "Three-Statement Modeling",
      description: "Build fully integrated financial statements from 10-K filings.",
      deliverable: "Integrated IS / BS / CF model"
    },
    {
      id: 2,
      number: "02",
      name: "DCF Valuation & Sensitivity",
      description: "Develop discounted cash flow models with dynamic assumptions.",
      deliverable: "DCF with sensitivity tables"
    },
    {
      id: 3,
      number: "03",
      name: "Investment Memo",
      description: "Write formal investment theses reviewed against professional standards.",
      deliverable: "Full investment memo"
    },
    {
      id: 4,
      number: "04",
      name: "LBO Modeling",
      description: "Construct leveraged buyout models with return analysis.",
      deliverable: "LBO model with IRR outputs"
    }
  ]
};

export const selectionData = {
  title: "Selection Process",
  subtitle: "We do not accept everyone. Applicants are evaluated based on clarity of thinking, attention to detail, and ability to execute.",
  selectivityNote: "Not all applicants are admitted.",
  steps: [
    "Application submission",
    "Technical / written evaluation",
    "Final selection"
  ]
};

export const finalCTAData = {
  title: "Apply to the Echelon Equity Research Program",
  subtitle: "Join a student-led investment research platform built around output, review, and institutional standards.",
  selectivityNote: "Selection is deliberate and based on execution.",
  cta: "Submit Application"
};

// Form submission handlers
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
