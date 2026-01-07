import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BLOG_POSTS } from "../constants/blogs";

const SEO = ({ title, description, image, type = "website" }) => {
  const location = useLocation();
  const baseUrl = "https://keephustling.in";
  const currentUrl = `${baseUrl}${location.pathname}`;

  // Default values
  const defaultTitle = "Arsalaan Mohammed - Product Manager | IIT Dhanbad | AI Product Builder";
  const defaultDescription = "Arsalaan Mohammed - Product Manager at Convin.ai specializing in AI-powered products. IIT Dhanbad graduate with expertise in 0-to-1 product development, product strategy, and driving measurable business growth. Based in Bangalore, India.";
  const defaultImage = `${baseUrl}/favicon.png`;

  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;

  useEffect(() => {
    // Update document title immediately (critical)
    document.title = seoTitle;

    // Batch DOM updates using requestAnimationFrame for better INP
    requestAnimationFrame(() => {
      // Update or create meta tags
      const updateMetaTag = (property, content) => {
        let element = document.querySelector(`meta[property="${property}"]`) || 
                      document.querySelector(`meta[name="${property}"]`);
        
        if (!element) {
          element = document.createElement("meta");
          if (property.startsWith("og:") || property.startsWith("twitter:")) {
            element.setAttribute("property", property);
          } else {
            element.setAttribute("name", property);
          }
          document.head.appendChild(element);
        }
        element.setAttribute("content", content);
      };

      // Update canonical URL
      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", currentUrl);

      // Primary Meta Tags
      updateMetaTag("title", seoTitle);
      updateMetaTag("description", seoDescription);

      // Open Graph Tags
      updateMetaTag("og:type", type);
      updateMetaTag("og:url", currentUrl);
      updateMetaTag("og:title", seoTitle);
      updateMetaTag("og:description", seoDescription);
      updateMetaTag("og:image", seoImage);
      updateMetaTag("og:site_name", "Arsalaan Mohammed Portfolio");

      // Twitter Card Tags
      updateMetaTag("twitter:card", "summary_large_image");
      updateMetaTag("twitter:url", currentUrl);
      updateMetaTag("twitter:title", seoTitle);
      updateMetaTag("twitter:description", seoDescription);
      updateMetaTag("twitter:image", seoImage);

      // Add structured data
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }

      if (type === "article") {
      // Blog post structured data
      const post = BLOG_POSTS.find(p => location.pathname.includes(p.slug));
      if (post) {
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": post.coverImage,
          "datePublished": post.date,
          "dateModified": post.date,
          "author": {
            "@type": "Person",
            "name": "Arsalaan Mohammed",
            "url": baseUrl,
            "jobTitle": "Product Manager",
            "worksFor": {
              "@type": "Organization",
              "name": "Convin.ai"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "IIT Dhanbad"
            }
          },
          "publisher": {
            "@type": "Person",
            "name": "Arsalaan Mohammed"
          }
        };
        script.textContent = JSON.stringify(structuredData);
      }
    } else if (location.pathname === "/") {
      // Homepage - Person/Professional structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Arsalaan Mohammed",
        "url": baseUrl,
        "jobTitle": "Product Manager",
        "worksFor": {
          "@type": "Organization",
          "name": "Convin.ai",
          "url": "https://convin.ai"
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Indian Institute of Technology Dhanbad",
          "alternateName": "IIT Dhanbad"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "email": "arsalaan.bdc@gmail.com",
        "sameAs": [
          "https://www.linkedin.com/in/arsalaan-pm/",
          "https://www.youtube.com/@ArsalaanMd25"
        ],
        "description": "Product Manager at Convin.ai | IIT Dhanbad Alumnus | Building AI-powered products that drive business growth"
      };
        script.textContent = JSON.stringify(structuredData);
      } else if (location.pathname === "/") {
        // Homepage - Person/Professional structured data
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Arsalaan Mohammed",
          "url": baseUrl,
          "jobTitle": "Product Manager",
          "worksFor": {
            "@type": "Organization",
            "name": "Convin.ai",
            "url": "https://convin.ai"
          },
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Indian Institute of Technology Dhanbad",
            "alternateName": "IIT Dhanbad"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "email": "arsalaan.bdc@gmail.com",
          "sameAs": [
            "https://www.linkedin.com/in/arsalaan-pm/",
            "https://www.youtube.com/@ArsalaanMd25"
          ],
          "description": "Product Manager at Convin.ai | IIT Dhanbad Alumnus | Building AI-powered products that drive business growth"
        };
        script.textContent = JSON.stringify(structuredData);
      } else {
        // Remove structured data for other pages
        script.remove();
      }
    });
  }, [seoTitle, seoDescription, seoImage, currentUrl, type, location.pathname]);

  return null;
};

export default SEO;

