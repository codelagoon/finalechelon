import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMetadata } from "../seo/pageMetadata";
import {
  absoluteUrl,
  realSocialLinks,
  siteAssets,
  siteConfig,
} from "../seo/siteConfig";

function upsertMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertJsonLd(id, payload) {
  let element = document.head.querySelector(`#${id}`);

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = id;
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(payload);
}

function buildPageSchemas(metadata) {
  const pageUrl = metadata.canonical;
  const breadcrumbItems =
    metadata.pathname === "/"
      ? []
      : [
          {
            "@type": "ListItem",
            position: 1,
            name: siteConfig.name,
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: metadata.pageTitle,
            item: pageUrl,
          },
        ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.siteUrl}#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.siteUrl,
    logo: siteAssets.logo,
    image: siteAssets.ogImage,
    description: siteConfig.defaultDescription,
    slogan: siteConfig.slogan,
    email: siteConfig.emails.general,
    sameAs: realSocialLinks,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.name,
    description: siteConfig.defaultDescription,
    inLanguage: "en-US",
    publisher: {
      "@id": `${siteConfig.siteUrl}#organization`,
    },
  };

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${siteConfig.siteUrl}#brand`,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: siteAssets.logo,
    slogan: siteConfig.slogan,
    description: siteConfig.defaultDescription,
    sameAs: realSocialLinks,
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": metadata.schemaType,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: metadata.pageTitle,
    description: metadata.description,
    isPartOf: {
      "@id": `${siteConfig.siteUrl}#website`,
    },
    about: {
      "@id": `${siteConfig.siteUrl}#organization`,
    },
    primaryImageOfPage: siteAssets.ogImage,
    inLanguage: "en-US",
  };

  const breadcrumbSchema =
    breadcrumbItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: breadcrumbItems,
        }
      : null;

  return {
    organizationSchema,
    websiteSchema,
    brandSchema,
    pageSchema,
    breadcrumbSchema,
  };
}

const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    const metadata = getPageMetadata(location.pathname);
    const {
      organizationSchema,
      websiteSchema,
      brandSchema,
      pageSchema,
      breadcrumbSchema,
    } = buildPageSchemas(metadata);

    document.title = metadata.title;

    upsertMeta('meta[name="description"]', { name: "description" }, metadata.description);
    upsertMeta('meta[name="robots"]', { name: "robots" }, "index, follow, max-image-preview:large");
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, metadata.title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, metadata.description);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, metadata.canonical);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, metadata.ogType);
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, siteConfig.name);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, metadata.image);
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt" }, `${siteConfig.name} social share image`);
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, metadata.title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, metadata.description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, metadata.image);
    upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt" }, `${siteConfig.name} social share image`);

    upsertLink("canonical", metadata.canonical);

    upsertJsonLd("schema-organization", organizationSchema);
    upsertJsonLd("schema-website", websiteSchema);
    upsertJsonLd("schema-brand", brandSchema);
    upsertJsonLd("schema-page", pageSchema);

    if (breadcrumbSchema) {
      upsertJsonLd("schema-breadcrumb", breadcrumbSchema);
    } else {
      const breadcrumbScript = document.head.querySelector("#schema-breadcrumb");
      if (breadcrumbScript) {
        breadcrumbScript.remove();
      }
    }
  }, [location.pathname]);

  return null;
};

export default SEOHead;
