import { absoluteUrl, siteAssets, siteConfig } from "./siteConfig";

const routeMetadata = {
  "/": {
    title: "Echelon Equity | Student-Led Investment Research Platform",
    description:
      "Echelon Equity is a student-led investment research platform where analysts build models, write memos, and work to institutional standards.",
    pageTitle: "Echelon Equity Student-Led Investment Research",
    canonical: absoluteUrl("/"),
    ogType: "website",
    schemaType: "WebPage",
  },
  "/apply": {
    title: "Apply | Echelon Equity Investment and Operating Roles",
    description:
      "Apply to Echelon Equity for investment team, leadership, fundraising, and marketing / content roles held to a selective standard.",
    pageTitle: "Apply to Echelon Equity",
    canonical: absoluteUrl("/apply"),
    ogType: "website",
    schemaType: "WebPage",
  },
  "/portfolio": {
    title: "Portfolio | Echelon Equity Investment Research Coverage",
    description:
      "Review Echelon Equity's investment research coverage, sector focus, and active analyst work across public equities and valuation-driven research.",
    pageTitle: "Investment Research Portfolio and Coverage",
    canonical: absoluteUrl("/portfolio"),
    ogType: "website",
    schemaType: "CollectionPage",
  },
  "/program": {
    title: "Program | Echelon Equity Roles and Selection Process",
    description:
      "See Echelon Equity's public role outlines across the investment team, leadership, fundraising, and marketing / content, plus standards and selection.",
    pageTitle: "Echelon Equity Roles and Selection Process",
    canonical: absoluteUrl("/program"),
    ogType: "website",
    schemaType: "WebPage",
  },
  "/team": {
    title: "Team | Echelon Equity Student-Led Research Analysts",
    description:
      "Meet the Echelon Equity research analysts producing investment research, models, and memos across equity, macro, technical, and strategy work.",
    pageTitle: "Echelon Equity Research Analysts",
    canonical: absoluteUrl("/team"),
    ogType: "website",
    schemaType: "AboutPage",
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

  return {
    ...page,
    pathname: normalizedPath,
    image: siteAssets.ogImage,
    siteName: siteConfig.name,
  };
}

export function getAllRouteMetadata() {
  return routeMetadata;
}
