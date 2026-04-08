(function () {
  var SITE_URL = "https://echelonequity.co";
  var SITE_NAME = "Echelon Equity";
  var DEFAULT_IMAGE = SITE_URL + "/social-share.svg";
  var SOCIAL_LINKS = [
    "https://www.linkedin.com/company/echelon-equity",
    "https://www.instagram.com/echelonequity",
    "https://www.tiktok.com/@echelonequity",
  ];

  var routes = {
    "/": {
      title: "Echelon Equity | Student-Led Investment Research Platform",
      description:
        "Echelon Equity is a student-led investment research platform where analysts build models, write memos, and work to institutional standards.",
      pageTitle: "Echelon Equity Student-Led Investment Research",
      schemaType: "WebPage",
    },
    "/apply": {
      title: "Apply | Echelon Equity Investment Research Program",
      description:
        "Apply to Echelon Equity's student-led investment research program for analysts who want to build real work under institutional standards.",
      pageTitle: "Apply to the Echelon Equity Investment Research Program",
      schemaType: "WebPage",
    },
    "/portfolio": {
      title: "Portfolio | Echelon Equity Investment Research Coverage",
      description:
        "Review Echelon Equity's investment research coverage, sector focus, and active analyst work across public equities and valuation-driven research.",
      pageTitle: "Investment Research Portfolio and Coverage",
      schemaType: "CollectionPage",
    },
    "/program": {
      title: "Program | Echelon Equity Investment Research Tracks",
      description:
        "See how Echelon Equity's student-led investment research program works, including analyst tracks, review standards, and the selection process.",
      pageTitle: "Student-Led Investment Research Program",
      schemaType: "WebPage",
    },
    "/team": {
      title: "Team | Echelon Equity Student-Led Research Analysts",
      description:
        "Meet the Echelon Equity research analysts producing investment research, models, and memos across equity, macro, technical, and strategy work.",
      pageTitle: "Echelon Equity Research Analysts",
      schemaType: "AboutPage",
    },
  };

  function normalizePathname(pathname) {
    if (!pathname || pathname === "/") {
      return "/";
    }

    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  }

  function getRouteData(pathname) {
    var normalized = normalizePathname(pathname);
    return {
      pathname: normalized,
      canonical: normalized === "/" ? SITE_URL : SITE_URL + normalized,
      image: DEFAULT_IMAGE,
      route: routes[normalized] || routes["/"],
    };
  }

  function upsertMeta(selector, attributes, content) {
    var element = document.head.querySelector(selector);

    if (!element) {
      element = document.createElement("meta");
      Object.keys(attributes).forEach(function (key) {
        element.setAttribute(key, attributes[key]);
      });
      document.head.appendChild(element);
    }

    element.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    var element = document.head.querySelector('link[rel="' + rel + '"]');

    if (!element) {
      element = document.createElement("link");
      element.setAttribute("rel", rel);
      document.head.appendChild(element);
    }

    element.setAttribute("href", href);
  }

  function upsertJsonLd(id, payload) {
    var element = document.head.querySelector("#" + id);

    if (!element) {
      element = document.createElement("script");
      element.type = "application/ld+json";
      element.id = id;
      document.head.appendChild(element);
    }

    element.textContent = JSON.stringify(payload);
  }

  var seo = getRouteData(window.location.pathname);
  var route = seo.route;
  var breadcrumbItems =
    seo.pathname === "/"
      ? []
      : [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: route.pageTitle,
            item: seo.canonical,
          },
        ];

  document.title = route.title;

  upsertMeta('meta[name="description"]', { name: "description" }, route.description);
  upsertMeta('meta[name="robots"]', { name: "robots" }, "index, follow, max-image-preview:large");
  upsertMeta('meta[property="og:title"]', { property: "og:title" }, route.title);
  upsertMeta('meta[property="og:description"]', { property: "og:description" }, route.description);
  upsertMeta('meta[property="og:url"]', { property: "og:url" }, seo.canonical);
  upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
  upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, SITE_NAME);
  upsertMeta('meta[property="og:image"]', { property: "og:image" }, seo.image);
  upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt" }, SITE_NAME + " social share image");
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, route.title);
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, route.description);
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, seo.image);
  upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt" }, SITE_NAME + " social share image");

  upsertLink("canonical", seo.canonical);

  upsertJsonLd("schema-organization", {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE_URL + "#organization",
    name: SITE_NAME,
    alternateName: "Echelon",
    url: SITE_URL,
    logo: SITE_URL + "/favicon.png",
    image: DEFAULT_IMAGE,
    description:
      "Echelon Equity is a student-led investment research platform where analysts build models, write memos, and work to institutional standards.",
    slogan: "The Work Is the Credential.",
    email: "team@echelonequity.co",
    sameAs: SOCIAL_LINKS,
  });

  upsertJsonLd("schema-website", {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_URL + "#website",
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Echelon Equity is a student-led investment research platform where analysts build models, write memos, and work to institutional standards.",
    inLanguage: "en-US",
    publisher: {
      "@id": SITE_URL + "#organization",
    },
  });

  upsertJsonLd("schema-brand", {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": SITE_URL + "#brand",
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_URL + "/favicon.png",
    slogan: "The Work Is the Credential.",
    description:
      "Echelon Equity is a student-led investment research platform where analysts build models, write memos, and work to institutional standards.",
    sameAs: SOCIAL_LINKS,
  });

  upsertJsonLd("schema-page", {
    "@context": "https://schema.org",
    "@type": route.schemaType,
    "@id": seo.canonical + "#webpage",
    url: seo.canonical,
    name: route.pageTitle,
    description: route.description,
    isPartOf: {
      "@id": SITE_URL + "#website",
    },
    about: {
      "@id": SITE_URL + "#organization",
    },
    primaryImageOfPage: DEFAULT_IMAGE,
    inLanguage: "en-US",
  });

  if (breadcrumbItems.length) {
    upsertJsonLd("schema-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": seo.canonical + "#breadcrumb",
      itemListElement: breadcrumbItems,
    });
  }
})();
