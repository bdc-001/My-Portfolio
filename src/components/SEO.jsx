import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { POSTS } from "../lib/posts";

const BASE_URL = "https://keephustling.in";

const PERSON = {
  "@type": "Person",
  name: "Arsalaan Mohammed",
  url: BASE_URL,
  image: `${BASE_URL}/og-image.jpg`,
  jobTitle: "Product Manager",
  worksFor: { "@type": "Organization", name: "Convin.ai", url: "https://convin.ai" },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Indian Institute of Technology Dhanbad",
    alternateName: "IIT Dhanbad",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  email: "arsalaan.bdc@gmail.com",
  sameAs: ["https://www.linkedin.com/in/arsalaan-pm/", "https://www.youtube.com/@ArsalaanMd25"],
  description: "Product Manager at Convin.ai | IIT Dhanbad Alumnus | Building AI-powered products that drive business growth",
};

const absoluteUrl = (url) => (/^https?:\/\//.test(url) ? url : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`);

const Seo = ({ title, description, image, type = "website", noindex = false }) => {
  const location = useLocation();
  const currentUrl = `${BASE_URL}${location.pathname}`;

  const seoTitle = title || "Arsalaan Mohammed - Product Manager | IIT Dhanbad | AI Product Builder";
  const seoDescription =
    description ||
    "Arsalaan Mohammed - Product Manager at Convin.ai specializing in AI-powered products. IIT Dhanbad graduate with expertise in 0-to-1 product development, product strategy, and driving measurable business growth. Based in Bangalore, India.";
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
      updateMetaTag("og:site_name", "Arsalaan Mohammed");

      updateMetaTag("twitter:card", "summary_large_image");
      updateMetaTag("twitter:url", currentUrl);
      updateMetaTag("twitter:title", seoTitle);
      updateMetaTag("twitter:description", seoDescription);
      updateMetaTag("twitter:image", seoImage);

      let script = document.querySelector('script[type="application/ld+json"]');
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
            author: PERSON,
            publisher: { "@type": "Person", name: "Arsalaan Mohammed" },
          };
        }
      } else if (location.pathname === "/") {
        structuredData = { "@context": "https://schema.org", ...PERSON };
      }

      if (structuredData) {
        if (!script) {
          script = document.createElement("script");
          script.setAttribute("type", "application/ld+json");
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
