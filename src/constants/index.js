import project1 from "../assets/projects/project-1.webp";
import project2 from "../assets/projects/project-2.webp";
import stayoraImage from "../assets/projects/stayora.webp";
import productOsImage from "../assets/projects/product-os.webp";
import quantumImage from "../assets/projects/quantum.webp";
import accessShieldImage from "../assets/projects/accessshield.webp";
import convinImage from "../assets/projects/convin.webp";
import aspireImage from "../assets/projects/aspire.webp";
import revenueImage from "../assets/projects/revenue-attribution.webp";

export const PROFILE = {
  name: "Arsalaan Mohammed",
  role: "Product Manager",
  company: "Convin.ai",
  location: "Bangalore, India",
  headline: "I turn messy, zero-to-one problems into AI products people actually use.",
  tagline:
    "Engineer turned product manager. I build AI products at Convin, write about what the work teaches me, and sing when nobody's shipping anything.",
};

export const ABOUT_FACTS = [
  { label: "Based in", value: "Bangalore, India" },
  { label: "Grew up in", value: "Darjeeling" },
  { label: "Studied", value: "IIT (ISM) Dhanbad" },
  { label: "Recognised", value: "LinkedIn Top PM Voice" },
];

export const NOW = [
  {
    label: "Building",
    text: "LLM infrastructure and AI insight products at Convin.ai.",
  },
  {
    label: "Writing",
    text: "About AI, lead intelligence, and the unglamorous parts of product.",
  },
  {
    label: "Off the clock",
    text: "Guitar, Urdu shayari, and the occasional valuation report.",
  },
];

/** The hero board. `stage`: 0 discover, 1 building, 2 shipped. Keep it to what you're actually working on. */
export const HERO_ROADMAP = [
  {
    id: "self-hosted-llms",
    stage: 2,
    title: "Self-hosted LLMs",
    source: "Convin",
    why: "Third-party LLM bills grew with every call, so we moved to fine-tuned models on our own H200s.",
    outcome: { value: "−65%", label: "LLM infra cost" },
    href: "/work/convin",
  },
  {
    id: "stayora",
    stage: 2,
    title: "Stayora trip agent",
    source: "Side build",
    why: "AI trip planners stop at a paragraph and leave the booking to you.",
    outcome: { value: "Live", label: "Plan, approve, pay in ₹" },
    href: "/work/stayora",
  },
  {
    id: "rule-engine",
    stage: 1,
    title: "No-code QA rule engine",
    source: "Convin",
    why: "Every new QA rule for a CX team needed an engineer to write it.",
    outcome: { value: "No-code", label: "QA rules set by CX teams" },
    href: "/work/convin",
  },
  {
    id: "product-os",
    stage: 1,
    title: "Product OS copilot",
    source: "Side build",
    why: "Every PRD started with an hour of digging through Jira, chat and code.",
    outcome: { value: "4", label: "Sources, one copilot" },
    href: "/work/product-os",
  },
  {
    id: "rejected-calls",
    stage: 0,
    title: "Rejected-call study",
    source: "Convin",
    why: "30-second “rejected” calls were skipped, or misread as hot leads.",
    outcome: { value: "100", label: "Calls heard end to end" },
    href: "/blog/the-gold-in-rejected-calls",
  },
  {
    id: "quantum",
    stage: 0,
    title: "QuanTum stock agent",
    source: "Side build",
    why: "Can a research agent learn from the picks it got wrong? Every call is checked against the Nifty.",
    outcome: { value: "9", label: "Scoring factors, 3 horizons" },
    href: "/work/quantum",
  },
];

export const ABOUT_PARAGRAPHS = [
  "I was hired to keep teams talking. A year later, I make the things those conversations used to hand off.",
  "At Convin there is no design team left to draw the screen, so I prototype it in Lovable and put it in front of people while the question is still warm. The words that leave with a feature are built the same way. I coded pipelines that read a release from the codebase and turn it into the LinkedIn post, the carousel, the product video, the one-pager and the sales brief. Gumloop only carries them out.",
  "The morning is already on the desk before I sit down. Sourabh, a PM OS I built, has the Jira tickets, the internal messages and the codebase in one place, and customer calls come in through Fireflies. I look for the thread they share, and the PRD starts there. Cursor stays open on the repo. Claude drafts. Lately Grok runs the next step, and I still read the end before anything is allowed to move.",
];

export const ABOUT_STATS = [
  { value: "65%", label: "LLM infra cost cut" },
  { value: "$1.7M", label: "Renewals influenced" },
  { value: "30+", label: "Consulting projects" },
  { value: "$400k+", label: "Capital raised" },
];

