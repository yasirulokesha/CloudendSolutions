import "./App.css";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import worldmap from "../public/worldmap.png";

type ShowcaseItem = {
  id: string;
  code: string;
  kind: "Service" | "Product";
  title: string;
  tagline: string;
  detail: string;
  capabilities: string[];
  href?: string;
};

const showcaseItems: ShowcaseItem[] = [
  {
    id: "websites",
    code: "01",
    kind: "Service",
    title: "Business Websites",
    tagline: "Brand & Conversion",
    detail:
      "Modern, responsive websites that establish your brand and convert visitors into customers with clean architecture and fast edge delivery.",
    capabilities: [
      "Custom Responsive Design",
      "High-Speed Edge Hosting",
      "Conversion-Focused UX",
    ],
  },
  {
    id: "ecommerce",
    code: "02",
    kind: "Service",
    title: "E-Commerce",
    tagline: "Scale & Checkout",
    detail:
      "High-performance online stores built to scale, from zero-latency checkout flows to real-time inventory and fulfillment.",
    capabilities: [
      "Headless Commerce",
      "Real-Time Inventory Sync",
      "Global CDN & Multi-Currency",
    ],
  },
  {
    id: "seo",
    code: "03",
    kind: "Service",
    title: "SEO Support",
    tagline: "Organic Growth",
    detail:
      "Data-driven technical and on-page search optimization to grow qualified organic traffic and improve search visibility.",
    capabilities: [
      "Technical SEO Audits",
      "Core Web Vitals Tuning",
      "Structured Search Indexing",
    ],
  },
  {
    id: "ledger",
    code: "04",
    kind: "Service",
    title: "Ledger Management",
    tagline: "Audit-Ready Finance",
    detail:
      "Reliable financial ledger systems that keep your balances, vouchers, and audit trails accurate and up to date.",
    capabilities: [
      "Live Cashbook Balances",
      "Automated Voucher Records",
      "Audit Trail Monitoring",
    ],
  },
  {
    id: "pos",
    code: "05",
    kind: "Service",
    title: "POS Systems",
    tagline: "Retail & Hospitality",
    detail:
      "Fast, dependable point-of-sale software engineered for high-volume retail counters and hospitality operations.",
    capabilities: [
      "Rapid Counter Billing",
      "Live Stock Deductions",
      "Shift & Daily Reporting",
    ],
  },
  {
    id: "sap",
    code: "06",
    kind: "Service",
    title: "SAP Systems",
    tagline: "Enterprise ERP",
    detail:
      "SAP implementation and integration that unifies finance, supply chain, and day-to-day enterprise operations.",
    capabilities: [
      "ERP System Integration",
      "Finance & Supply Chain Sync",
      "Operational Process Control",
    ],
  },
  {
    id: "schoolstock",
    code: "P1",
    kind: "Product",
    title: "SchoolStock",
    tagline: "schoolstock.lk · Stock & Inventory",
    detail:
      "Multi-tenant school inventory and stock management platform built for structured asset tracking, receiving records, and institutional workflows.",
    capabilities: [
      "Multi-Tenant Architecture",
      "Receiving & Stock Ledgers",
      "Cloud Access at schoolstock.lk",
    ],
    href: "https://schoolstock.lk",
  },
  {
    id: "bursar",
    code: "P2",
    kind: "Product",
    title: "BURSAR Ledger Manager",
    tagline: "Desktop Accounting & Vouchers",
    detail:
      "Dedicated desktop accounting suite featuring real-time cashbook tracking, payment voucher generation, PDF viewing, and database trigger safeguards.",
    capabilities: [
      "Cashbook Balance Tracking",
      "PDF Payment Vouchers",
      "Database Trigger Safeguards",
    ],
  },
];

