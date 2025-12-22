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
export const HERO_CONTENT = `Product Manager by profession, storyteller by passion. I build products that solve real problems, create YouTube content that documents my journey, strum melodies on my guitar, craft Urdu poetry that speaks to the soul, and decode market trends with the same curiosity I bring to building 0→1 ventures. From IIT Dhanbad to Convin and Aspire, I'm here to blend strategy, creativity, and a hunger for impact.`;

export const ABOUT_TEXT = `I operate at the intersection of business goals and user needs. I don't just manage backlogs; I orchestrate product value.

From co-founding a consulting firm that raised $400k+ for clients to leading digital transformations at Convin and Aspire, my career is built on taking ownership.

I believe in "shipping to learn" and that the best products are born from rigorous empathy and relentless iteration. My technical background (IIT Dhanbad) allows me to bridge the gap between engineering and business seamlessly.`;

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
    subtitle: "Associate Product Manager | Oct 2024 - Present",
    image: convinImage, // User uploaded image
    category: "B2B SaaS / AI",
    problem: "Need to drive user adoption for automated QA and improve engineering efficiency.",
    solution: "Developed Rule Engine for custom SOP flows. Migrated AI features to fine-tuned Gemma models on H200 clusters. Shipped LLM-powered insight delivery system.",
    impact: [
      "$1.3M Revenue",
      "50% Cost Red.",
      "$1.7M Renewal"
    ],
    role: "Associate Product Manager",
    stack: ["AI Strategy", "Gemma 7B/27B", "H200 Clusters"]
  },
  {
    title: "Aspire",
    subtitle: "Junior Product Manager | Jan 2024",
    image: aspireImage, // User uploaded image
    category: "Fintech",
    problem: "Critical migration of high-value client accounts and inefficient manual accounting workflows.",
    solution: "Coordinated migration of 800+ clients from Nium-SG to DBS-HK. Integrated QuickBooks/Xero APIs to automate expense feeds.",
    impact: [
      "<1.25% Error Rate",
      "40% Time Saved",
      "10% Cost Red."
    ],
    role: "Junior Product Manager",
    stack: ["Fintech Ops", "API Integration", "Migration"]
  }
];

export const PROJECTS = [
  {
    title: "Revenue Attribution Engine",
    subtitle: "AI-Weighted Marketing Model",
    image: revenueImage, // User uploaded image
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
    title: "Corporate Wellbeing",
    subtitle: "Employee Health Platform",
    image: wellnessPlatform, // Correctly mapped to wellness platform image
    category: "HealthTech",
    problem: "Rising burnout and lack of personalized wellness insights in corporate settings.",
    solution: "Platform with personalized AI coaching, mood tracking, and burnout assessments. Integrated HR dashboards.",
    impact: [
      "AI Coaching",
      "Mood Tracking",
      "Community Challenges"
    ],
    role: "Developer",
    stack: ["FastAPI", "TypeScript", "Radix UI"]
  },
  {
    title: "OrganHub",
    subtitle: "Healthcare Coordination Platform",
    image: project2, // Correctly identified as OrganHub
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
    subtitle: "Student-led Venture Capital Firm",
    image: project1, // Logo
    category: "Venture Capital",
    problem: "SMEs and startups struggling to scale tech projects and raise pre-seed funding.",
    solution: "Co-founded a VC consulting firm. Onboarded projects with Accenture Japan, Marico, etc.",
    impact: [
      "$400k+ Raised",
      "$8.5k Revenue",
      "30+ Clients"
    ],
    role: "Co-Founder",
    stack: ["Strategy", "Fundraising", "Consulting"]
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
    answer: "Yes! My YouTube channel is my digital garden. I document my journey in tech, product building, and the lessons I learn along the way. It's raw, unfiltered, and real."
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
