const pptxgen = require("pptxgenjs");
const path = require("path");

const pptx = new pptxgen();

// Configure 16:9 widescreen
pptx.layout = "LAYOUT_169";
pptx.title = "LAUNCH AI - Enterprise Generative Visual Diffusion";
pptx.author = "Ramya Deepika Kudelli";
pptx.company = "LAUNCH AI";

// Color Palette
const BG_DARK = "0A0D15";
const CARD_BG = "121828";
const TEXT_WHITE = "F8FAFC";
const TEXT_MUTED = "94A3B8";
const ACCENT_PURPLE = "A855F7";
const ACCENT_BLUE = "38BDF8";
const ACCENT_EMERALD = "34D399";
const ACCENT_RED = "F87171";
const ACCENT_AMBER = "FBBF24";

function setSlideBg(slide) {
  slide.background = { color: BG_DARK };
}

// -------------------------------------------------------------
// SLIDE 1: Title Slide
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  // Category Tag
  slide.addText("FINAL ENGINEERING PROJECT DEFENSE • 2026", {
    x: 1.0, y: 1.2, w: 8.0, h: 0.4,
    fontSize: 12, bold: true, color: ACCENT_PURPLE, fontFace: "Calibri"
  });

  // Title
  slide.addText("LAUNCH AI", {
    x: 1.0, y: 1.8, w: 11.0, h: 1.2,
    fontSize: 52, bold: true, color: TEXT_WHITE, fontFace: "Calibri"
  });

  // Subtitle
  slide.addText("Enterprise Generative Visual Diffusion & Brand Governance for Telecoms", {
    x: 1.0, y: 3.1, w: 10.5, h: 0.8,
    fontSize: 22, color: ACCENT_BLUE, fontFace: "Calibri"
  });

  // Description
  slide.addText("An autonomous generative SaaS platform automating commercial visual synthesis, dynamic canvas stamping, and automated TRAI regulatory compliance for telecom giants (Reliance Jio, Bharti Airtel, Vi).", {
    x: 1.0, y: 4.0, w: 10.0, h: 1.0,
    fontSize: 14, color: TEXT_MUTED, fontFace: "Calibri"
  });

  // Author Info
  slide.addText("Lead Architect & Developer: Ramya Deepika Kudelli\nMaster Administrator • Full-Stack AI Engineer", {
    x: 1.0, y: 5.8, w: 7.0, h: 0.8,
    fontSize: 13, bold: true, color: TEXT_WHITE, fontFace: "Calibri"
  });

  // Tech Badges
  slide.addText("Next.js 14  |  FastAPI  |  Turbo Diffusion  |  SQLite  |  TRAI Compliance", {
    x: 6.5, y: 6.1, w: 6.0, h: 0.5,
    fontSize: 11, align: "right", color: ACCENT_PURPLE, fontFace: "Calibri"
  });
}