export const JOURNEY = [
  {
    when: "The hills",
    title: "North Point, Darjeeling",
    text: "Single child, protective parents, a beautiful cage with a view. I sketched, wrote poetry, and dreamed small.",
  },
  {
    when: "The city",
    title: "Frank Anthony Public School, Kolkata",
    text: "Pure science on paper. In practice, solving calculus in the margins of my biology notes.",
  },
  {
    when: "2020",
    title: "A pandemic and a drop year",
    text: "COVID cost me an attempt. YouTube at 1.5x became my coaching centre; 98.7 percentile followed.",
  },
  {
    when: "IIT (ISM)",
    title: "B.Tech, Chemical Engineering, IIT Dhanbad",
    text: "Coordinated the Product Management Club, co-founded Black Diamond Consulting, and travelled like I was making up for lost time.",
  },
  {
    when: "Jan – May 2023",
    title: "Junior Product Manager, Aspire",
    text: "Owned a payment-rail migration for high-value accounts and automated accounting integrations for SMEs.",
  },
  {
    when: "Sept 2023 – now",
    title: "Associate Product Manager, Convin.ai",
    text: "Joined on a PPO. Now shaping LLM infrastructure, automated QA, and AI insight delivery for enterprise CX teams.",
  },
];

export const WORK = [
  {
    slug: "convin",
    type: "experience",
    featured: true,
    title: "Convin",
    subtitle: "Making enterprise conversation intelligence cheaper, smarter, and self-serve.",
    role: "Associate Product Manager",
    period: "Sept 2023 – Present",
    image: convinImage,
    category: "B2B SaaS · AI",
    problem:
      "Convin's AI stack depended on expensive third-party LLM infrastructure, QA for customer conversations was largely manual, and insights rarely reached the people who could act on them.",
    solution:
      "Led the migration to self-hosted H200 GPU clusters running fine-tuned models. Designed a no-code Rule Engine so CX teams could automate QA without engineering help, and shipped an LLM-powered insight delivery system that pushes what matters to reps and leaders.",
    impact: [
      { value: "65%", label: "LLM infrastructure cost reduction" },
      { value: "$1.7M", label: "Renewals influenced" },
      { value: "140k", label: "API calls served per day" },
    ],
    stack: ["LLM Infrastructure", "No-code Rule Engine", "AI Strategy", "Enterprise CX"],
    relatedPosts: ["the-gold-in-rejected-calls"],
  },
  {
    slug: "aspire",
    type: "experience",
    featured: true,
    title: "Aspire",
    subtitle: "Migrating high-value accounts and automating SME accounting, without breaking trust.",
    role: "Junior Product Manager",
    period: "Jan 2023 – May 2023",
    image: aspireImage,
    category: "Fintech",
    problem:
      "A critical migration of high-value accounts between payment rails, alongside slow, manual accounting workflows for SME customers.",
    solution:
      "Owned the end-to-end Nium-SG to DBS-HK payment rail migration. Drove QuickBooks Online and Xero API integrations to automate bank-feed syncing for customers.",
    impact: [
      { value: "<1.25%", label: "Migration error rate" },
      { value: "+15%", label: "CSAT" },
      { value: "10%", label: "Operating cost reduction" },
    ],
    stack: ["Payment Rails", "API Integrations", "Migration Planning", "Fintech Ops"],
    relatedPosts: [],
  },
  {
    slug: "stayora",
    type: "project",
    track: "flagship",
    title: "Stayora",
    subtitle: "Hotel booking for India, with an AI travel agent that plans the whole trip and waits for your approval before anyone pays.",
    role: "Solo builder",
    period: "2026",
    image: stayoraImage,
    category: "Travel · AI agents",
    repo: "https://github.com/bdc-001/Stayora",
    live: "https://stayora-psi.vercel.app/plan-trip",
    pipeline: ["Describe the trip", "Agent plans", "You approve", "Pay in ₹"],
    problem:
      "Planning a trip in India means juggling a dozen tabs: hotels in one, ideas in another, payments somewhere else. Most AI trip planners stop at a nice paragraph and leave the actual booking to you.",
    solution:
      "Built a full booking platform (search, filters, Stripe checkout in rupees, bookings and refunds, an owner dashboard with business insights) and put an itinerary agent on top. You describe the trip in plain language, the agent proposes stays and day plans, you approve, and the bookable hotels go straight to checkout. A human signs off on every rupee.",
    impact: [
      { value: "3", label: "Services: React app, Express API, Python agent" },
      { value: "98", label: "Commits, shipped solo" },
      { value: "100%", label: "Bookings human-approved" },
    ],
    stack: ["React", "TypeScript", "Express", "MongoDB", "FastAPI", "PydanticAI", "Stripe", "Playwright"],
    relatedPosts: [],
  },
  {
    slug: "product-os",
    type: "project",
    track: "build",
    title: "Product OS",
    subtitle: "A self-hosted workspace for product work: notes, PRDs, prototypes, roadmap and launch docs in one place, with a copilot that knows your tickets and your code.",
    role: "Solo builder",
    period: "2026",
    image: productOsImage,
    category: "Product tooling · AI",
    repo: "https://github.com/bdc-001/Product-OS",
    pipeline: ["Jira, chat & code", "Index the context", "Draft PRD or prototype", "Approve & ship"],
    problem:
      "A PM's context is scattered across Jira, team chat, docs, the codebase and a dozen drafts. Every PRD, release note and campaign starts with an hour of digging before any real thinking happens.",
    solution:
      "Built one workspace that pulls it all together. Jira tickets, team chat and an indexed branch of the codebase feed into notes, PRDs (with AI drafts from tickets and code), interactive prototypes, a searchable document library, the roadmap and release comms. A copilot drafts answers and proposes actions from that context, and any write back to Jira waits for my approval.",
    impact: [
      { value: "9", label: "Workspace areas, from notes to marketing" },
      { value: "4", label: "Integrations: Jira, Cliq, Git, Drive" },
      { value: "Local", label: "Self-hosted, data stays on your machine" },
    ],
    stack: ["Next.js", "TypeScript", "Material UI", "FastAPI", "SQLite", "Playwright"],
    relatedPosts: [],
  },
  {
    slug: "quantum",
    type: "project",
    track: "build",
    image: quantumImage,
    title: "QuanTum",
    subtitle: "An equity research agent for Indian markets that reads the news, scores stocks across three horizons, and learns from its own misses.",
    role: "Solo builder",
    period: "2026",
    category: "Fintech · AI agents",
    repo: "https://github.com/bdc-001/Market-Research",
    pipeline: ["Market news", "Gemini extracts", "9-factor score", "Checked vs Nifty"],
    problem:
      "Retail research on Indian stocks is either noise from tip channels or hours of reading filings. I wanted a system that starts from what is actually moving the market and holds itself accountable for its picks.",
    solution:
      "Headlines from five Indian business outlets are extracted by Gemini into tickers, catalysts and sentiment. Nine factors, weighted by market regime, score each stock for this week, this year and five years. Every pick is later checked against the Nifty: factor weights shift toward what actually produced alpha, and a critic agent writes durable rules from its mistakes.",
    impact: [
      { value: "9", label: "Scoring factors" },
      { value: "3", label: "Investment horizons" },
      { value: "5", label: "News sources parsed daily" },
    ],
    stack: ["Python", "FastAPI", "React", "Gemini", "Turso"],
    relatedPosts: [],
  },
  {
    slug: "accessshield",
    type: "project",
    track: "build",
    image: accessShieldImage,
    title: "AccessShield",
    subtitle: "Four AI agents that audit a website for ADA compliance and hand back the fixes in plain English.",
    role: "Solo builder",
    period: "2026",
    category: "Compliance · AI agents",
    repo: "https://github.com/bdc-001/ADA-Compliance",
    pipeline: ["Scout", "Audit", "Fix", "Report"],
    problem:
      "Small businesses get hit with ADA lawsuits over issues they didn't know existed, and accessibility reports are written for auditors, not owners.",
    solution:
      "A Scout renders the site in a headless browser, an Auditor runs 34 WCAG 2.1 AA checks and scores lawsuit risk, an Engineer uses Gemini Vision to write real alt text and code fixes, and a Closer turns it all into a plain-English report. Know your risk in 30 seconds; fix it in 30 minutes.",
    impact: [
      { value: "34", label: "WCAG 2.1 AA checks" },
      { value: "4", label: "Autonomous agents" },
      { value: "30s", label: "To a risk score" },
    ],
    stack: ["Python", "FastAPI", "Playwright", "Gemini Vision"],
    relatedPosts: [],
  },
  {
    slug: "revenue-attribution-engine",
    type: "project",
    track: "earlier",
    title: "Revenue Attribution Engine",
    subtitle: "An AI-weighted attribution and marketing-mix model for CX revenue.",
    role: "Developer",
    period: null,
    image: revenueImage,
    category: "Analytics · AI",
    problem:
      "CX centres couldn't trust their revenue numbers. Fragmented CRM integrations made attribution inaccurate and incentives were allocated on guesswork.",
    solution:
      "Built a platform with AI-weighted attribution and marketing-mix modelling for ROI, plus fraud detection and cohort analysis on top.",
    impact: [
      { value: "200+", label: "API endpoints" },
      { value: "300+", label: "Records tested" },
      { value: "MMM", label: "ROI optimisation model" },
    ],
    stack: ["Go", "React", "PostgreSQL"],
    relatedPosts: ["the-gold-in-rejected-calls"],
  },
  {
    slug: "black-diamond-consulting",
    type: "project",
    track: "earlier",
    title: "Black Diamond Consulting",
    subtitle: "A venture-capital consulting firm, built from a college hostel.",
    role: "Co-Founder",
    period: "IIT (ISM) Dhanbad",
    image: project1,
    imageTreatment: "invert",
    category: "Consulting · VC",
    problem:
      "SMEs and early startups struggled to scale their tech projects and raise pre-seed funding without access to experienced operators.",
    solution:
      "Co-founded a venture-capital consulting firm from scratch, validated by IIT (ISM)'s incubation centre, delivering tech builds and fundraising support.",
    impact: [
      { value: "30+", label: "Projects delivered" },
      { value: "Top-tier", label: "Clients" },
      { value: "Tech + VC", label: "Builds and fundraising" },
    ],
    stack: ["Strategy", "Consulting", "Venture Capital"],
    relatedPosts: ["from-darjeeling-to-iit-dhanbad"],
  },
  {
    slug: "organhub",
    type: "project",
    track: "earlier",
    title: "OrganHub",
    subtitle: "Coordinating organ donation across donors, NGOs, and hospitals.",
    role: "Product Designer",
    period: null,
    image: project2,
    category: "HealthTech",
    problem:
      "The organ donation ecosystem is fragmented, causing delays and coordination failures exactly when time matters most.",
    solution:
      "Designed a research-led, responsive web app enabling end-to-end coordination across donors, NGOs, and hospitals.",
    impact: [
      { value: "15+", label: "Screens designed" },
      { value: "3", label: "Stakeholder groups" },
      { value: "E2E", label: "Coordination flow" },
    ],
    stack: ["UX Research", "Web App", "Healthcare"],
    relatedPosts: [],
  },
];

