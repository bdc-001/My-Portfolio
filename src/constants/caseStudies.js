import { FiLayers, FiSearch, FiHash, FiTrendingUp } from "react-icons/fi";

// ─── Case Studies Data ────────────────────────────────────────────────────────
// To add a file: drop your PDF in /public/case-studies/ and set file: "/case-studies/filename.pdf"
// Leave file: null to show "Coming Soon" badge.
// frameworkFile: PDF of the solving framework for the category card download CTA.

export const CASE_STUDY_CATEGORIES = [
  {
    id: "product-design",
    label: "Product Design",
    slug: "product-design",
    icon: FiLayers,
    tagline: "From problem space to pixel",
    description:
      "End-to-end product thinking covering user research, wireframes, prototypes and PRDs. Each case documents how I move from ambiguous problems to shipped features.",
    color: "purple",
    gradient: "from-purple-500 to-violet-600",
    lightBg: "bg-purple-50",
    border: "border-purple-100",
    countLabel: (n) => `${n} case${n !== 1 ? "s" : ""}`,
    frameworkFile: "/case-studies/product-design-framework.pdf", // e.g. "/case-studies/product-design-framework.pdf"
  },
  {
    id: "root-cause-analysis",
    label: "Root Cause Analysis",
    slug: "root-cause-analysis",
    icon: FiSearch,
    tagline: "Why did it break and what next?",
    description:
      "Structured problem breakdowns using 5-Whys, fishbone and MECE frameworks. These are real product incidents dissected with data and first principles.",
    color: "blue",
    gradient: "from-blue-500 to-sky-600",
    lightBg: "bg-blue-50",
    border: "border-blue-100",
    countLabel: (n) => `${n} case${n !== 1 ? "s" : ""}`,
    frameworkFile: "/case-studies/root-cause-analysis-framework.pdf", // e.g. "/case-studies/rca-framework.pdf"
  },
  {
    id: "guesstimate",
    label: "Guesstimate",
    slug: "guesstimate",
    icon: FiHash,
    tagline: "Numbers from thin air, with rigour",
    description:
      "Fermi estimation and market-sizing walkthroughs with annotated workings. Every question is answered with explicit assumptions and sanity checks.",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50",
    border: "border-emerald-100",
    countLabel: (n) => `${n} question${n !== 1 ? "s" : ""}`,
    frameworkFile: "/case-studies/guesstimate-framework.pdf", // e.g. "/case-studies/guesstimate-framework.pdf"
  },
  {
    id: "business-analysis",
    label: "Business Analysis",
    slug: "business-analysis",
    icon: FiTrendingUp,
    tagline: "Translating business needs to technical reality",
    description:
      "Process mapping, requirements gathering, and strategic alignment. Documenting the bridge between business goals and engineering output.",
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50",
    border: "border-amber-100",
    countLabel: (n) => `${n} case${n !== 1 ? "s" : ""}`,
    frameworkFile: "/case-studies/business-analysis-framework.pdf",
  },
];

// Colour tokens used by both the landing card and the detail page
export const CAT_COLORS = {
  purple: {
    badge:     "bg-purple-50 text-purple-700 border-purple-100",
    tag:       "bg-purple-50 text-purple-600 border-purple-100",
    tagActive: "bg-purple-600 text-white border-purple-600",
    btn:       "bg-purple-600 hover:bg-purple-700 text-white",
    outline:   "border-purple-200 text-purple-700 hover:bg-purple-50",
    dot:       "bg-purple-400",
    heading:   "text-purple-600",
    ring:      "ring-purple-200",
    glow:      "hover:shadow-purple-100",
    select:    "focus:ring-purple-400 focus:border-purple-400",
  },
  blue: {
    badge:     "bg-blue-50 text-blue-700 border-blue-100",
    tag:       "bg-blue-50 text-blue-600 border-blue-100",
    tagActive: "bg-blue-600 text-white border-blue-600",
    btn:       "bg-blue-600 hover:bg-blue-700 text-white",
    outline:   "border-blue-200 text-blue-700 hover:bg-blue-50",
    dot:       "bg-blue-400",
    heading:   "text-blue-600",
    ring:      "ring-blue-200",
    glow:      "hover:shadow-blue-100",
    select:    "focus:ring-blue-400 focus:border-blue-400",
  },
  emerald: {
    badge:     "bg-emerald-50 text-emerald-700 border-emerald-100",
    tag:       "bg-emerald-50 text-emerald-600 border-emerald-100",
    tagActive: "bg-emerald-600 text-white border-emerald-600",
    btn:       "bg-emerald-600 hover:bg-emerald-700 text-white",
    outline:   "border-emerald-200 text-emerald-700 hover:bg-emerald-50",
    dot:       "bg-emerald-400",
    heading:   "text-emerald-600",
    ring:      "ring-emerald-200",
    glow:      "hover:shadow-emerald-100",
    select:    "focus:ring-emerald-400 focus:border-emerald-400",
  },
  amber: {
    badge:     "bg-amber-50 text-amber-700 border-amber-100",
    tag:       "bg-amber-50 text-amber-600 border-amber-100",
    tagActive: "bg-amber-600 text-white border-amber-600",
    btn:       "bg-amber-600 hover:bg-amber-700 text-white",
    outline:   "border-amber-200 text-amber-700 hover:bg-amber-50",
    dot:       "bg-amber-400",
    heading:   "text-amber-600",
    ring:      "ring-amber-200",
    glow:      "hover:shadow-amber-100",
    select:    "focus:ring-amber-400 focus:border-amber-400",
  },
};