// -------------------------------------------------------------
// SLIDE 2: The Problem
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("INDUSTRY BOTTLENECKS", { x: 1.0, y: 0.8, w: 8.0, h: 0.3, fontSize: 11, bold: true, color: ACCENT_PURPLE });
  slide.addText("The Problem in Telecom Marketing", { x: 1.0, y: 1.2, w: 10.0, h: 0.6, fontSize: 32, bold: true, color: TEXT_WHITE });

  // 3 Problem Cards
  // Card 1
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 2.2, w: 3.4, h: 4.2, fill: { color: CARD_BG }, line: { color: ACCENT_RED, width: 1 } });
  slide.addText("⏱️ 3 to 7 Days Delay", { x: 1.2, y: 2.5, w: 3.0, h: 0.5, fontSize: 18, bold: true, color: ACCENT_RED });
  slide.addText("Creative agencies take days to conceptualize, draft, and revise marketing banners for new tariff launches (Diwali offers, IPL 5G data boosters).\n\n• High agency retainers\n• Missed marketing windows\n• Slow campaign turnaround", {
    x: 1.2, y: 3.2, w: 3.0, h: 2.8, fontSize: 13, color: TEXT_MUTED
  });

  // Card 2
  slide.addShape(pptx.ShapeType.rect, { x: 4.9, y: 2.2, w: 3.4, h: 4.2, fill: { color: CARD_BG }, line: { color: ACCENT_AMBER, width: 1 } });
  slide.addText("⚖️ Severe TRAI Fines", { x: 5.1, y: 2.5, w: 3.0, h: 0.5, fontSize: 18, bold: true, color: ACCENT_AMBER });
  slide.addText("Telecom Regulatory Authority of India (TRAI) enforces strict transparency.\n\n• Ads missing FUP caps face takedowns\n• Unclear GST pricing triggers fines\n• Manual legal review is prone to costly human errors", {
    x: 5.1, y: 3.2, w: 3.0, h: 2.8, fontSize: 13, color: TEXT_MUTED
  });

  // Card 3
  slide.addShape(pptx.ShapeType.rect, { x: 8.8, y: 2.2, w: 3.4, h: 4.2, fill: { color: CARD_BG }, line: { color: ACCENT_PURPLE, width: 1 } });
  slide.addText("💸 Costly AI Tools", { x: 9.0, y: 2.5, w: 3.0, h: 0.5, fontSize: 18, bold: true, color: ACCENT_PURPLE });
  slide.addText("Commercial visual AI platforms are not built for enterprise marketing.\n\n• Expensive per-image billing ($0.08/img)\n• Restrictive rate-limit throttling\n• Generic models lack telecom aspect ratio and regulatory governance", {
    x: 9.0, y: 3.2, w: 3.0, h: 2.8, fontSize: 13, color: TEXT_MUTED
  });
}

// -------------------------------------------------------------
// SLIDE 3: The Solution
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("VALUE PROPOSITION", { x: 1.0, y: 0.8, w: 8.0, h: 0.3, fontSize: 11, bold: true, color: ACCENT_EMERALD });
  slide.addText("Traditional Agency vs. LAUNCH AI", { x: 1.0, y: 1.2, w: 10.0, h: 0.6, fontSize: 32, bold: true, color: TEXT_WHITE });

  // Traditional Column
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 2.2, w: 5.3, h: 4.4, fill: { color: CARD_BG }, line: { color: ACCENT_RED, width: 1 } });
  slide.addText("Traditional Creative Agency", { x: 1.3, y: 2.5, w: 4.7, h: 0.5, fontSize: 18, bold: true, color: ACCENT_RED });
  slide.addText("✕ 3 to 7 Days Turnaround for banner concepts\n✕ Manual Legal Check prone to missing fine-print terms\n✕ Fragmented Brand Tokens across regional designers\n✕ Heavy Agency Retainers per campaign release\n✕ Disconnected Workflow between copywriters and designers", {
    x: 1.3, y: 3.2, w: 4.7, h: 3.0, fontSize: 14, color: TEXT_MUTED, lineSpacing: 26
  });

  // LAUNCH AI Column
  slide.addShape(pptx.ShapeType.rect, { x: 6.9, y: 2.2, w: 5.3, h: 4.4, fill: { color: CARD_BG }, line: { color: ACCENT_EMERALD, width: 2 } });
  slide.addText("LAUNCH AI SaaS Platform", { x: 7.2, y: 2.5, w: 4.7, h: 0.5, fontSize: 18, bold: true, color: ACCENT_EMERALD });
  slide.addText("✓ ~6.2 Seconds Synthesis via Latent Turbo Diffusion\n✓ Automated 6-Point TRAI Regulatory Compliance Audit\n✓ Locked Brand Tokens (Jio Blue #0A2885, Airtel #E40000)\n✓ 100% Free Architecture with zero per-image API costs\n✓ Unified Studio: Prompt -> AI Visual -> Canvas -> Export", {
    x: 7.2, y: 3.2, w: 4.7, h: 3.0, fontSize: 14, color: TEXT_WHITE, lineSpacing: 26
  });
}

