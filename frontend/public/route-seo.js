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
        "Echelon Equity is a student-led investment research platform where analysts develop financial models, publish equity research, and train to institutional standards.",
      ogTitle: "Echelon Equity | Student-Led Equity Research Platform",
      ogDescription:
        "Explore a student-led equity research platform built around valuation rigor, clear communication, and repeatable analyst process.",
      twitterTitle: "Echelon Equity | Student-Led Equity Research",
      twitterDescription:
        "Student analysts build models, write memos, and publish disciplined investment research.",
      pageTitle: "Echelon Equity Student-Led Investment Research",
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
      schemaType: "AboutPage",
    },
    "/newsletter": {
      title: "Newsletter | Echelon Equity Research, Not Noise",
      description:
        "Subscribe to the Echelon Equity newsletter for student-led equity research, market notes, and memo highlights with educational context.",
      pageTitle: "Echelon Equity Newsletter",
      schemaType: "CollectionPage",
    },
    "/newsletter/archive": {
      title: "Newsletter Archive | Echelon Equity Past Issues",
      description:
        "Browse past Echelon Equity newsletter issues featuring market notes and memo highlights from the student-led research team.",
      pageTitle: "Echelon Equity Newsletter Archive",
      schemaType: "CollectionPage",
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
  var isHome = seo.pathname === "/";
  var breadcrumbItems =
    isHome
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
  upsertMeta('meta[property="og:title"]', { property: "og:title" }, route.ogTitle || route.title);
  upsertMeta('meta[property="og:description"]', { property: "og:description" }, route.ogDescription || route.description);
  upsertMeta('meta[property="og:url"]', { property: "og:url" }, seo.canonical);
  upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
  upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, SITE_NAME);
  upsertMeta('meta[property="og:image"]', { property: "og:image" }, seo.image);
  upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt" }, SITE_NAME + " social share image");
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, route.twitterTitle || route.title);
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, route.twitterDescription || route.description);
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, seo.image);
  upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt" }, SITE_NAME + " social share image");

  upsertLink("canonical", seo.canonical);

  if (isHome) {
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
        "Echelon Equity is a student-led investment research platform where analysts develop financial models, publish equity research, and train to institutional standards.",
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
        "Echelon Equity is a student-led investment research platform where analysts develop financial models, publish equity research, and train to institutional standards.",
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
        "Echelon Equity is a student-led investment research platform where analysts develop financial models, publish equity research, and train to institutional standards.",
      sameAs: SOCIAL_LINKS,
    });
  } else {
    ["schema-organization", "schema-website", "schema-brand"].forEach(function (id) {
      var node = document.head.querySelector("#" + id);
      if (node) node.remove();
    });
  }

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