export const OFF_THE_CLOCK = [
  {
    key: "music",
    title: "Music",
    text: "I'm a vocalist and I play the guitar. Music is my meditation: it helps me find rhythm in chaos, which translates surprisingly well to roadmaps.",
  },
  {
    key: "markets",
    title: "Markets",
    text: "I love the numbers game. Stocks, valuation reports, market cycles. I believe in compounding, whether it's wealth or knowledge.",
  },
  {
    key: "content",
    title: "Content",
    text: "I share learnings, market research, and product notes on LinkedIn, where I earned the Top Product Management Voice badge, and on YouTube.",
  },
];

export const COUPLET = {
  lines: [
    "Khudi ko kar buland itna ke har taqdeer se pehle,",
    "Khuda bande se khud pooche, bata teri raza kya hai?",
  ],
  translation:
    "Elevate yourself so high that before every decree, God Himself asks you: what is your will?",
  author: "Allama Iqbal",
};

export const TESTIMONIALS = [
  {
    text: "I had the pleasure of working with Arsalaan on a comprehensive secondary research project focusing on 10+ Japanese and Western automotive OEMs. His work was exceptionally well-organized and thorough, showcasing his strong problem-solving and logical thinking abilities.",
    author: "Anuj Singh",
    role: "Strategy at Accenture Japan",
  },
  {
    text: "Arsalaan demonstrated exceptional skill and dedication at Mailmodo. He analyzed low PageSpeed pages and focused on improving Core Web Vitals (INP & LCP), providing technical solutions that enhanced mobile scores. His contributions have been invaluable for the organization.",
    author: "Zeeshan Akhtar",
    role: "Ex-Head of Marketing at Mailmodo",
  },
];

export const CONTACT = {
  address: "Bangalore, Karnataka",
  email: "arsalaan.bdc@gmail.com",
  linkedin: "https://www.linkedin.com/in/arsalaan-pm/",
  youtube: "https://www.youtube.com/@ArsalaanMd25",
  github: "https://github.com/bdc-001",
  resume: "/Mohammed_Resume_2026.pdf",
};
