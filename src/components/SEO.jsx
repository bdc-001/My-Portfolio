import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { POSTS } from "../lib/posts";

const BASE_URL = "https://keephustling.in";
const SITE_NAME = "Keep Hustling";
const DEFAULT_TITLE = `${SITE_NAME} | Arsalaan Mohammed, Product Manager`;

// Full Person and WebSite entities live in index.html; pages reference them by @id.
const PERSON_REF = { "@type": "Person", "@id": `${BASE_URL}/#person`, name: "Arsalaan Mohammed", url: BASE_URL };
const WEBSITE_REF = { "@id": `${BASE_URL}/#website` };

const absoluteUrl = (url) => (/^https?:\/\//.test(url) ? url : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`);

const Seo = ({ title, description, image, type = "website", noindex = false }) => {
  const location = useLocation();
  const currentUrl = `${BASE_URL}${location.pathname}`;

  const seoTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const seoDescription =
    description ||
    "Keep Hustling is the personal website of Arsalaan Mohammed, Product Manager at Convin.ai and IIT Dhanbad alum. AI products, 0-to-1 work, and honest stories from the journey. Based in Bangalore, India.";
  const seoImage = absoluteUrl(image || "/og-image.jpg");

  useEffect(() => {
    document.title = seoTitle;

    requestAnimationFrame(() => {
      const updateMetaTag = (property, content) => {
        let element =
          document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);

        if (!element) {
          element = document.createElement("meta");
          element.setAttribute(property.startsWith("og:") ? "property" : "name", property);
          document.head.appendChild(element);
        }
        element.setAttribute("content", content);
      };

      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", currentUrl);

      updateMetaTag("title", seoTitle);
      updateMetaTag("description", seoDescription);
      updateMetaTag("robots", noindex ? "noindex, follow" : "index, follow");

      updateMetaTag("og:type", type);
      updateMetaTag("og:url", currentUrl);
      updateMetaTag("og:title", seoTitle);
      updateMetaTag("og:description", seoDescription);
      updateMetaTag("og:image", seoImage);
      updateMetaTag("og:site_name", SITE_NAME);

      updateMetaTag("twitter:card", "summary_large_image");
      updateMetaTag("twitter:url", currentUrl);
      updateMetaTag("twitter:title", seoTitle);
      updateMetaTag("twitter:description", seoDescription);
      updateMetaTag("twitter:image", seoImage);

      let script = document.querySelector("script[data-page-schema]");
      let structuredData = null;

      if (type === "article") {
        const post = POSTS.find((p) => location.pathname === `/blog/${p.slug}`);
        if (post) {
          structuredData = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: absoluteUrl(post.coverImage),
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: currentUrl,
            author: PERSON_REF,
            publisher: PERSON_REF,
            isPartOf: WEBSITE_REF,
          };
        }
      } else if (location.pathname === "/") {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: BASE_URL,
          name: DEFAULT_TITLE,
          mainEntity: PERSON_REF,
          isPartOf: WEBSITE_REF,
        };
      }

      if (structuredData) {
        if (!script) {
          script = document.createElement("script");
          script.setAttribute("type", "application/ld+json");
          script.setAttribute("data-page-schema", "");
          document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(structuredData);
      } else if (script) {
        script.remove();
      }
    });
  }, [seoTitle, seoDescription, seoImage, currentUrl, type, noindex, location.pathname]);

  return null;
};

export default Seo;