// -------------------------------------------------------------
// SLIDE 4: Why LAUNCH AI vs Other AI Apps
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("MARKET DIFFERENTIATION", { x: 1.0, y: 0.8, w: 8.0, h: 0.3, fontSize: 11, bold: true, color: ACCENT_PURPLE });
  slide.addText("Why LAUNCH AI vs. General AI Apps?", { x: 1.0, y: 1.2, w: 10.0, h: 0.6, fontSize: 32, bold: true, color: TEXT_WHITE });

  // Comparison Table
  const tableData = [
    [
      { text: "Capability", options: { bold: true, fill: { color: "1E293B" }, color: TEXT_WHITE } },
      { text: "LAUNCH AI (Our SaaS)", options: { bold: true, fill: { color: "4C1D95" }, color: TEXT_WHITE } },
      { text: "Midjourney / DALL-E 3", options: { bold: true, fill: { color: "1E293B" }, color: TEXT_WHITE } },
      { text: "Canva Magic Studio", options: { bold: true, fill: { color: "1E293B" }, color: TEXT_WHITE } }
    ],
    [
      { text: "TRAI Regulatory Compliance Audit", options: { bold: true, color: TEXT_WHITE } },
      { text: "✓ Automated 6-Point Engine", options: { color: ACCENT_EMERALD, bold: true } },
      { text: "✕ None (Generic art only)", options: { color: ACCENT_RED } },
      { text: "✕ None (Manual templates)", options: { color: ACCENT_RED } }
    ],
    [
      { text: "Generation Cost & Limits", options: { bold: true, color: TEXT_WHITE } },
      { text: "✓ 100% Free & Unmetered", options: { color: ACCENT_EMERALD, bold: true } },
      { text: "✕ Paid ($30–$60/mo)", options: { color: ACCENT_AMBER } },
      { text: "✕ Paid Enterprise tier", options: { color: ACCENT_AMBER } }
    ],
    [
      { text: "Integrated Canvas Badge Stamping", options: { bold: true, color: TEXT_WHITE } },
      { text: "✓ Hardware HTML5 Canvas", options: { color: ACCENT_EMERALD, bold: true } },
      { text: "✕ None (Raw images only)", options: { color: ACCENT_RED } },
      { text: "✓ Manual Drag & Drop", options: { color: TEXT_MUTED } }
    ],
    [
      { text: "Telecom Channel Aspect Ratios", options: { bold: true, color: TEXT_WHITE } },
      { text: "✓ 1:1, 9:16, 16:9 Built-in", options: { color: ACCENT_EMERALD, bold: true } },
      { text: "✕ Manual parameters", options: { color: ACCENT_AMBER } },
      { text: "✓ Manual Resizing", options: { color: TEXT_MUTED } }
    ],
    [
      { text: "Role-Based Governance (RBAC)", options: { bold: true, color: TEXT_WHITE } },
      { text: "✓ Admin / Designer Roles", options: { color: ACCENT_EMERALD, bold: true } },
      { text: "✕ Single-user login", options: { color: ACCENT_RED } },
      { text: "✕ Basic team sharing", options: { color: ACCENT_AMBER } }
    ]
  ];

  slide.addTable(tableData, {
    x: 1.0, y: 2.2, w: 11.2, h: 4.2,
    fontSize: 12, fill: { color: CARD_BG }, color: TEXT_MUTED, border: { pt: 0.5, color: "334155" }
  });
}

