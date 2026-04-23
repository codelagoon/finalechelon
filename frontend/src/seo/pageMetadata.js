import { absoluteUrl, siteAssets, siteConfig } from "./siteConfig";

const routeMetadata = {
  "/": {
    title: "Echelon Equity | Student-Led Investment Research Platform",
    description:
      "Echelon Equity is a student-led investment research platform where analysts develop financial models, publish equity research, and train to institutional standards.",
    ogTitle: "Echelon Equity | Student-Led Equity Research Platform",
    ogDescription:
      "Explore a student-led equity research platform built around valuation rigor, clear communication, and repeatable analyst process.",
    twitterTitle: "Echelon Equity | Student-Led Equity Research",
    twitterDescription:
      "Student analysts build models, write memos, and publish disciplined investment research.",
    pageTitle: "Echelon Equity Student-Led Investment Research",
    canonical: absoluteUrl("/"),
    ogType: "website",
    schemaType: "WebPage",
  },
  "/apply": {
    title: "Apply to Echelon Equity | Analyst Program Applications",
    description:
      "Submit your application to Echelon Equity for investment research and operating roles with selective standards for judgment, communication, and execution.",
    ogTitle: "Apply to Echelon Equity | Student Analyst Roles",
    ogDescription:
      "Join a selective student equity research program with clear expectations, structured review, and real analyst output.",
    twitterTitle: "Apply to Echelon Equity",
    twitterDescription:
      "Applications are open for research and operating roles across Echelon Equity.",
    pageTitle: "Apply to the Echelon Equity Program",
    canonical: absoluteUrl("/apply"),
    ogType: "website",
    schemaType: "WebPage",
  },
  "/portfolio": {
    title: "Research Portfolio | Echelon Equity Coverage",
    description:
      "Review Echelon Equity research coverage across public equities, including analyst theses, valuation work, and sector-level investment analysis.",
    ogTitle: "Echelon Equity Portfolio | Published Research Coverage",
    ogDescription:
      "Browse student-led equity research, sector coverage, and valuation-driven analyst work.",
    twitterTitle: "Echelon Equity Research Portfolio",
    twitterDescription:
      "A coverage hub for student-led equity research and investment memos.",
    pageTitle: "Echelon Equity Research Portfolio",
    canonical: absoluteUrl("/portfolio"),
    ogType: "website",
    schemaType: "CollectionPage",
  },
  "/program": {
    title: "Investment Research Program | Echelon Equity",
    description:
      "Learn how the Echelon Equity program trains analysts through structured research workflows, feedback cycles, and institutional-quality standards.",
    ogTitle: "Echelon Equity Program | Analyst Development",
    ogDescription:
      "See how analysts are trained, reviewed, and developed through a practical equity research program.",
    twitterTitle: "Echelon Equity Investment Research Program",
    twitterDescription:
      "Program details, analyst standards, and the path from training to published research.",
    pageTitle: "Echelon Equity Investment Research Program",
    canonical: absoluteUrl("/program"),
    ogType: "website",
    schemaType: "WebPage",
  },
  "/team": {
    title: "Team | Echelon Equity Analyst and Leadership Profiles",
    description:
      "Meet the Echelon Equity analyst team and leadership members responsible for equity research, valuation work, and editorial review standards.",
    ogTitle: "Echelon Equity Team | Analyst Profiles",
    ogDescription:
      "View analyst and leadership profiles behind Echelon Equity's student-led research output.",
    twitterTitle: "Echelon Equity Team",
    twitterDescription:
      "The analysts and leaders behind Echelon Equity's equity research workflow.",
    pageTitle: "Echelon Equity Analyst Team",
    canonical: absoluteUrl("/team"),
    ogType: "website",
    schemaType: "AboutPage",
  },
  "/newsletter": {
    title: "Newsletter | Echelon Equity Research, Not Noise",
    description:
      "Subscribe to the Echelon Equity newsletter for student-led equity research, market notes, and memo highlights with educational context.",
    pageTitle: "Echelon Equity Newsletter",
    canonical: absoluteUrl("/newsletter"),
    ogType: "website",
    schemaType: "CollectionPage",
  },
  "/newsletter/archive": {
    title: "Newsletter Archive | Echelon Equity Past Issues",
    description:
      "Browse past Echelon Equity newsletter issues featuring market notes and memo highlights from the student-led research team.",
    pageTitle: "Echelon Equity Newsletter Archive",
    canonical: absoluteUrl("/newsletter/archive"),
    ogType: "website",
    schemaType: "CollectionPage",
  },
  "/newsletter/admin": {
    title: "Newsletter Admin | Echelon Equity",
    description:
      "Create, update, and delete Echelon Equity newsletter issues from the browser using the protected admin token.",
    pageTitle: "Echelon Equity Newsletter Admin",
    canonical: absoluteUrl("/newsletter/admin"),
    ogType: "website",
    schemaType: "WebPage",
  },
  "/standards": {
    title: "Standards & Quality Scorecard | Echelon Equity Research",
    description:
      "Review Echelon Equity's publication standards, editorial process, analyst expectations, and operating metrics. Transparency in research quality and accountability.",
    ogTitle: "Echelon Equity Standards | Editorial Quality & Rigor",
    ogDescription:
      "See how Echelon Equity maintains publication standards, conducts editorial review, and measures research quality.",
    twitterTitle: "Echelon Equity Standards",
    twitterDescription:
      "Publication standards, editorial process, and operating metrics for quality student-led research.",
    pageTitle: "Echelon Equity Research Standards & Scorecard",
    canonical: absoluteUrl("/standards"),
    ogType: "website",
    schemaType: "WebPage",
  },
  "/toolkit": {
    title: "Student Investor Toolkit | Echelon Equity Templates & Resources",
    description:
      "Downloadable templates and checklists for financial modeling, investment memos, DCF analysis, and research process. Learn alongside Echelon Equity standards.",
    ogTitle: "Investor Toolkit | Echelon Equity Resources",
    ogDescription:
      "Free templates, learning guides, and interactive tools for building financial models and investment research.",
    twitterTitle: "Echelon Equity Investor Toolkit",
    twitterDescription:
      "Templates, checklists, and resources for financial modeling and equity research.",
    pageTitle: "Echelon Equity Student Investor Toolkit",
    canonical: absoluteUrl("/toolkit"),
    ogType: "website",
    schemaType: "CollectionPage",
  },
  "/why-student-finance-work-is-weak": {
    title: "Why Most Student Finance Work Is Weak | Echelon Equity",
    description:
      "A sharp critique of common pitfalls in student financial analysis and how Echelon Equity's process and standards make research publishable.",
    ogTitle: "Why Research Discipline Matters | Echelon Equity Positioning",
    ogDescription:
      "Understand the gap between student research and publishable work—and how institutional process closes it.",
    twitterTitle: "Why Student Research Falls Short",
    twitterDescription:
      "A positioning essay on research quality, process, and institutional accountability.",
    pageTitle: "Why Most Student Finance Work Is Weak",
    canonical: absoluteUrl("/why-student-finance-work-is-weak"),
    ogType: "website",
    schemaType: "BlogPosting",
  },
  "/toolkit/dcf-builder": {
    title: "Interactive DCF Builder | Echelon Equity",
    description:
      "Step-by-step DCF valuation tool designed for learning. See how assumptions flow from revenue through free cash flow to equity value per share.",
    ogTitle: "Build a DCF | Echelon Equity Educational Tool",
    ogDescription:
      "Interactive DCF builder with presets, formulas, and validation to teach valuation modeling.",
    twitterTitle: "Interactive DCF Builder",
    twitterDescription:
      "Educational DCF tool showing how assumptions drive valuation output.",
    pageTitle: "Build a DCF - Echelon Equity Interactive Tool",
    canonical: absoluteUrl("/toolkit/dcf-builder"),
    ogType: "website",
    schemaType: "WebPage",
  },
};

function normalizePathname(pathname = "/") {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function getPageMetadata(pathname = "/") {
  const normalizedPath = normalizePathname(pathname);
  const page = routeMetadata[normalizedPath] || routeMetadata["/"];
  const canonicalPath = normalizedPath === "/" ? "/" : normalizedPath;

  return {
    ...page,
    pathname: normalizedPath,
    canonical: absoluteUrl(canonicalPath),
    ogTitle: page.ogTitle || page.title,
    ogDescription: page.ogDescription || page.description,
    twitterTitle: page.twitterTitle || page.title,
    twitterDescription: page.twitterDescription || page.description,
    image: siteAssets.ogImage,
    siteName: siteConfig.name,
  };
}

export function getAllRouteMetadata() {
  return routeMetadata;
}
