export const siteConfig = {
  name: "Echelon Equity",
  shortName: "Echelon",
  siteUrl: "https://echelonequity.co",
  defaultTitle: "Echelon Equity | Investment Research Platform",
  defaultDescription:
    "Echelon Equity is an investment research platform where analysts build models, write memos, and work to institutional standards.",
  defaultOgImagePath: "/social-share.svg",
  slogan: "The Work Is the Credential.",
  emails: {
    general: "team@echelonequity.co",
    admissions: "admissions@echelonequity.co",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/echelon-equity",
    instagram: "https://www.instagram.com/echelonequity",
    tiktok: "https://www.tiktok.com/@echelonequity",
    facebook: null,
    x: null,
    youtube: null,
  },
};

export const realSocialLinks = Object.values(siteConfig.social).filter(Boolean);

export function absoluteUrl(path = "/") {
  if (!path || path === "/") {
    return siteConfig.siteUrl;
  }

  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteAssets = {
  logo: absoluteUrl("/favicon.png"),
  ogImage: absoluteUrl(siteConfig.defaultOgImagePath),
};