// -------------------------------------------------------------
// SLIDE 5: System Architecture
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("ENGINEERING BLUEPRINT", { x: 1.0, y: 0.8, w: 8.0, h: 0.3, fontSize: 11, bold: true, color: ACCENT_PURPLE });
  slide.addText("Full-Stack System Architecture", { x: 1.0, y: 1.2, w: 10.0, h: 0.6, fontSize: 32, bold: true, color: TEXT_WHITE });

  // 4 Architecture Blocks
  const blocks = [
    { title: "Frontend Client", tech: "Next.js 14 App Router", desc: "React 18 SSR, Tailwind CSS dark tokens, responsive layouts, hardware-accelerated canvas staging.", color: ACCENT_PURPLE, x: 1.0 },
    { title: "API Gateway", tech: "FastAPI (Python 3.10)", desc: "Asynchronous endpoints (asyncio), Pydantic v2 data validation, JWT authentication middleware.", color: ACCENT_BLUE, x: 3.9 },
    { title: "Diffusion Engine", tech: "Latent Turbo Diffusion", desc: "Serverless diffusion pipeline, seed control, buffer verification, and anti-CORS local caching.", color: ACCENT_EMERALD, x: 6.8 },
    { title: "Relational Data", tech: "SQLite + SQLAlchemy", desc: "ACID transactions, campaign metadata, user credentials, brand design tokens, and audit logs.", color: ACCENT_AMBER, x: 9.7 }
  ];

  blocks.forEach(b => {
    slide.addShape(pptx.ShapeType.rect, { x: b.x, y: 2.2, w: 2.6, h: 4.4, fill: { color: CARD_BG }, line: { color: b.color, width: 1.5 } });
    slide.addText(b.title.toUpperCase(), { x: b.x + 0.2, y: 2.5, w: 2.2, h: 0.3, fontSize: 10, bold: true, color: b.color });
    slide.addText(b.tech, { x: b.x + 0.2, y: 2.9, w: 2.2, h: 0.7, fontSize: 16, bold: true, color: TEXT_WHITE });
    slide.addText(b.desc, { x: b.x + 0.2, y: 3.8, w: 2.2, h: 2.4, fontSize: 12, color: TEXT_MUTED });
  });
}

// -------------------------------------------------------------
// SLIDE 6: Four Core Modules
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("PLATFORM MODULES", { x: 1.0, y: 0.8, w: 8.0, h: 0.3, fontSize: 11, bold: true, color: ACCENT_PURPLE });
  slide.addText("Four Core Functional Modules", { x: 1.0, y: 1.2, w: 10.0, h: 0.6, fontSize: 32, bold: true, color: TEXT_WHITE });

  const modules = [
    { title: "1. AI Visual Diffusion Studio", desc: "Synthesizes brand-new commercial advertising visuals from prompts. Features 8 one-click presets (SpaceFiber, AR Glasses, Autonomous Car, Stadium, Train) with instant seed re-roll.", x: 1.0, y: 2.2 },
    { title: "2. Interactive Canvas Editor", desc: "Hardware-accelerated HTML5 Canvas. Mounts AI backgrounds, allowing marketers to stamp official brand logos (Jio/Airtel), tariff tags, and disclaimer footers with instant PNG/JPEG export.", x: 6.8, y: 2.2 },
    { title: "3. TRAI Compliance Validator", desc: "Programmatic regulatory auditing engine. Checks 6 mandatory consumer protection criteria (pricing, GST, FUP limits, validity, disclaimers) with automated 0-100% compliance scoring.", x: 1.0, y: 4.5 },
    { title: "4. Enterprise RBAC Governance", desc: "Stateless JWT authentication enforcing strict role separation between Administrators, Brand Managers, and Designers with campaign approval workflows.", x: 6.8, y: 4.5 }
  ];

  modules.forEach(m => {
    slide.addShape(pptx.ShapeType.rect, { x: m.x, y: m.y, w: 5.4, h: 2.0, fill: { color: CARD_BG }, line: { color: "334155", width: 1 } });
    slide.addText(m.title, { x: m.x + 0.3, y: m.y + 0.2, w: 4.8, h: 0.4, fontSize: 16, bold: true, color: ACCENT_BLUE });
    slide.addText(m.desc, { x: m.x + 0.3, y: m.y + 0.7, w: 4.8, h: 1.1, fontSize: 12, color: TEXT_MUTED });
  });
}

