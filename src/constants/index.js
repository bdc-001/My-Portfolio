import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.png";
import agenticSop from "../assets/projects/agentic-sop.png";
import convinImage from "../assets/projects/convin.jpg";
import aspireImage from "../assets/projects/aspire.jpg";
import revenueImage from "../assets/projects/revenue-attribution.png";
import wellnessPlatform from "../assets/projects/wellness-platform.png";
import voiceInterface from "../assets/projects/voice-interface.png";
import n8nLogo from "../assets/tech/n8n.png";
import cursorLogo from "../assets/tech/cursor.png";
import antigravityLogo from "../assets/tech/antigravity.png";

export const HERO_HEADLINE = "Strategic Product Manager | 0 → 1 Specialist";
export const HERO_SUBHEADLINE = "Driving Innovation & Business Impact";
export const HERO_CONTENT = `Engineer turned Product Manager with a track record of shipping AI products and driving measurable revenue. I combine technical depth with strategic vision to solve ambiguous zero to one problems. Whether reviewing GPU clusters, writing data pipeline specs, or leading enterprise deployments, my focus is always on orchestrating engineering reality with business impact.`;

export const ABOUT_TEXT = `I operate at the intersection of business strategy and engineering execution. I don't just manage backlogs; I orchestrate product value.

From scaling LLM infrastructure to co-founding a consulting firm that delivered 30+ projects for enterprise clients, my career is built on taking extreme ownership.

I believe in "shipping to learn" and that the best products emerge from rigorous empathy and rapid iteration. My technical foundation enables me to bridge the gap between complex systems and user-centric solutions seamlessly.`;

export const ABOUT_STATS = [
  { label: "Revenue Impact", value: "10% Cost Red." },
  { label: "Capital Raised", value: "$400k+" },
  { label: "Efficiency", value: "71% Vel. Boost" },
  { label: "Products", value: "20+ Shipped" },
];

export const TOOLKIT = {
  strategy: [
    { name: "Notion", icon: "RiNotionFill" },
    { name: "Jira", icon: "SiJira" },
    { name: "Miro", icon: "SiMiro" }
  ],
  design: [
    { name: "Figma", icon: "FaFigma" },
    { name: "Canva", icon: "SiCanva" }
  ],
  analytics: [
    { name: "Mixpanel", icon: "SiMixpanel" },
    { name: "Superset", icon: "SiApachesuperset" },
    { name: "Google Analytics", icon: "SiGoogleanalytics" }
  ],
  tech: [
    { name: "React", icon: "RiReactjsLine" },
    { name: "Node.js", icon: "FaNodeJs" },
    { name: "n8n", icon: n8nLogo, isImage: true },
    { name: "Cursor", icon: cursorLogo, isImage: true },
    { name: "Antigravity", icon: antigravityLogo, isImage: true }
  ]
};

export const EXPERIENCES = [
  {
    title: "Convin",
    subtitle: "Associate Product Manager | Sept 2023 - Present",
    image: convinImage,
    category: "B2B SaaS / AI",
    problem: "Need to optimize expensive LLM infrastructure, automate QA processes, and expand market reach.",
    solution: "Led migration to self-hosted H200 GPU clusters with fine-tuned models. Designed a no-code Rule Engine for automated QA and shipped an LLM-powered insight delivery system.",
    impact: [
      "65% Cost Red.",
      "$1.7M Renewals",
      "140k API calls/day"
    ],
    role: "Associate Product Manager",
    stack: ["LLM Infrastructure", "No-code", "AI Strategy"]
  },
  {
    title: "Aspire",
    subtitle: "Junior Product Manager | Jan 2023 - May 2023",
    image: aspireImage,
    category: "Fintech",
    problem: "Critical migration of high-value accounts and inefficient manual accounting workflows for SME clients.",
    solution: "Owned full Nium-SG to DBS-HK payment rail migration. Drove QuickBooks Online and Xero API integrations to automate bank feed syncing.",
    impact: [
      "<1.25% Error Rate",
      "+15% CSAT",
      "10% Op Cost Red."
    ],
    role: "Junior Product Manager",
    stack: ["Fintech Ops", "API Integration", "Migration"]
  }
];

