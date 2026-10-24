import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, "..", p);

const template = fs.readFileSync(toAbsolute("dist/index.html"), "utf-8");

// Routes to prerender with their metadata
const routes = [
  {
    url: "/",
    title: "Mohammed Arsalaan | APM II, Convin.ai",
    description:
      "Mohammed Arsalaan builds LLM evals, conversation intelligence, AI voice and chat agents, MCP integrations, and cost-optimised AI infrastructure at Convin.ai.",
    ogImage: "https://keephustling.in/og-image.jpg",
  },
  {
    url: "/work",
    title: "Work | Mohammed Arsalaan",
    description:
      "Product work, side builds, and AI projects by Mohammed Arsalaan. From LLM infrastructure at Convin to AI agents for travel, compliance, and equity research.",
    ogImage: "https://keephustling.in/og-image.jpg",
  },
  {
    url: "/blog",
    title: "Blog | Mohammed Arsalaan",
    description:
      "Writing about AI products, product management, LLM evals, conversation intelligence, and the unglamorous parts of shipping. By Mohammed Arsalaan.",
    ogImage: "https://keephustling.in/og-image.jpg",
  },
  {
    url: "/case-studies",
    title: "Case Studies | Mohammed Arsalaan",
    description: "Product design frameworks, root-cause analyses, and guesstimate breakdowns by Mohammed Arsalaan.",
    ogImage: "https://keephustling.in/og-image.jpg",
  },
];

// Add blog post routes
const blogPosts = [
  {
    slug: "the-gold-in-rejected-calls",
    title: "The Gold in Rejected Calls",
    description:
      "What I learned from listening to 100 sales calls that lasted under 30 seconds. Discovery hidden in what everyone else skips.",
    cover: "https://keephustling.in/og-image.jpg",
  },
  {
    slug: "weekly-update-your-manager-reads",
    title: "The Weekly Update Your Manager Actually Reads",
    description:
      "A lightweight template for weekly updates that forces clarity and keeps you aligned. What worked, what's blocking, what's next.",
    cover: "https://keephustling.in/og-image.jpg",
  },
  {
    slug: "first-year-as-a-product-manager",
    title: "My First Year as a Product Manager",
    description:
      "From PRDs nobody read to shipping features people actually use. What the first year of product management taught me.",
    cover: "https://keephustling.in/og-image.jpg",
  },
  {
    slug: "from-darjeeling-to-iit-dhanbad",
    title: "From Darjeeling to IIT Dhanbad",
    description:
      "Leaving a small town for engineering school. What changed, what stayed, and what I learned about ambition and belonging.",
    cover: "https://keephustling.in/og-image.jpg",
  },
  {
    slug: "why-hobbies-matter-in-corporate-life",
    title: "Why Hobbies Matter in Corporate Life",
    description:
      "Guitar, calligraphy, and sketching taught me more about focus and iteration than any product course. On making time for what doesn't ship.",
    cover: "https://keephustling.in/og-image.jpg",
  },
  {
    slug: "ai-will-not-take-your-job",
    title: "AI Will Not Take Your Job",
    description:
      "AI is a tool, not a replacement. What changes is who learns to use it well. On adaptation, leverage, and what stays human.",
    cover: "https://keephustling.in/og-image.jpg",
  },
  {
    slug: "how-my-pm-job-changed-in-a-year",
    title: "How My PM Job Changed in a Year",
    description:
      "From coordination to shipping. What the role became when the team got smaller and the product got bigger.",
    cover: "https://keephustling.in/og-image.jpg",
  },
];

blogPosts.forEach((post) => {
  routes.push({
    url: `/blog/${post.slug}`,
    title: `${post.title} | Mohammed Arsalaan`,
    description: post.description,
    ogImage: post.cover,
  });
});

// Add work detail routes
const workProjects = [
  {
    slug: "convin",
    title: "Convin | Mohammed Arsalaan",
    description:
      "Building LLM infrastructure, no-code QA automation, and AI insight delivery at Convin. 65% cost reduction, $1.7M renewals influenced.",
  },
  {
    slug: "aspire",
    title: "Aspire | Mohammed Arsalaan",
    description: "Payment rail migration and accounting automation at Aspire. Under 1.25% error rate, +15% CSAT.",
  },
  {
    slug: "stayora",
    title: "Stayora | Mohammed Arsalaan",
    description:
      "An AI travel agent that plans trips, waits for approval, and lets you book hotels in rupees. Built solo with React, Express, MongoDB, and PydanticAI.",
  },
  {
    slug: "product-os",
    title: "Product OS | Mohammed Arsalaan",
    description:
      "Self-hosted workspace for product work. Pulls Jira, chat, and code into one place, drafts PRDs from tickets, and keeps context searchable.",
  },
  {
    slug: "quantum",
    title: "QuanTum | Mohammed Arsalaan",
    description:
      "Equity research agent for Indian markets. Reads news, scores stocks across three horizons, learns from its misses.",
  },
  {
    slug: "accessshield",
    title: "AccessShield | Mohammed Arsalaan",
    description: "Four AI agents that audit websites for ADA compliance and return fixes in plain English. 34 WCAG checks, 30 seconds.",
  },
];

workProjects.forEach((project) => {
  routes.push({
    url: `/work/${project.slug}`,
    title: project.title,
    description: project.description,
    ogImage: "https://keephustling.in/og-image.jpg",
  });
});

// Render each route
for (const route of routes) {
  try {
    // Replace meta tags with route-specific content
    let html = template
      .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      .replace(/<meta name="title" content=".*?"/, `<meta name="title" content="${route.title}"`)
      .replace(
        /<meta name="description" content=".*?"/,
        `<meta name="description" content="${route.description}"`
      )
      .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${route.title}"`)
      .replace(
        /<meta property="og:description" content=".*?"/,
        `<meta property="og:description" content="${route.description}"`
      )
      .replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="https://keephustling.in${route.url}"`)
      .replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${route.ogImage}"`)
      .replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${route.title}"`)
      .replace(
        /<meta name="twitter:description" content=".*?"/,
        `<meta name="twitter:description" content="${route.description}"`
      )
      .replace(/<meta name="twitter:url" content=".*?"/, `<meta name="twitter:url" content="https://keephustling.in${route.url}"`)
      .replace(/<meta name="twitter:image" content=".*?"/, `<meta name="twitter:image" content="${route.ogImage}"`)
      .replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="https://keephustling.in${route.url}"`);

    const filePath = `dist${route.url === "/" ? "/index" : route.url}.html`;
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(toAbsolute(filePath), html);
    console.log(`✓ Prerendered ${route.url}`);
  } catch (error) {
    console.error(`✗ Failed to prerender ${route.url}:`, error);
  }
}

console.log("\n✓ Prerendering complete!");