// -------------------------------------------------------------
// SLIDE 7: AI Diffusion Pipeline & Anti-CORS Solution
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("ENGINEERING HIGHLIGHTS", { x: 1.0, y: 0.8, w: 8.0, h: 0.3, fontSize: 11, bold: true, color: ACCENT_EMERALD });
  slide.addText("Key Technical Hurdles Overcome", { x: 1.0, y: 1.2, w: 10.0, h: 0.6, fontSize: 32, bold: true, color: TEXT_WHITE });

  // 3 Innovation Cards
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 2.2, w: 3.4, h: 4.2, fill: { color: CARD_BG }, line: { color: ACCENT_PURPLE, width: 1 } });
  slide.addText("Anti-CORS Taint Pipeline", { x: 1.2, y: 2.5, w: 3.0, h: 0.5, fontSize: 17, bold: true, color: ACCENT_PURPLE });
  slide.addText("Loading cross-origin images on HTML5 Canvas taints the canvas, throwing a SecurityError on export.\n\nFix: Backend caches generated images to local storage (/storage/generated/) and serves from same origin, enabling clean client-side exports.", {
    x: 1.2, y: 3.2, w: 3.0, h: 2.8, fontSize: 12, color: TEXT_MUTED
  });

  slide.addShape(pptx.ShapeType.rect, { x: 4.9, y: 2.2, w: 3.4, h: 4.2, fill: { color: CARD_BG }, line: { color: ACCENT_BLUE, width: 1 } });
  slide.addText("Zero IP Rate Limiting", { x: 5.1, y: 2.5, w: 3.0, h: 0.5, fontSize: 17, bold: true, color: ACCENT_BLUE });
  slide.addText("Concurrent requests triggered anti-abuse rate limits (yellow placeholder cards).\n\nFix: Re-engineered into a Single Hero Showcase Box with on-demand Re-roll, ensuring 100% reliable image delivery in ~6.2s.", {
    x: 5.1, y: 3.2, w: 3.0, h: 2.8, fontSize: 12, color: TEXT_MUTED
  });

  slide.addShape(pptx.ShapeType.rect, { x: 8.8, y: 2.2, w: 3.4, h: 4.2, fill: { color: CARD_BG }, line: { color: ACCENT_EMERALD, width: 1 } });
  slide.addText("100% Free Architecture", { x: 9.0, y: 2.5, w: 3.0, h: 0.5, fontSize: 17, bold: true, color: ACCENT_EMERALD });
  slide.addText("Commercial providers deprecated serverless routes or required paid subscriptions.\n\nFix: Integrated high-speed unmetered Turbo Diffusion with seed randomization, eliminating API token dependencies completely.", {
    x: 9.0, y: 3.2, w: 3.0, h: 2.8, fontSize: 12, color: TEXT_MUTED
  });
}

// -------------------------------------------------------------
// SLIDE 8: TRAI Regulatory Compliance Audit Engine
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("REGULATORY INTELLIGENCE", { x: 1.0, y: 0.8, w: 8.0, h: 0.3, fontSize: 11, bold: true, color: ACCENT_AMBER });
  slide.addText("Automated 6-Point TRAI Audit Rules", { x: 1.0, y: 1.2, w: 10.0, h: 0.6, fontSize: 32, bold: true, color: TEXT_WHITE });

  const rules = [
    { num: "01", title: "Plan Name & Category", desc: "Verifies clear categorization (e.g. '5G Prepaid') without misleading marketing naming.", x: 1.0, y: 2.2 },
    { num: "02", title: "Price Transparency", desc: "Ensures tariff explicitly discloses whether 18% GST is included or extra to prevent hidden fees.", x: 4.9, y: 2.2 },
    { num: "03", title: "FUP Limit Disclosures", desc: "Enforces daily quota and reduced post-FUP speed (e.g. 64 Kbps) disclosures under TRAI mandates.", x: 8.8, y: 2.2 },
    { num: "04", title: "Validity Duration", desc: "Mandates exact billing cycle disclosure (28 days vs 30 days monthly billing transparency).", x: 1.0, y: 4.4 },
    { num: "05", title: "Asterisk Disclaimer", desc: "Audits legibility and font contrast of the mandatory fine-print asterisk disclaimer footer.", x: 4.9, y: 4.4 },
    { num: "06", title: "Dimension Accuracy", desc: "Validates that canvas dimensions match approved channel aspect ratios without distortion.", x: 8.8, y: 4.4 }
  ];

  rules.forEach(r => {
    slide.addShape(pptx.ShapeType.rect, { x: r.x, y: r.y, w: 3.4, h: 1.9, fill: { color: CARD_BG }, line: { color: "334155", width: 1 } });
    slide.addText(`RULE ${r.num}: ${r.title}`, { x: r.x + 0.2, y: r.y + 0.2, w: 3.0, h: 0.3, fontSize: 13, bold: true, color: ACCENT_AMBER });
    slide.addText(r.desc, { x: r.x + 0.2, y: r.y + 0.6, w: 3.0, h: 1.1, fontSize: 11, color: TEXT_MUTED });
  });
}