export const PROJECTS = [
  {
    title: "Revenue Attribution Engine",
    subtitle: "AI-Weighted Marketing Model",
    image: revenueImage,
    category: "Analytics / AI",
    problem: "Inaccurate revenue tracking in CX centers due to fragmented CRM integrations and poor incentive allocation.",
    solution: "Built platform with AI-weighted attribution & MMM for ROI. Added fraud detection and cohort analysis.",
    impact: [
      "200+ API Endpoints",
      "300+ Records Tested",
      "ROI Opt."
    ],
    role: "Developer",
    stack: ["Go", "React", "PostgreSQL"]
  },
  {
    title: "Automated Market Research",
    subtitle: "OpenClaw Architecture",
    image: project3,
    category: "Data Pipeline",
    problem: "Manual evaluation of public companies is slow and prone to missing high-risk signals.",
    solution: "Built a daily ingestion and scoring pipeline evaluating Debt-to-Equity and FCF. Automated report delivery via webhooks to Slack/Telegram.",
    impact: [
      "Daily Pipeline",
      "Zero Manual Input",
      "Multi-channel Alerts"
    ],
    role: "Developer",
    stack: ["Python", "Webhooks", "Data Pipeline"]
  },
  {
    title: "OrganHub",
    subtitle: "Healthcare Coordination Platform",
    image: project2,
    category: "HealthTech",
    problem: "Fragmented organ donation ecosystem causing delays and coordination failures.",
    solution: "Designed a responsive web app enabling end-to-end coordination across donors, NGOs, and hospitals.",
    impact: [
      "15+ Screens",
      "End-to-End Flow",
      "Research UX"
    ],
    role: "Product Designer",
    stack: ["UX Research", "Web App", "Healthcare"]
  },
  {
    title: "Black Diamond Consulting",
    subtitle: "Co-Founder | IIT (ISM)",
    image: project1,
    category: "Consulting / VC",
    problem: "SMEs and startups struggling to scale tech projects and raise pre-seed funding.",
    solution: "Built a Venture Capital consulting firm from scratch. Validated by IIT (ISM)'s incubation centre.",
    impact: [
      "30+ Projects",
      "Top Tier Clients",
      "Tech & Fundraising"
    ],
    role: "Co-Founder",
    stack: ["Strategy", "Consulting", "Venture Capital"]
  }
];

export const CONTACT = {
  address: "Bangalore, Karnataka",
  phoneNo: "+91 6289253227",
  email: "arsalaan.bdc@gmail.com",
  linkedin: "https://linkedin.com/in/arsalaan-mohammed",
  github: "https://github.com/bdc-001"
};

export const BELIEFS = [
  {
    id: "01",
    title: "Clarity over noise",
    description: "Design should surface what matters and hide what doesn't."
  },
  {
    id: "02",
    title: "Strategy is part of the craft",
    description: "I don't wait for the \"why\" - I shape it with product and business."
  },
  {
    id: "03",
    title: "Simplify, don't dumb down",
    description: "Even complex tools can feel intuitive - with the right intent."
  },
  {
    id: "04",
    title: "Systems scale, context guides",
    description: "Reusable patterns are powerful - adapt with intent."
  }
];

export const TESTIMONIALS = [
  {
    text: "I had the pleasure of working with Arsalaan on a comprehensive secondary research project focusing on 10+ Japanese and Western automotive OEMs. His work was exceptionally well-organized and thorough, showcasing his strong problem-solving and logical thinking abilities.",
    author: "Anuj Singh",
    role: "Strategy at AccentureJapan",
    image: "https://randomuser.me/api/portraits/men/32.jpg" // Placeholder
  },
  {
    text: "Arsalaan demonstrated exceptional skill and dedication at Mailmodo. He analyzed low PageSpeed pages and focused on improving Core Web Vitals (INP & LCP), providing technical solutions that enhanced mobile scores. His contributions have been invaluable for the organization.",
    author: "Zeeshan Akhtar",
    role: "Ex-Head of Marketing at Mailmodo",
    image: "https://randomuser.me/api/portraits/men/46.jpg" // Placeholder
  }
];

export const FAQS = [
  {
    question: "You create content?",
    answer: "Yes! I'm active on LinkedIn where I share my learnings, market research, and product insights. I earned the 'Top Product Management Voice' badge for my contributions. It's my digital garden where I document my journey."
  },
  {
    question: "A Product Manager who sings?",
    answer: "Absolutely. I'm a vocalist and I play the guitar. Music is my meditation-it helps me find rhythm in chaos, which surprisingly translates well to managing product roadmaps."
  },
  {
    question: "Urdu Shayari in a tech portfolio?",
    answer: "Why not? Code is logic, Shayari is emotion. My favorite couplet by Allama Iqbal: 'Khudi ko kar buland itna ke har taqder se pehle, Khuda bande se khud pooche, bata teri raza kya hai?' (Elevate yourself so high that before every decree, God Himself asks you: What is your will?)"
  },
  {
    question: "Finance & Investing?",
    answer: "I love the numbers game. From analyzing stocks to understanding market trends, I believe in the power of compounding-whether it's wealth or knowledge."
  },
  {
    question: "What's 'Off the grid' for you?",
    answer: "Disconnecting to reconnect. Whether it's a jam session, writing a couplet, or deep-diving into a valuation report, these 'off-grid' moments fuel my on-grid performance."
  }
];