const services = [
  {
    id: "websites",
    title: "Business Websites",
    category: "Web & Growth",
    badge: "Ready to Deploy",
    description:
      "Modern, responsive websites that establish your brand and convert visitors into customers.",
    metrics: ["Responsive Layout", "Fast Edge Delivery", "SEO Foundations"],
    accent: "from-sky-900/80 via-slate-900/85 to-black/95",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    category: "Commerce & Ledger",
    badge: "High Throughput",
    description:
      "High-performance online stores built to scale, from checkout to inventory to fulfillment.",
    metrics: ["Headless Commerce", "Global CDN", "Real-Time Stock Sync"],
    accent: "from-emerald-950/85 via-zinc-900/90 to-black/95",
  },
  {
    id: "seo",
    title: "SEO Support",
    category: "Web & Growth",
    badge: "Continuous Audit",
    description:
      "Data-driven search optimization to grow organic traffic and improve visibility.",
    metrics: ["Technical SEO", "Page Speed", "Search Indexing"],
    accent: "from-cyan-950/85 via-slate-900/90 to-black/95",
  },
  {
    id: "ledger",
    title: "Ledger Management",
    category: "Commerce & Ledger",
    badge: "Audit Ready",
    description:
      "Reliable ledger systems that keep your finances accurate, auditable, and up to date.",
    metrics: ["Multi-Currency Ledger", "Voucher Records", "Live Balances"],
    accent: "from-stone-900/85 via-neutral-900/90 to-black/95",
  },
  {
    id: "pos",
    title: "POS Systems",
    category: "Enterprise POS & SAP",
    badge: "Real-Time Sync",
    description:
      "Fast, dependable point-of-sale software built for retail and hospitality operations.",
    metrics: ["Counter Billing", "Inventory Moves", "Shift Summaries"],
    accent: "from-teal-950/85 via-zinc-900/90 to-black/95",
  },
  {
    id: "sap",
    title: "SAP Systems",
    category: "Enterprise POS & SAP",
    badge: "Structured Scale",
    description:
      "SAP implementation and integration that unifies finance, supply chain, and operations.",
    metrics: ["ERP Alignment", "Data Bridges", "Process Control"],
    accent: "from-blue-950/85 via-slate-900/90 to-black/95",
  },
];

const ecosystemTools = [
  "OpenAI",
  "AWS",
  "SAP ERP",
  "Next.js",
  "Supabase",
  "Cloudflare",
];

const comparisonRows = [
  {
    legacy: "Generic templates & slow, bloated page loads",
    cloudend: "Custom Designs engineered for speed and conversion",
  },
  {
    legacy: "Unclear technical scope before committing budget",
    cloudend: "Free Consultation & system audit before we build",
  },
  {
    legacy: "Months of waiting with disconnected vendors",
    cloudend: "Fast Delivery with milestone check-ins every week",
  },
  {
    legacy: "Fragmented ledgers, POS counters & online stock",
    cloudend: "Unified E-Commerce, Ledger, POS & SAP integration",
  },
  {
    legacy: "Disappearing support after launch day",
    cloudend: "24/7 Support keeping critical systems always online",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Consulting",
    description:
      "We learn your goals, audit your current systems, and map out the right approach.",
    animation:
      "https://lottie.host/embed/7130b1e6-0f54-431c-bd24-8ccaaf1b23a3/p8JKnH7ByI.lottie",
  },
  {
    step: "02",
    title: "Engineering",
    description:
      "We architect the solution, choosing the right stack and systems for your goals.",
    animation:
      "https://lottie.host/embed/46f4950d-54e0-4f62-88d8-ed06006c37ad/1HFYsT1CYR.lottie",
  },
  {
    step: "03",
    title: "Building",
    description:
      "Our team designs and develops your solution, with regular check-ins along the way.",
    animation:
      "https://lottie.host/embed/09a1a000-446f-48b3-9fbb-bd901a1115d3/1oVTCOQOy0.lottie",
  },
  {
    step: "04",
    title: "Launching",
    description:
      "We deploy, test, and stay on hand to support you as your platform goes live.",
    animation:
      "https://lottie.host/embed/051ab0f0-a1a6-4aa0-a453-460fa069fc54/exCqR34icZ.lottie",
  },
];