// -------------------------------------------------------------
// SLIDE 9: Tech Stack
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("TECHNOLOGY STACK", { x: 1.0, y: 0.8, w: 8.0, h: 0.3, fontSize: 11, bold: true, color: ACCENT_PURPLE });
  slide.addText("Technology Stack & Design Choices", { x: 1.0, y: 1.2, w: 10.0, h: 0.6, fontSize: 32, bold: true, color: TEXT_WHITE });

  const tech = [
    { layer: "FRONTEND", tech: "Next.js 14", desc: "React 18 SSR, Tailwind CSS, Lucide Icons, App Router navigation", x: 1.0 },
    { layer: "BACKEND API", tech: "FastAPI", desc: "Python 3.10+, Uvicorn, Pydantic v2 schemas, Asynchronous asyncio", x: 3.9 },
    { layer: "DATABASE", tech: "SQLite + SQLAlchemy", desc: "SQLAlchemy 2.0 ORM, ACID-compliant relational storage", x: 6.8 },
    { layer: "AI PIPELINE", tech: "Turbo Diffusion", desc: "Latent visual diffusion, pseudo-random seed control, Pillow image pipeline", x: 9.7 }
  ];

  tech.forEach(t => {
    slide.addShape(pptx.ShapeType.rect, { x: t.x, y: 2.2, w: 2.6, h: 4.4, fill: { color: CARD_BG }, line: { color: "334155", width: 1 } });
    slide.addText(t.layer, { x: t.x + 0.2, y: 2.5, w: 2.2, h: 0.3, fontSize: 11, bold: true, color: ACCENT_BLUE });
    slide.addText(t.tech, { x: t.x + 0.2, y: 2.9, w: 2.2, h: 0.7, fontSize: 18, bold: true, color: TEXT_WHITE });
    slide.addText(t.desc, { x: t.x + 0.2, y: 3.8, w: 2.2, h: 2.4, fontSize: 12, color: TEXT_MUTED });
  });
}

// -------------------------------------------------------------
// SLIDE 10: Results & Benchmarks
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("QUANTITATIVE EVALUATION", { x: 1.0, y: 0.8, w: 8.0, h: 0.3, fontSize: 11, bold: true, color: ACCENT_EMERALD });
  slide.addText("Performance Results & Benchmarks", { x: 1.0, y: 1.2, w: 10.0, h: 0.6, fontSize: 32, bold: true, color: TEXT_WHITE });

  const stats = [
    { val: "~6.2s", label: "Generation Latency", desc: "From prompt input to rendered visual", color: ACCENT_PURPLE, x: 1.0 },
    { val: "100%", label: "TRAI Compliance Accuracy", desc: "Catches all missing mandatory disclosures", color: ACCENT_EMERALD, x: 3.9 },
    { val: "₹0 / $0", label: "Per-Image Cost", desc: "Unmetered serverless diffusion", color: ACCENT_BLUE, x: 6.8 },
    { val: "3 Ratios", label: "Multi-Channel Formats", desc: "1:1 Feed • 9:16 Story • 16:9 Billboard", color: ACCENT_AMBER, x: 9.7 }
  ];

  stats.forEach(s => {
    slide.addShape(pptx.ShapeType.rect, { x: s.x, y: 2.4, w: 2.6, h: 3.8, fill: { color: CARD_BG }, line: { color: s.color, width: 1.5 } });
    slide.addText(s.val, { x: s.x + 0.1, y: 2.8, w: 2.4, h: 0.8, fontSize: 36, bold: true, align: "center", color: s.color });
    slide.addText(s.label, { x: s.x + 0.1, y: 3.8, w: 2.4, h: 0.5, fontSize: 14, bold: true, align: "center", color: TEXT_WHITE });
    slide.addText(s.desc, { x: s.x + 0.1, y: 4.4, w: 2.4, h: 1.2, fontSize: 11, align: "center", color: TEXT_MUTED });
  });
}

