// Echelon Equity - Final Institutional-Grade Copy

export const heroData = {
  tagline: "THE WORK IS THE CREDENTIAL.",
  headline: "Operate at an Institutional Standard",
  subheadline: "Student-led investment research platform. Institutional-grade analysis. Reviewed by experienced Wall Street professionals.",
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
  title: "This Is Not a Course",
  paragraphs: [
    "Echelon is a proving ground for future investors and operators. We do not teach finance — we evaluate execution.",
    "Analysts produce DCF models, three-statement analyses, LBO models, and formal investment memos. All work is reviewed against institutional standards."
  ],
  principles: [
    "Output over credentials",
    "Institutional rigor",
    "Peer accountability",
    "Professional review"
  ]
};

export const portfolioCompaniesData = [
  {
    ticker: "PLTR",
    company: "Palantir Technologies",
    sector: "Technology · SaaS",
    status: "Active",
    conviction: "Hold",
    fairValue: "$31.20"
  },
  {
    ticker: "DG",
    company: "Dollar General",
    sector: "Consumer · Retail",
    status: "Active",
    conviction: "Long",
    fairValue: "$147.50"
  },
  {
    ticker: "ISRG",
    company: "Intuitive Surgical",
    sector: "Healthcare · MedTech",
    status: "Monitoring",
    conviction: "Neutral",
    fairValue: "$415.00"
  },
  {
    ticker: "EPD",
    company: "Enterprise Products",
    sector: "Energy · Midstream",
    status: "Complete",
    conviction: "Validated",
    fairValue: "$32.80"
  },
  {
    ticker: "V",
    company: "Visa Inc.",
    sector: "Financial Services",
    status: "Active",
    conviction: "Long",
    fairValue: "$298.00"
  },
  {
    ticker: "TDG",
    company: "TransDigm Group",
    sector: "Industrials · Aerospace",
    status: "Monitoring",
    conviction: "Neutral",
    fairValue: "$1,240.00"
  }
];

export const whatYouDoData = {
  title: "Produce Institutional-Grade Work",
  subtitle: "Analysts are expected to operate within structured investment workflows.",
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
  title: "Reviewed to Institutional Standards",
  subtitle: "Every deliverable is evaluated by experienced analysts working at top firms.",
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

export const standardsData = {
  title: "Standards of Practice",
  intro: "We operate using the same frameworks applied at institutional firms. Every model, memo, and presentation follows strict protocols. No shortcuts. No exceptions.",
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
  steps: [
    "Application submission",
    "Technical / written evaluation",
    "Final selection"
  ]
};

export const finalCTAData = {
  title: "Apply to Echelon",
  subtitle: "Access is limited. Selection is deliberate.",
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