const faqs = [
  {
    question: "What IT ecosystems does CloudEnd Solutions build?",
    answer:
      "We deliver Business Websites, high-throughput E-Commerce platforms, technical SEO Support, auditable Ledger Management systems, retail/hospitality POS Systems, and enterprise SAP Systems.",
  },
  {
    question: "How do we start a project?",
    answer:
      "We begin with a Free Consultation where we learn your goals, audit your existing tools, and map out a clear technical architecture before any development begins.",
  },
  {
    question: "Can you integrate E-Commerce with our POS, Ledger, or SAP?",
    answer:
      "Yes. Our architecture unifies headless storefronts, real-time inventory sync, multi-currency ledger records, counter POS terminals, and SAP supply-chain workflows.",
  },
  {
    question: "How fast can our platform go live?",
    answer:
      "Through our structured 4-step workflow—Consulting, Engineering, Building, and Launching—we prioritize fast delivery with regular progress check-ins.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We provide 24/7 Support, ongoing SEO optimization, and proactive system monitoring to ensure zero-latency reliability as your business scales.",
  },
];

const HERO_MOUNTAIN_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85";

const STUDIO_OFFICE_IMAGE = worldmap;

const FOOTER_RIDGE_IMAGE =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80";

export function App() {
  const [heroUrlInput, setHeroUrlInput] = useState("");
  const [heroAuditSubmitted, setHeroAuditSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showcaseTab, setShowcaseTab] = useState<"All" | "Service" | "Product">(
    "All",
  );
  const [activeShowcaseId, setActiveShowcaseId] = useState<string>("ecommerce");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const visibleShowcaseItems =
    showcaseTab === "All"
      ? showcaseItems
      : showcaseItems.filter((item) => item.kind === showcaseTab);

  const activeShowcaseItem =
    showcaseItems.find((item) => item.id === activeShowcaseId) ??
    showcaseItems[0];

  const currentStep = workflowSteps[activeStepIndex];

  const handleHeroSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!heroUrlInput.trim()) return;
    setHeroAuditSubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#111315] antialiased selection:bg-[#16A8F8]/20 selection:text-[#0B0D0F]">
      {/* Top Hero Wrapper with Rounded Alpine Landscape Container */}
      <div
        id="home"
        className="mx-auto max-w-[1360px] px-3 pt-3 sm:px-5 sm:pt-5"
      >
        <div className="relative overflow-hidden rounded-[28px] bg-[#6FA6D6] shadow-[0_24px_60px_-20px_rgba(15,23,42,0.22)]">
          <img
            src={HERO_MOUNTAIN_IMAGE}
            alt="Sunlit alpine landscape"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#4B89C8]/65 via-[#4E8BC7]/35 to-black/50"
          />

          {/* Floating White Pill Navigation Bar */}
          <header className="relative z-20 mx-auto max-w-5xl px-4 pt-5 sm:px-6">
            <div className="flex items-center justify-between rounded-2xl bg-white/95 px-4 py-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.18)] backdrop-blur-md sm:px-5">
              <a href="#home" className="flex items-center gap-2.5">
                <img
                  src="/favicon.svg"
                  alt="CloudEnd Solutions logo"
                  className="h-6 w-6"
                />
                <span className="text-sm font-bold tracking-tight text-[#111315]">
                  Cloudend
                </span>
              </a>

              <nav className="hidden items-center gap-7 text-xs font-medium text-[#4B5563] md:flex">
                <a
                  href="#about"
                  className="transition-colors hover:text-[#111315]"
                >
                  About
                </a>
                <a
                  href="#why-us"
                  className="transition-colors hover:text-[#111315]"
                >
                  Solution
                </a>
                <a
                  href="#services"
                  className="transition-colors hover:text-[#111315]"
                >
                  Works
                </a>
                <a
                  href="#process"
                  className="transition-colors hover:text-[#111315]"
                >
                  Process
                </a>
                <a
                  href="#faq"
                  className="transition-colors hover:text-[#111315]"
                >
                  FAQ
                </a>
              </nav>

              <div className="flex items-center gap-2.5">
                {/* <span
                  title="Galle, Sri Lanka"
                  className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 sm:inline-flex"
                >
                  <span>🇱🇰</span>
                  <span>LK</span>
                </span> */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#111315] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#272B30]"
                >
                  <span className="text-[11px]">📞</span>
                  <span>Book a call</span>
                </a>
              </div>
            </div>
          </header>

          {/* Centered Hero Content */}
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pt-16 pb-14 text-center sm:pt-24 sm:pb-20">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl leading-[1.08] font-semibold tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.22)] sm:text-5xl lg:text-[62px]"
            >
              Engineering the future.
              <br />
              Smart IT that scales.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.25)] sm:text-base"
            >
              Scale your infrastructure with cutting-edge LEDGER systems,
              high-performance E-Commerce engines, and specialized SEO
              architectures.
            </motion.p>

            {/* White Frosted Inline Analysis Box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-8 w-full max-w-md rounded-2xl bg-white/95 p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] backdrop-blur-md"
            >
              <form
                onSubmit={handleHeroSubmit}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={heroUrlInput}
                  onChange={(e) => {
                    setHeroUrlInput(e.target.value);
                    if (heroAuditSubmitted) setHeroAuditSubmitted(false);
                  }}
                  placeholder="https://yourcompany.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-xs text-[#111315] outline-none placeholder:text-slate-400 focus:border-[#16A8F8] focus:bg-white sm:text-sm"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-[#16A8F8] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#0D96E3] sm:text-sm"
                  onClick={() => {
                    window.location.href = `https://seo-analyzer.cloudendsolutions.com/?url=${encodeURIComponent(heroUrlInput)}`;
                  }}
                >
                  {heroAuditSubmitted ? "Analyzing ✓" : "Analyze →"}
                </button>
              </form>
              <p className="mt-2 text-[11px] text-slate-500">
                {heroAuditSubmitted
                  ? `Free architecture & SEO audit queued for ${heroUrlInput}.`
                  : "Submit your company website for a free IT & SEO architecture audit"}
              </p>
            </motion.div>

            {/* Bottom Dark Frosted Pillar Pill */}
            <div className="mt-14 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-black/55 px-5 py-2 text-[11px] font-medium text-white/95 backdrop-blur-md">
              <span>Enterprise Security</span>
              <span className="text-white/40">•</span>
              <span>Fast Deployment</span>
              <span className="text-white/40">•</span>
              <span>Scalable Architecture</span>
              <span className="text-white/40">•</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem Integration Logos Strip */}
      <section className="mx-auto max-w-5xl px-6 pt-12 pb-8 text-center">
        <p className="text-xs font-medium text-slate-400">
          We help our clients stay ahead by engineering ecosystems powered by
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {ecosystemTools.map((tool) => (
            <span
              key={tool}
              className="text-base font-bold tracking-tight text-slate-800/85 transition-colors hover:text-[#111315] sm:text-lg"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* Redesigned Services & Products Section: Interactive Directory + Dark Spotlight Panel */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        {/* Top Section Header & Filter Tabs */}
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200/80 pb-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold tracking-wider text-slate-600 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A8F8]" />
              Services &amp; Products
            </span>
            <h2 className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-[#111315] sm:text-4xl">
              Smart IT has changed how businesses scale.
            </h2>
          </div>

          <div className="inline-flex self-start rounded-full border border-slate-200 bg-slate-100/80 p-1 md:self-auto">
            {(["All", "Service", "Product"] as const).map((tab) => {
              const active = showcaseTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setShowcaseTab(tab);
                    const nextMatch =
                      tab === "All"
                        ? showcaseItems[0]
                        : showcaseItems.find((i) => i.kind === tab);
                    if (nextMatch) setActiveShowcaseId(nextMatch.id);
                  }}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "text-white"
                      : "text-slate-600 hover:text-[#111315]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="showcaseFilterPill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-[#111315]"
                    />
                  )}
                  <span className="relative z-10">
                    {tab === "All" ? "All (8)" : `${tab}s`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Split Layout: Interactive 2-Column Grid + Dark Obsidian Spotlight */}
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left 7 Columns: Interactive Selector Tiles */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
            {visibleShowcaseItems.map((item) => {
              const isSelected = item.id === activeShowcaseId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveShowcaseId(item.id)}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-[#111315] bg-slate-900/[0.03] shadow-xs"
                      : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold text-slate-400">
                      {item.code}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        item.kind === "Product"
                          ? "bg-[#16A8F8]/15 text-[#0D96E3]"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.kind}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#111315]">
                        {item.title}
                      </h3>
                      <span
                        className={`text-xs transition-transform ${
                          isSelected
                            ? "translate-x-0.5 text-[#16A8F8]"
                            : "text-slate-300 group-hover:text-slate-600"
                        }`}
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 5 Columns: Dark High-Contrast Detail Panel */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="overflow-hidden rounded-3xl bg-[#0B0D10] p-7 text-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeShowcaseItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                        activeShowcaseItem.kind === "Product"
                          ? "bg-[#16A8F8] text-white"
                          : "bg-white/10 text-sky-300"
                      }`}
                    >
                      {activeShowcaseItem.kind}
                    </span>
                    <span className="font-mono text-xs text-white/45">
                      {activeShowcaseItem.tagline}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {activeShowcaseItem.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/75">
                      {activeShowcaseItem.detail}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                      Key Capabilities
                    </p>
                    <ul className="space-y-2">
                      {activeShowcaseItem.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/90"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#16A8F8]" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    {activeShowcaseItem.href ? (
                      <a
                        href={activeShowcaseItem.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#16A8F8] px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#0D96E3]"
                      >
                        <span>Launch {activeShowcaseItem.title}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold text-[#111315] transition-colors hover:bg-slate-100"
                      >
                        <span>Consult on {activeShowcaseItem.title}</span>
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Social Proof, Platform Spotlight & Galle Office Card */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_2px_14px_rgba(15,23,42,0.03)] md:col-span-7">
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-950">
              <img
                src="/wallet.png"
                alt="E-Commerce Reimagined platform dashboard"
                className="h-44 w-full object-cover"
              />
            </div>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Platform Spotlight
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[#111315]">
                  E-Commerce Reimagined — Zero-Latency Checkout &amp; Ledger
                  Sync
                </h3>
              </div>
              <a
                href="#services"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xs font-semibold text-[#111315] transition-colors hover:bg-[#111315] hover:text-white"
              >
                ↗
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 md:col-span-5">
            <div className="grid flex-1 grid-cols-2 gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5">
              <div className="rounded-xl bg-white p-3.5 shadow-2xs">
                <p className="text-lg font-bold text-[#111315]">Custom</p>
                <p className="text-xs text-slate-500">Designs</p>
              </div>
              <div className="rounded-xl bg-white p-3.5 shadow-2xs">
                <p className="text-lg font-bold text-[#111315]">Free</p>
                <p className="text-xs text-slate-500">Consultation</p>
              </div>
              <div className="rounded-xl bg-white p-3.5 shadow-2xs">
                <p className="text-lg font-bold text-[#111315]">24/7</p>
                <p className="text-xs text-slate-500">Support</p>
              </div>
              <div className="rounded-xl bg-white p-3.5 shadow-2xs">
                <p className="text-lg font-bold text-[#111315]">Fast</p>
                <p className="text-xs text-slate-500">Delivery</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-[#111315] px-5 py-3.5 text-xs text-white">
              <span className="font-medium text-white/90">
                Trusted by growing businesses
              </span>
              <span className="font-semibold text-amber-400">
                4.9 <span className="tracking-tight">★★★★★</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_2px_14px_rgba(15,23,42,0.03)] md:col-span-6">
            <blockquote className="text-xl leading-snug font-medium tracking-tight text-[#111315]">
              &ldquo;From inventory management to secure checkout flows, our
              E-Commerce solutions handle millions of transactions with zero
              latency.&rdquo;
            </blockquote>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Headless Commerce",
                "Global CDN",
                "Multi-Currency Ledger",
                "Real-Time Inventory Sync",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-slate-200/90 md:col-span-6">
            <img
              src={STUDIO_OFFICE_IMAGE}
              alt="CloudEnd Solutions Galle workspace"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/25"
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
              <span className="text-xs font-medium text-white/90">
                Levelup with the world trends
              </span>
              <div className="self-end rounded-full bg-black/55 px-3.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                Empowering businesses with smart IT ecosystems.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="why-us" className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#111315] sm:text-4xl">
            Fast delivery. Clear scope. Forever your edge.
          </h2>
          <p className="mt-2.5 text-sm text-slate-500">
            Fragmented IT vendors slow growth down. CloudEnd Solutions makes
            your digital infrastructure unified before we build.
          </p>
        </div>

        <div className="mt-12 divide-y divide-slate-100 border-y border-slate-100">
          {comparisonRows.map((row) => (
            <div
              key={row.cloudend}
              className="grid grid-cols-1 items-center gap-3 py-4 sm:grid-cols-12"
            >
              <p className="text-sm text-slate-400 sm:col-span-5 sm:text-right">
                {row.legacy}
              </p>
              <div className="hidden justify-center text-slate-400 sm:col-span-2 sm:flex">
                →
              </div>
              <p className="text-sm font-semibold text-[#111315] sm:col-span-5">
                {row.cloudend}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-8">
          <span className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-medium text-slate-500">
            Other vendors
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16A8F8] px-4 py-1 text-xs font-semibold text-white shadow-xs">
            <img
              src="/favicon.svg"
              alt=""
              className="h-3.5 w-3.5 brightness-0 invert"
            />
            <span>cloudend</span>
          </span>
        </div>
      </section>

      {/* Filterable Works & Comprehensive IT Ecosystems Deck */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium text-slate-400">Our Expertise</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[#111315] sm:text-4xl">
              Comprehensive IT Ecosystems
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-full border border-slate-200 bg-slate-50 p-1">
            {[
              "All",
              "Commerce & Ledger",
              "Web & Growth",
              "Enterprise POS & SAP",
            ].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-[#111315] text-white shadow-2xs"
                      : "text-slate-600 hover:text-[#111315]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              className={`group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${service.accent} p-6 text-white shadow-[0_14px_34px_-14px_rgba(15,23,42,0.35)]`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                  {service.category}
                </span>
                <span className="rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-medium text-sky-300">
                  {service.badge}
                </span>
              </div>

              <div className="my-6 space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/80">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 border-t border-white/15 pt-4">
                {service.metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section: Interactive 4-Step Delivery Pipeline with Lottie */}
      <section id="process" className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-medium text-[#16A8F8]">
            Your Future | Our Responsibility
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[#111315] sm:text-4xl">
            Start Your Digital Transformation Today
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-500">
            From custom web development to enterprise-level software
            integrations, we provide end-to-end solutions for businesses of all
            sizes.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {workflowSteps.map((s, idx) => {
            const active = idx === activeStepIndex;
            return (
              <button
                key={s.title}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  active
                    ? "border-[#111315] bg-[#111315] text-white shadow-sm"
                    : "border-slate-200 bg-slate-50/70 text-[#111315] hover:bg-slate-100"
                }`}
              >
                <span
                  className={`text-xs font-semibold ${
                    active ? "text-[#38BDF8]" : "text-slate-400"
                  }`}
                >
                  {s.step}
                </span>
                <p className="mt-1 text-sm font-semibold">{s.title}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-1 items-center gap-8 rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 lg:grid-cols-12">
          <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white lg:col-span-6">
            {workflowSteps.map((step, idx) => (
              <iframe
                key={step.title}
                title={`${step.title} workflow animation`}
                loading="eager"
                src={step.animation}
                className="pointer-events-none absolute inset-0 h-full w-full border-0 transition-opacity duration-300"
                style={{ opacity: idx === activeStepIndex ? 1 : 0 }}
              />
            ))}
          </div>

          <div className="space-y-4 lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <span className="inline-block rounded-full bg-[#16A8F8]/10 px-3 py-1 text-xs font-semibold text-[#0D96E3]">
                  Step {currentStep.step} / 04
                </span>
                <h3 className="text-2xl font-semibold text-[#111315]">
                  {currentStep.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {currentStep.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  setActiveStepIndex((prev) => Math.max(0, prev - 1))
                }
                disabled={activeStepIndex === 0}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-[#111315] transition-colors hover:border-slate-400 disabled:opacity-35"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveStepIndex((prev) =>
                    Math.min(workflowSteps.length - 1, prev + 1),
                  )
                }
                disabled={activeStepIndex === workflowSteps.length - 1}
                className="rounded-full bg-[#111315] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#272B30] disabled:opacity-35"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[#111315] sm:text-4xl">
          Questions we hear the most
        </h2>

        <div className="mt-10 divide-y divide-slate-200/80 border-b border-slate-200/80">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={faq.question} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm font-medium text-[#111315] transition-colors hover:text-[#16A8F8]"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`text-xs text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ⌄
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pt-2.5 text-xs leading-relaxed text-slate-500 sm:text-sm"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Dual Conversion Cards + Alpine Ridge + Black Footer */}
      <div
        id="contact"
        className="mx-auto max-w-[1360px] px-3 pb-3 sm:px-5 sm:pb-5"
      >
        <div className="relative pt-8">
          <div className="relative z-20 mx-auto grid max-w-4xl grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-3xl bg-[#16A8F8] p-7 text-white shadow-[0_20px_50px_-15px_rgba(22,168,248,0.45)] sm:p-8">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Not sure how we can help?
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-white/90 sm:text-sm">
                  Book a free consultation where our team at CloudEnd Solutions
                  audits your current systems and maps out the right IT
                  architecture.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="tel:+94713789640"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#111315] shadow-xs transition-transform hover:scale-[1.02]"
                >
                  <span>📅</span>
                  <span>Call +94 71 378 9640</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 text-[#111315] shadow-[0_20px_50px_-15px_rgba(15,23,42,0.14)] sm:p-8">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Ready to build?
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Already know what you&apos;re looking for? Leave your email
                  and we&apos;ll turn your goals into concrete plans of action.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="mt-6 space-y-2.5">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => {
                      setContactEmail(e.target.value);
                      if (contactSubmitted) setContactSubmitted(false);
                    }}
                    placeholder="you@company.com"
                    className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-[#111315] outline-none placeholder:text-slate-400 focus:border-[#111315] focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-[#111315] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#272B30]"
                  >
                    {contactSubmitted ? "Sent ✓" : "📞 Send"}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  {contactSubmitted
                    ? `Thank you! We will get in touch at ${contactEmail}.`
                    : "We will get in touch with you as soon as possible."}
                </p>
              </form>
            </div>
          </div>

          <div className="-mt-16 rounded-[28px] bg-[#070809] text-white">
            <div className="relative h-36 w-full overflow-hidden sm:h-60">
              <img
                src={FOOTER_RIDGE_IMAGE}
                alt="Alpine mountain ridge"
                className="h-full w-full object-cover object-center opacity-75"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-[#070809]"
              />
            </div>

            <footer className="mx-auto max-w-5xl px-6 pt-8 pb-10">
              <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/favicon.svg"
                      alt="CloudEnd Solutions logo"
                      className="h-6 w-6 brightness-0 invert"
                    />
                    <span className="text-xl font-bold tracking-tight text-white">
                      cloudend<sup className="text-[10px] font-normal">®</sup>
                    </span>
                  </div>
                  <p className="max-w-xs text-xs leading-relaxed text-white/60">
                    23/10 Sri Rewatha Mawatha, Galle 8000, Sri Lanka
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <nav className="flex flex-wrap gap-5 text-xs text-white/75">
                    <a href="#about" className="hover:text-white">
                      About
                    </a>
                    <a href="#why-us" className="hover:text-white">
                      Solution
                    </a>
                    <a href="#services" className="hover:text-white">
                      Works
                    </a>
                    <a href="#process" className="hover:text-white">
                      Process
                    </a>
                    <a href="#faq" className="hover:text-white">
                      FAQ
                    </a>
                  </nav>
                  <a
                    href="tel:+94713789640"
                    className="text-xs font-medium text-[#16A8F8] hover:underline"
                  >
                    +94 71 378 9640
                  </a>
                </div>
              </div>

              <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/45 sm:flex-row">
                <span>
                  © {new Date().getFullYear()} CloudEnd Solutions. All rights
                  reserved.
                </span>
                <span>Engineering the future with smart IT solutions</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