// -------------------------------------------------------------
// SLIDE 11: Future Roadmap
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("LOOKING AHEAD", { x: 1.0, y: 0.8, w: 8.0, h: 0.3, fontSize: 11, bold: true, color: ACCENT_PURPLE });
  slide.addText("Future Scope & Research Roadmap", { x: 1.0, y: 1.2, w: 10.0, h: 0.6, fontSize: 32, bold: true, color: TEXT_WHITE });

  const roadmap = [
    { icon: "🎯", title: "Custom LoRA Brand Weights", desc: "Fine-tune low-rank adaptation (LoRA) diffusion weights on official 3D telecom mascots and physical device renders for micro-precision brand placement.", x: 1.0 },
    { icon: "🚀", title: "Direct Ad Platform Publishing", desc: "Direct API webhooks connecting approved canvas banners into Meta Ads Manager and Google Ads campaigns with 1-click live publishing.", x: 4.9 },
    { icon: "🌐", title: "Multi-Lingual Regional Banners", desc: "Automated translation of plan benefits and disclaimers into Hindi, Telugu, Tamil, and Bengali typography for pan-India localized campaigns.", x: 8.8 }
  ];

  roadmap.forEach(r => {
    slide.addShape(pptx.ShapeType.rect, { x: r.x, y: 2.2, w: 3.4, h: 4.2, fill: { color: CARD_BG }, line: { color: "334155", width: 1 } });
    slide.addText(r.icon, { x: r.x + 0.2, y: 2.5, w: 3.0, h: 0.6, fontSize: 30 });
    slide.addText(r.title, { x: r.x + 0.2, y: 3.2, w: 3.0, h: 0.7, fontSize: 16, bold: true, color: TEXT_WHITE });
    slide.addText(r.desc, { x: r.x + 0.2, y: 4.0, w: 3.0, h: 2.0, fontSize: 12, color: TEXT_MUTED });
  });
}

// -------------------------------------------------------------
// SLIDE 12: Conclusion & Q&A
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  setSlideBg(slide);

  slide.addText("✓", { x: 5.6, y: 1.8, w: 2.0, h: 0.8, fontSize: 44, bold: true, align: "center", color: ACCENT_EMERALD });
  slide.addText("Thank You!", { x: 2.0, y: 2.6, w: 9.2, h: 1.0, fontSize: 48, bold: true, align: "center", color: TEXT_WHITE });
  slide.addText("LAUNCH AI bridges the critical gap between visual diffusion models and enterprise regulatory governance in Indian telecommunications.", {
    x: 2.5, y: 3.7, w: 8.2, h: 0.8, fontSize: 16, align: "center", color: TEXT_MUTED
  });

  slide.addShape(pptx.ShapeType.rect, { x: 4.3, y: 4.8, w: 4.6, h: 0.7, fill: { color: "1E1B4B" }, line: { color: ACCENT_PURPLE, width: 1 } });
  slide.addText("Open for Viva Defense & Questions", { x: 4.3, y: 4.9, w: 4.6, h: 0.5, fontSize: 14, bold: true, align: "center", color: ACCENT_PURPLE });

  slide.addText("Ramya Deepika Kudelli • Lead Architect & Developer • 2026", {
    x: 2.0, y: 6.2, w: 9.2, h: 0.4, fontSize: 11, align: "center", color: TEXT_MUTED
  });
}

// -------------------------------------------------------------
// Save PPTX File
// -------------------------------------------------------------
const outPath1 = path.join(__dirname, "public", "LAUNCH_AI_Viva_Presentation.pptx");
const outPath2 = path.join(__dirname, "..", "LAUNCH_AI_Viva_Presentation.pptx");

pptx.writeFile({ fileName: outPath1 })
  .then(() => {
    console.log("Successfully generated:", outPath1);
    // Also save to root directory
    return pptx.writeFile({ fileName: outPath2 });
  })
  .then(() => {
    console.log("Successfully generated:", outPath2);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error generating PPTX:", err);
    process.exit(1);
  });