// QUESTIONS / CASE STUDIES
// Each entry belongs to a category and has rich tags for filtering.
export const CASE_STUDIES = [

  // PRODUCT DESIGN
  {
    id: "pd-005",
    category: "product-design",
    title: "AI Health Coach for Chronic Illness",
    question: "Design an AI-powered personal health coach for someone with chronic illness.",
    snapshot:
      "Designed an 'Ambient Health Orchestrator' to shift disease management from reactive to proactive. Solved interaction friction and data silos through passive biometric/environmental aggregation and a single-button natural language interface.",
    approach: ["Persona Definition", "Problem Prioritization", "Passive Data Aggregation", "Predictive Modeling", "Metric Definition"],
    tags: ["HealthTech", "AI Agent", "0 to 1", "Wearables", "UX Research"],
    difficulty: "Advanced",
    company: "Practice",
    date: "2025-05",
    file: "/case-studies/pd-005.pdf",
    detailedSolution: `
<h3>Why are we solving? - Goal & Objective</h3>
<p><strong>Goal:</strong> Empower patients with chronic illnesses to regain control over their daily lives by reducing the cognitive, emotional, and physical burden of managing their condition.</p>
<p><strong>Objective:</strong> Build a privacy-first, AI-driven mobile application that shifts disease management from reactive symptom tracking to proactive flare-up prevention, ultimately improving the patient's day-to-day quality of life.</p>
<h3>By When?</h3>
<ul>
  <li><strong>Phase 1 (MVP - 6 Months):</strong> Launch core ambient voice journaling, local device processing (for privacy), and basic wearable integration (Apple Health/Google Fit) for passive data collection.</li>
  <li><strong>Phase 2 (V1 - 12 Months):</strong> Roll out the predictive AI model for flare-up forecasting and environmental API integrations (weather, air quality).</li>
  <li><strong>Phase 3 (Future - 18-24 Months):</strong> Develop generative clinical summary reports for doctors and pursue necessary regulatory compliance (e.g., FDA software-as-a-medical-device guidelines) for deeper health recommendations.</li>
</ul>
<h3>For whom? (3 Personas)</h3>
<ul>
  <li><strong>The Overwhelmed Newbie (The "Spiraling" Persona):</strong> Just diagnosed. They are terrified, googling everything, and trying to track 50 variables at once. They need direction.</li>
  <li><strong>The Fatigue-Hit Veteran (The "Burnout" Persona):</strong> Has had the condition for 10 years. They’ve stopped tracking because it’s depressing. They need invisibility.</li>
  <li><strong>The High-Performer (The "Optimizer" Persona):</strong> Wants to work a 60-hour week despite their condition. They want to know exactly how close they are to the "red line." They need data.</li>
</ul>
<h3>Problems</h3>
<ul>
  <li><strong>High Interaction Friction (The "Cost of Tracking"):</strong> Current solutions require active input at the exact moments when the user has the lowest physical or mental energy. This creates a paradox: the product is hardest to use when the user needs it most.</li>
  <li><strong>Disconnected Data Silos (The "Synthesis Gap"):</strong> Vital signals biometric, environmental, and behavioral are captured in isolation. There is no unified layer to correlate these disparate data points, leaving the user to manually connect the dots.</li>
  <li><strong>Lack of Predictive Visibility (The "Reactive Trap"):</strong> Most tools are digital rearview mirrors, they tell you what happened, not what will happen. This leaves users in a permanent state of "reactive management."</li>
  <li><strong>Emotional & Cognitive Tax (The "Reminder Burden"):</strong> Constant notifications serve as a persistent psychological reminder of the disease, leading to medical burnout.</li>
</ul>
<h3>Prioritization: What comes first?</h3>
<p>I’m prioritizing The Synthesis Gap and Interaction Friction. Why? Because predictive visibility is impossible without clean, multi-layered data. If we don’t make it easy to get data in (Friction) and merge it (Silos), the AI’s advice will be "garbage in, garbage out."</p>
<p><strong>The Trade-off:</strong> I’m de-prioritizing social features or "gamification." People with chronic illness don't want a "streak"; they want their life back.</p>
<h3>The Solution: The "Ambient Health Orchestrator"</h3>
<p>The solution is a cross-platform AI agent that lives on the user’s phone and is wearable, acting as a Translation Layer between their body and their environment.</p>
<h4>1. The Passive Data Aggregator (Solving Silos)</h4>
<p>The AI doesn't ask the user for data. It pulls via API from:</p>
<ul>
  <li><strong>Biometrics:</strong> Continuous HRV, SpO2, and Sleep Stages (via Wearable).</li>
  <li><strong>Environment:</strong> Local barometric pressure, pollen counts, and temperature (via Weather API).</li>
  <li><strong>Behavior:</strong> Step counts, calendar intensity, and location (to track "rest time" vs. "active time").</li>
</ul>
<h4>2. The Natural Language Interface (Solving Friction)</h4>
<p>Instead of a UI with 20 buttons, the app is a single "Listen" button.<br/><strong>Scenario:</strong> If the user feels a flare-up, they just tap and say, "My knees are a 7 today." The AI's Job: It tags that "7" and instantly looks back at the last 48 hours of passive data to find the correlation. It’s an asynchronous journal.</p>
<h4>3. Proactive "Pre-Hab" Insights (The Proactive Shift)</h4>
<p>The system uses Predictive Modeling to identify "Pre-flare" signatures.<br/><strong>The Output:</strong> A push notification that is actionable and low-stress.<br/><em>"Hi [Name], we've noticed your resting heart rate is up and the weather is shifting. Based on your history, today is a high-risk day. We’ve drafted a 'Low Energy' version of your to-do list. Would you like to swap?"</em></p>
<h3>Metrics to Track Performance</h3>
<ul>
  <li><strong>The Predictability Score (Accuracy):</strong> What percentage of user-reported flare-ups were predicted by the AI 12+ hours in advance? (Goal: Higher accuracy builds Trust).</li>
  <li><strong>The Management-to-Life Ratio (Efficiency):</strong> Total time the user spends interacting with the app vs. hours of "active life" recorded. (Goal: Ratio should decrease. Product should be invisible).</li>
  <li><strong>The Agency Delta (Qualitative):</strong> A monthly "Control" survey. "Do you feel you are managing your illness, or is it managing you?" (Goal: Shift toward user feeling they have the upper hand).</li>
  <li><strong>Privacy Trust Score:</strong> Percentage of users who keep "Full Synthesis" (data sharing) toggled on after 90 days. (Goal: Keep it high to validate privacy-first design).</li>
</ul>

<div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
  <h3 class="text-blue-800 m-0 mb-2">💡 Pro Tips for Product Design Interviews</h3>
  <ul class="text-blue-900 m-0 pl-4">
    <li><strong>Challenge the Premise:</strong> Always validate if the problem actually needs solving before jumping into features.</li>
    <li><strong>Focus on Friction:</strong> The best products don't just add capabilities; they remove barriers.</li>
    <li><strong>Metrics Matter:</strong> Tie your design decisions back to measurable business or user outcomes.</li>
  </ul>
</div>
    `
  },

  // ROOT CAUSE ANALYSIS
  {
    id: "rca-001",
    category: "root-cause-analysis",
    title: "DAU Dropped 23% in Q3",
    question: "Our daily active users dropped 23% week-over-week after an OS update. Why?",
    snapshot:
      "Segmented users by OS version. Android 13 users showed 0 retention at day 4. Drilled into push notification delivery logs and found the permission prompt was silently suppressed post-update due to a broken notification-channel registration.",
    approach: ["5-Whys", "Cohort Segmentation", "Log Analysis", "OS-level Debugging"],
    tags: ["Retention", "Android", "Notifications", "5-Whys", "Cohort Analysis"],
    difficulty: "Intermediate",
    company: "Convin",
    date: "2024-09",
    file: "/case-studies/rca-001.pdf",
  },
  {
    id: "rca-002",
    category: "root-cause-analysis",
    title: "3x Spike in Support Tickets Post Launch",
    question: "Support volume tripled within 48 hours of a major feature release. What broke?",
    snapshot:
      "Fishbone analysis flagged API, UI, and docs as branches. MECE breakdown of ticket themes showed 68% were about data not syncing. Traced to an undocumented breaking change in a third-party API endpoint hitting mid-market accounts only.",
    approach: ["Fishbone Diagram", "MECE", "Ticket Taxonomy", "API Audit"],
    tags: ["Support", "API", "Fishbone", "MECE", "Launch"],
    difficulty: "Advanced",
    company: "Aspire",
    date: "2024-03",
    file: "/case-studies/rca-002.pdf",
  },
  {
    id: "rca-003",
    category: "root-cause-analysis",
    title: "Revenue Attribution Discrepancy",
    question: "Why is the revenue attribution engine reporting a 40% discrepancy vs CRM data?",
    snapshot:
      "Built a data lineage map. Found two event streams using different timestamps (event-time vs ingestion-time). Double-counting occurred in multi-touch attribution for cross-device journeys. Fixed via a de-duplication layer and unified timestamp schema.",
    approach: ["Data Lineage Mapping", "5-Whys", "Schema Audit", "Cross-team Alignment"],
    tags: ["Analytics", "Revenue", "Data Quality", "Attribution", "5-Whys"],
    difficulty: "Advanced",
    company: "Black Diamond",
    date: "2024-06",
    file: "/case-studies/rca-003.pdf",
  },
  {
    id: "rca-004",
    category: "root-cause-analysis",
    title: "NPS Fell from 52 to 31 in One Quarter",
    question: "What caused a 21-point NPS drop among enterprise customers?",
    snapshot:
      "Segmented NPS by cohort, plan tier, and CSM assignment. Enterprise accounts on a specific plan had an 80% detractor rate. Traced to a UI change that removed a bulk-action feature enterprise users relied on daily.",
    approach: ["NPS Segmentation", "Cohort Analysis", "Customer Interviews", "Feature Audit"],
    tags: ["NPS", "Enterprise", "Retention", "Customer Feedback", "Cohort Analysis"],
    difficulty: "Intermediate",
    company: "Convin",
    date: "2025-02",
    file: "/case-studies/rca-004.pdf",
  },

  // GUESSTIMATES
  {
    id: "ge-001",
    category: "guesstimate",
    title: "Instagram Daily Active Users in India",
    question: "How many people in India use Instagram daily?",
    snapshot:
      "Estimated ~150-160M DAU using a population funnel (1.45B -> 255M accessible) and a 65% DAU/MAU ratio. Sanity checked against WhatsApp (500M) and YouTube (250M).",
    approach: ["Population Funnel", "DAU/MAU Ratio", "Sanity Checks"],
    tags: ["Social Media", "DAU", "Market Sizing", "India"],
    difficulty: "Intermediate",
    company: "Practice",
    date: "2025-05",
    file: "/case-studies/ge-001.pdf",
    detailedSolution: `
<h3>Step 1: Population Funnel</h3>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left border-collapse min-w-[600px]">
    <thead>
      <tr class="bg-neutral-100">
        <th class="p-3 border-b font-bold text-neutral-800">Layer</th>
        <th class="p-3 border-b font-bold text-neutral-800">Logic</th>
        <th class="p-3 border-b font-bold text-neutral-800">Number</th>
      </tr>
    </thead>
    <tbody class="text-neutral-700">
      <tr>
        <td class="p-3 border-b">India Population</td>
        <td class="p-3 border-b">Known</td>
        <td class="p-3 border-b font-semibold">~1.45B</td>
      </tr>
      <tr>
        <td class="p-3 border-b">Internet Users</td>
        <td class="p-3 border-b">~55% penetration</td>
        <td class="p-3 border-b font-semibold">~800M</td>
      </tr>
      <tr>
        <td class="p-3 border-b">Smartphone Users</td>
        <td class="p-3 border-b">~85% of internet users</td>
        <td class="p-3 border-b font-semibold">~680M</td>
      </tr>
      <tr>
        <td class="p-3 border-b">Social Media Users</td>
        <td class="p-3 border-b">~75% of smartphone users</td>
        <td class="p-3 border-b font-semibold">~510M</td>
      </tr>
      <tr>
        <td class="p-3 border-b">Instagram Accessible Users</td>
        <td class="p-3 border-b">Instagram skews urban, 18-35 (~50% of social media)</td>
        <td class="p-3 border-b font-semibold text-emerald-600">~255M</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>Step 2: DAU/MAU Ratio</h3>
<p>Instagram globally runs ~60-65% DAU/MAU. India is a high-engagement, mobile-first market. People doom-scroll Reels hard. So I'll use 65%.</p>
<ul>
  <li>Instagram India MAU ≈ ~230-250M (reasonable estimate for a market this size)</li>
  <li><strong>DAU = 250M × 65% ≈ 160M</strong></li>
</ul>

<h3>Step 3: Sanity Checks</h3>
<ul>
  <li>WhatsApp India DAU ~500M → Instagram at ~30% of that makes sense (more niche, skews younger/urban)</li>
  <li>YouTube India DAU ~250M → Instagram slightly below, reasonable since YouTube is more mass-market</li>
  <li>Meta has disclosed India as their #1 or #2 market by users globally, 160M DAU tracks</li>
</ul>

<div class="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
  <h3 class="text-emerald-800 m-0 mb-2">Final Answer</h3>
  <p class="text-2xl font-bold text-emerald-900 m-0">~150-160 Million Daily Active Users</p>
</div>

<div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
  <h3 class="text-blue-800 m-0 mb-2">💡 Pro Tips for Guesstimates</h3>
  <ul class="text-blue-900 m-0 pl-4">
    <li><strong>Sanity Check:</strong> Always compare your final number against a known benchmark (like WhatsApp or YouTube users).</li>
    <li><strong>State Assumptions Clearly:</strong> Interviewers care more about your logic and structure than the exact final number.</li>
    <li><strong>Segmentation is Key:</strong> Break down populations into logical buckets (e.g., power users vs. occasional users) to show depth of thought.</li>
  </ul>
</div>
    `
  },
  {
    id: "ge-002",
    category: "guesstimate",
    title: "Daily Swiggy/Zomato Orders in India",
    question: "Estimate the daily number of Swiggy or Zomato orders in India.",
    snapshot:
      "Estimated ~20-22M total daily orders. Calculated base orders (~16M) via urban smartphone user funnel and order frequency segmentation. Adjusted for Quick Commerce (+4-5M) and split market share.",
    approach: ["Addressable Funnel", "Frequency Segmentation", "Quick Commerce Adjustment", "Market Share Split"],
    tags: ["Food Delivery", "Market Sizing", "India", "Quick Commerce"],
    difficulty: "Advanced",
    company: "Practice",
    date: "2025-05",
    file: "/case-studies/ge-002.pdf",
    detailedSolution: `
<h3>Step 1: Addressable User Funnel</h3>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left border-collapse min-w-[600px]">
    <thead>
      <tr class="bg-neutral-100">
        <th class="p-3 border-b font-bold text-neutral-800">Layer</th>
        <th class="p-3 border-b font-bold text-neutral-800">Logic</th>
        <th class="p-3 border-b font-bold text-neutral-800">Number</th>
      </tr>
    </thead>
    <tbody class="text-neutral-700">
      <tr><td class="p-3 border-b">India Population</td><td class="p-3 border-b">Known</td><td class="p-3 border-b">~1.45B</td></tr>
      <tr><td class="p-3 border-b">Urban Population</td><td class="p-3 border-b">~35% live in cities</td><td class="p-3 border-b">~500M</td></tr>
      <tr><td class="p-3 border-b">Smartphone + Internet Users (Urban)</td><td class="p-3 border-b">~80% of urban</td><td class="p-3 border-b">~400M</td></tr>
      <tr><td class="p-3 border-b">Food Delivery App Installed</td><td class="p-3 border-b">~40% of those, not everyone orders online</td><td class="p-3 border-b">~160M</td></tr>
      <tr><td class="p-3 border-b">Monthly Active Orderers</td><td class="p-3 border-b">~50% actually order in a given month</td><td class="p-3 border-b font-semibold text-emerald-600">~80M</td></tr>
    </tbody>
  </table>
</div>

<h3>Step 2: Order Frequency Segmentation</h3>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left border-collapse min-w-[600px]">
    <thead>
      <tr class="bg-neutral-100">
        <th class="p-3 border-b font-bold text-neutral-800">Segment</th>
        <th class="p-3 border-b font-bold text-neutral-800">% of MAU / Users</th>
        <th class="p-3 border-b font-bold text-neutral-800">Orders/Month</th>
        <th class="p-3 border-b font-bold text-neutral-800">Monthly Orders</th>
      </tr>
    </thead>
    <tbody class="text-neutral-700">
      <tr><td class="p-3 border-b">Power Users (bachelors, urban professionals)</td><td class="p-3 border-b">15% | 12M</td><td class="p-3 border-b">12</td><td class="p-3 border-b">144M</td></tr>
      <tr><td class="p-3 border-b">Regular Users (2-3x/week)</td><td class="p-3 border-b">25% | 20M</td><td class="p-3 border-b">10</td><td class="p-3 border-b">200M</td></tr>
      <tr><td class="p-3 border-b">Occasional Users (weekends)</td><td class="p-3 border-b">60% | 48M</td><td class="p-3 border-b">3</td><td class="p-3 border-b">144M</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Total Monthly Orders ≈ ~488M | Daily Orders = 488M ÷ 30 ≈ ~16M/day</strong></p>

<h3>Step 3: Adjust for Quick Commerce Food Players</h3>
<p>My funnel above only captures Swiggy/Zomato-type behaviour, planned meal ordering. It misses impulse 10-min orders which have a different user psychology and incrementally add to the market.</p>
<ul>
  <li>Zepto Café + Bistro + Swish = ~4-5M/day incremental</li>
  <li><strong>Adjusted Total Market: ~20-22M orders/day</strong></li>
</ul>

<h3>Step 4: Market Share Split</h3>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left border-collapse min-w-[600px]">
    <thead>
      <tr class="bg-neutral-100">
        <th class="p-3 border-b font-bold text-neutral-800">Player</th>
        <th class="p-3 border-b font-bold text-neutral-800">Market Share</th>
        <th class="p-3 border-b font-bold text-neutral-800">Daily Orders</th>
      </tr>
    </thead>
    <tbody class="text-neutral-700">
      <tr><td class="p-3 border-b">Zomato</td><td class="p-3 border-b">~38%</td><td class="p-3 border-b font-semibold">~8-9M</td></tr>
      <tr><td class="p-3 border-b">Swiggy</td><td class="p-3 border-b">~30%</td><td class="p-3 border-b font-semibold">~6-7M</td></tr>
      <tr><td class="p-3 border-b">Zepto Café</td><td class="p-3 border-b">~10%</td><td class="p-3 border-b">~2M</td></tr>
      <tr><td class="p-3 border-b">Bistro (Zomato)</td><td class="p-3 border-b">~7%</td><td class="p-3 border-b">~1.5M</td></tr>
      <tr><td class="p-3 border-b">Swish</td><td class="p-3 border-b">~5%</td><td class="p-3 border-b">~1M</td></tr>
      <tr><td class="p-3 border-b">Others</td><td class="p-3 border-b">~10%</td><td class="p-3 border-b">~2M</td></tr>
    </tbody>
  </table>
</div>

<div class="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
  <h3 class="text-emerald-800 m-0 mb-2">Final Answer</h3>
  <p class="text-xl font-bold text-emerald-900 m-0">Total market: ~20-22M orders/day</p>
  <p class="text-emerald-800 mt-2 m-0 font-medium">Zomato: ~8-9M | Swiggy: ~6-7M | Quick commerce food: ~4-5M | Rest: ~2M</p>
</div>

<div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
  <h3 class="text-blue-800 m-0 mb-2">💡 Pro Tips for Guesstimates</h3>
  <ul class="text-blue-900 m-0 pl-4">
    <li><strong>Sanity Check:</strong> Always compare your final number against a known benchmark (like WhatsApp or YouTube users).</li>
    <li><strong>State Assumptions Clearly:</strong> Interviewers care more about your logic and structure than the exact final number.</li>
    <li><strong>Segmentation is Key:</strong> Break down populations into logical buckets (e.g., power users vs. occasional users) to show depth of thought.</li>
  </ul>
</div>
    `
  },

  // BUSINESS ANALYSIS
  {
    id: "ba-001",
    category: "business-analysis",
    title: "How did boAt beat JBL and Sony?",
    question: "Analyze how a new Indian brand won against global giants like JBL and Sony.",
    snapshot:
      "When boAt started, big companies like Sony and JBL owned the market. boAt didn't try to build better speakers. Instead, they changed how people thought about headphones. They stopped selling electronics and started selling fashion. This story shows how to win in a crowded market by changing the rules of the game.",
    approach: ["Changing the Product Goal", "Smart Pricing", "Building a Fanbase", "Fast Updates"],
    tags: ["Strategy", "Headphones", "Winning Plan", "India"],
    difficulty: "Advanced",
    company: "Practice",
    date: "2025-05",
    image: "/case-studies/aman-gupta.jpg",
    detailedSolution: `
<h3>How boAt Won by Changing the Rules</h3>
<p>When boAt started in 2016, the market for headphones was very crowded. This is what we call a <span class="term-tooltip" title="A market where many similar products are sold, making it hard for one brand to stand out.">Commoditized Market<span class="term-icon">i</span></span>. On one side, you had expensive brands like Sony and JBL. On the other side, you had very cheap, low-quality headphones. Most people thought there was no space for a new brand.</p>

<p>But boAt did something counterintuitive. They stopped trying to out-build Sony. Instead, they decided that headphones should be fashion accessories, not just tools for music. They focused on how the product looked and how it made people feel.</p>

<h3>What You Will Learn</h3>
<p>This analysis shows how a new entrepreneur can win against giant companies by reframing what the product is. You will learn how to build a brand that people truly love, even if you don't have the biggest budget.</p>

<h3>1. Changing the Category: From Tools to Fashion</h3>
<p>Most headphone companies talk about bass and frequency. boAt talked about style. They designed their products to look like jewelry or clothing. They used bright colors and trendy designs. By doing this, they moved out of the electronics category and into the fashion category. This is called <span class="term-tooltip" title="Changing how customers think about a product to avoid direct competition with giants.">Category Reframing<span class="term-icon">i</span></span>.</p>

<h3>2. The Power of the boAthead Community</h3>
<p>Instead of just buying ads, boAt built a tribe. They called their fans boAtheads. They used young influencers and cricketers to make the brand feel cool and local. This created an <span class="term-tooltip" title="A deep emotional connection with customers that makes it hard for them to switch to another brand.">Emotional Moat<span class="term-icon">i</span></span>. Even if Sony made a slightly better speaker, people stayed with boAt because they felt like they belonged to a community.</p>

<h3>3. Treating Hardware Like Software</h3>
<p>In the past, hardware companies took years to launch a new product. boAt acted like a software company. They launched new designs every few months based on what customers said. They used <span class="term-tooltip" title="Quickly using customer comments to fix products or launch new ones.">Feedback Loops<span class="term-icon">i</span></span> to stay ahead of the slow-moving giants. They didn't wait for perfect <span class="term-tooltip" title="Research and Development: The process of creating new technology or improving existing ones.">R&D<span class="term-icon">i</span></span>; they launched fast and learned faster.</p>

<div class="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
  <h3 class="text-emerald-800 m-0 mb-2">The Big Lesson</h3>
  <p class="text-emerald-900 m-0 font-medium">You don't always need the best technology to win. Sometimes, you just need to understand your customer's feelings better than the giants do. boAt won because they understood that for young Indians, headphones are a part of their identity.</p>
</div>

<div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
  <h3 class="text-blue-800 m-0 mb-2">💡 Learning Experience for Entrepreneurs</h3>
  <p class="text-blue-900 mb-4 text-sm">For a new entrepreneur, the boAt story offers three powerful lessons:</p>
  <ul class="text-blue-900 m-0 pl-4 space-y-2">
    <li><strong>Don't Compete on Specs:</strong> If you are small, you can't win a feature war with a giant. Compete on things they can't easily copy, like your brand's personality.</li>
    <li><strong>Build a Tribe, Not a Customer List:</strong> Focus on making 1,000 people love you rather than 1,000,000 people just knowing you.</li>
    <li><strong>Speed is Your Only Advantage:</strong> Use your size to move faster. Launch quickly, listen to feedback, and update your product while the giants are still in meetings.</li>
  </ul>
</div>
    `
  },
  {
    id: "ba-002",
    category: "business-analysis",
    title: "How did OYO spread?",
    question: "Analyze the simple plan OYO used to grow quickly and fix broken hotels.",
    snapshot:
      "OYO didn't build its own hotels. Instead, they took existing small hotels and fixed them up. They made sure every room was clean and had basic things like Wi-Fi. This helped people trust them. This story shows how they grew from a small website to a huge brand by making things simple and reliable.",
    approach: ["Fixing Basic Quality", "Fast Growth Plan", "Simple over Fancy", "Money Guarantee"],
    tags: ["Growth", "Hotels", "Simple Strategy", "India"],
    difficulty: "Advanced",
    company: "Practice",
    date: "2025-05",
    image: "/case-studies/ritesh-agarwal.jpg",
    detailedSolution: `
<h3>The Story of How OYO Fixed Broken Hotels</h3>
<p>In 2013, if you wanted a cheap hotel in India, you never knew what you would get. One hotel might have a clean bed but no water. Another might have water but no privacy. People were scared to book cheap rooms because they didn't trust the quality. This is what we call a <span class="term-tooltip" title="A market where many small players act on their own with no common standard.">Fragmented Market<span class="term-icon">i</span></span>.</p>

<p>Ritesh Agarwal saw that people didn't need fancy lobbies. They just wanted to know that the room would be clean and safe. He decided to fix this trust problem by making every hotel follow the same simple rules.</p>

<h3>What You Will Learn</h3>
<p>This story shows how a new entrepreneur can win by making a messy business simple. You will see how to grow fast by helping other business owners succeed alongside you.</p>

<h3>1. The Big Change: From Listing to Fixing</h3>
<p>At first, OYO was just a website that listed hotels. But Ritesh soon realized that just listing a bad hotel doesn't help anyone. He changed the plan. Instead of just listing them, OYO started fixing them. They created a simple list of 30 things every room must have, like white bedsheets, fast Wi-Fi, and clean bathrooms. By making every hotel look and feel the same, they turned a messy room into a trusted product.</p>

<h3>2. The Offer Owners Loved: The Minimum Guarantee</h3>
<p>How do you get thousands of hotel owners to join you quickly? OYO used a clever plan called the <span class="term-tooltip" title="A promise to pay a business a fixed amount of money every month, even if they don't sell anything.">Minimum Guarantee<span class="term-icon">i</span></span>. They told hotel owners, "We will pay you a fixed amount of money every month, no matter how many guests stay. In return, we get to run your rooms and set the prices."</p>
<p>This was a win for owners because they didn't have to worry about losing money. For OYO, it meant they could add thousands of rooms very fast. Once they had the rooms, they used <span class="term-tooltip" title="Changing prices based on how many people want the product at that time.">Dynamic Pricing<span class="term-icon">i</span></span> to make more money than they promised the owners.</p>

<h3>3. Consistency is the Secret Weapon</h3>
<p>While other companies tried to build fancy hotels, OYO focused on being predictable. For a traveler, knowing exactly what you will get is very valuable. They focused on the basics. This helped them keep costs low while scaling to many cities. In business, having a <span class="term-tooltip" title="A special advantage that makes it hard for competitors to copy or beat you.">Moat<span class="term-icon">i</span></span> often means just being the most reliable choice.</p>

<div class="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
  <h3 class="text-emerald-800 m-0 mb-2">The Big Lesson</h3>
  <p class="text-emerald-900 m-0 font-medium">OYO grew fast because they solved a trust problem. They didn't just sell rooms; they sold a promise that the room would be okay. For a new entrepreneur, your best product is often just a reliable solution to a common worry.</p>
</div>

<div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
  <h3 class="text-blue-800 m-0 mb-2">💡 Learning Experience for Entrepreneurs</h3>
  <p class="text-blue-900 mb-4 text-sm">This OYO story shows how to build a huge business by fixing a broken system. Here are three simple lessons:</p>
  <ul class="text-blue-900 m-0 pl-4 space-y-2">
    <li><strong>Fix the Basics:</strong> Don't try to be fancy. Just fix the three things your customers complain about most.</li>
    <li><strong>Help Your Partners Grow:</strong> If you take away the risk for your partners (like the hotel owners), they will help you grow much faster.</li>
    <li><strong>Own the Standard:</strong> If you can't trust others to do a good job, create a simple list of rules and make sure everyone follows them.</li>
  </ul>
    `
  },
  {
    id: "ba-003",
    category: "business-analysis",
    title: "How did Snitch grow so rapidly?",
    question: "Analyze how Snitch became a leader in men's fashion by doing the opposite of traditional brands.",
    snapshot:
      "Most fashion brands try to sell to everyone. Snitch focused only on men. Most brands launch few styles every season. Snitch launches new styles every single day. This story shows how they used speed and a narrow focus to win in a space that was already full of giants.",
    approach: ["Narrow Audience Focus", "Ultra-Fast Fashion", "Smart Social Media", "Quick Inventory"],
    tags: ["Fashion", "Speed", "Growth", "D2C"],
    difficulty: "Intermediate",
    company: "Practice",
    date: "2025-05",
    image: "/case-studies/siddharth-dungarwal.png",
    detailedSolution: `
<h3>The Story of Snitch: Speed as a Superpower</h3>
<p>The fashion world is one of the hardest businesses to enter. You have global giants like Zara and H&M, and local giants like Westside. Most people said that starting a new clothing brand was a bad idea. But Snitch grew from zero to a huge brand in just a few years. They did this by breaking two big rules of fashion.</p>

<p>First, they ignored women's fashion entirely. Second, they stopped thinking in "seasons." They realized that young Indian men wanted new styles every week, not every few months.</p>

<h3>What You Will Learn</h3>
<p>This story shows how a new entrepreneur can win by narrowing their focus and moving faster than anyone else. You will see how to turn speed into a business advantage.</p>

<h3>1. The Power of "Men Only"</h3>
<p>Most brands try to be "everything to everyone." But when you do that, you become average. Snitch focused only on men's fast fashion. By doing this, they understood their customers better than any general brand. They knew exactly what fit, what colors, and what styles young men wanted. This is what we call a <span class="term-tooltip" title="A small, specific part of a larger market that has its own unique needs.">Niche Market<span class="term-icon">i</span></span>.</p>

<h3>2. New Styles Every Single Day</h3>
<p>Traditional brands launch new clothes 4 times a year (Spring, Summer, etc.). Snitch launches dozens of new <span class="term-tooltip" title="Stock Keeping Unit: A unique code for every individual product or style.">SKUs<span class="term-icon">i</span></span> every single day. They act more like a news website than a clothing brand. This keeps their customers coming back to their app daily just to see "what's new."</p>
<p>Because they launch so many styles in small amounts, they don't get stuck with a lot of old clothes that nobody wants. This is called high <span class="term-tooltip" title="How quickly a company sells its products and replaces them with new ones.">Inventory Turnover<span class="term-icon">i</span></span>, and it is the secret to making money in fashion.</p>

<h3>3. Selling Directly to the Fan</h3>
<p>Instead of selling in big malls first, Snitch sold directly through their own website and app. This is the <span class="term-tooltip" title="Direct to Consumer: Selling products directly to customers without using middle-men like big department stores.">D2C Model<span class="term-icon">i</span></span>. It allowed them to keep all the profit and, more importantly, all the data. They knew exactly who was buying and what they liked. This helped them spend their marketing money much more wisely.</p>

<h3>4. Instagram as a Shop Floor</h3>
<p>Snitch didn't spend millions on TV ads. They used Instagram to show off their new styles every day. They made the brand feel fast, young, and alive. For a new entrepreneur, this is a masterclass in using free or low-cost tools to build a massive brand presence.</p>

<div class="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
  <h3 class="text-emerald-800 m-0 mb-2">The Big Lesson</h3>
  <p class="text-emerald-900 m-0 font-medium">Snitch proved that you don't need to be the biggest to win. You just need to be the fastest and the most focused. By solving a specific problem for a specific group of people, you can beat giants who are too slow to change.</p>
</div>

<div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
  <h3 class="text-blue-800 m-0 mb-2">💡 Learning Experience for Entrepreneurs</h3>
  <p class="text-blue-900 mb-4 text-sm">For anyone starting a business, the Snitch story offers three key takeaways:</p>
  <ul class="text-blue-900 m-0 pl-4 space-y-2">
    <li><strong>Narrow Your Focus:</strong> It is better to be the #1 choice for a small group than the #10 choice for everyone.</li>
    <li><strong>Speed is a Moat:</strong> If you can launch 10 times faster than your competitor, you will learn 10 times faster than them.</li>
    <li><strong>Own Your Data:</strong> By selling directly to your users, you learn what they want much faster than if you sell through a middle-man.</li>
  </ul>
</div>
    `
  },
];
