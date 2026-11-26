
import "./App.css";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { type MouseEvent, useState } from "react";

const smoothEase = [0.22, 1, 0.36, 1] as const;
const tactileSpring = { type: "spring" as const, stiffness: 380, damping: 32 };

const whyChoosePillars = [
  {
    code: "01",
    title: "Custom Designs",
    description:
      "Tailored interfaces and full-stack software built around your exact brand and operational workflows.",
  },
  {
    code: "02",
    title: "Scalable Architecture",
    description:
      "High-throughput E-Commerce, Ledger, POS, and SAP systems engineered to grow without latency.",
  },
  {
    code: "03",
    title: "Fast Delivery",
    description:
      "Structured consulting, rapid prototyping, and predictable milestones from initial audit to launch.",
  },
  {
    code: "04",
    title: "24/7 Support",
    description:
      "Free initial consultation and continuous post-launch monitoring so your operations stay online.",
  },
];

const producedSolutions = [
  {
    id: "schoolstock",
    category: "Product",
    title: "SchoolStock Platform",
    subtitle: "schoolstock.lk · Multi-Tenant Inventory & Stock Management",
    description:
      "Centralized cloud stock, receiving records, and asset tracking designed for multi-tenant school and institutional operations.",
    highlights: ["Multi-Tenant Isolation", "Receiving & Stock Logs", "Cloud Portal"],
    status: "Flagship Product",
    link: "https://schoolstock.lk",
  },
  {
    id: "bursar",
    category: "Product",
    title: "BURSAR Ledger Manager",
    subtitle: "Desktop Accounting, Cashbook & Payment Voucher Suite",
    description:
      "Reliable desktop accounting application featuring live cashbook balances, payment voucher generation, PDF viewing, and database trigger monitoring.",
    highlights: ["Cashbook Balances", "Payment Vouchers", "Audit Triggers"],
    status: "Core Product",
    link: "#contact",
  },
  {
    id: "commerce-suite",
    category: "System",
    title: "E-Commerce & POS Commerce Engine",
    subtitle: "Online Storefront, Counter Billing & Inventory Sync",
    description:
      "High-performance online stores connected to retail and hospitality POS counters with real-time stock updates and multi-currency ledger records.",
    highlights: ["Zero-Latency Checkout", "Real-Time Stock Sync", "Counter POS"],
    status: "Production System",
    link: "#contact",
  },
  {
    id: "sap-web-suite",
    category: "System",
    title: "Enterprise Web, SEO & SAP Bridges",
    subtitle: "Business Websites, Search Visibility & ERP Integration",
    description:
      "Responsive corporate websites paired with technical SEO optimization and SAP integration that unifies finance, supply chain, and daily operations.",
    highlights: ["Responsive Web", "Technical SEO", "SAP ERP Alignment"],
    status: "Enterprise System",
    link: "#contact",
  },
];

const companyServices = [
  {
    id: "websites",
    code: "SRV-01",
    title: "Business Websites",
    tag: "Web Presence",
    description:
      "Modern, responsive websites that establish your brand and convert visitors into customers.",
    deliverables: ["Responsive UI", "Fast Performance", "Lead Conversion"],
  },
  {
    id: "ecommerce",
    code: "SRV-02",
    title: "E-Commerce",
    tag: "Online Commerce",
    description:
      "High-performance online stores built to scale, from checkout to inventory to fulfillment.",
    deliverables: ["Checkout Flow", "Inventory Sync", "Order Fulfillment"],
  },
  {
    id: "seo",
    code: "SRV-03",
    title: "SEO Support",
    tag: "Search Visibility",
    description:
      "Data-driven search optimization to grow organic traffic and improve visibility.",
    deliverables: ["Technical SEO", "Site Speed", "Search Indexing"],
  },
  {
    id: "ledger",
    code: "SRV-04",
    title: "Ledger Management",
    tag: "Financial Control",
    description:
      "Reliable ledger systems that keep your finances accurate, auditable, and up to date.",
    deliverables: ["Voucher Records", "Live Balances", "Audit Ready"],
  },
  {
    id: "pos",
    code: "SRV-05",
    title: "POS Systems",
    tag: "Retail & Hospitality",
    description:
      "Fast, dependable point-of-sale software built for retail and hospitality operations.",
    deliverables: ["Counter Speed", "Stock Updates", "Daily Summaries"],
  },
  {
    id: "sap",
    code: "SRV-06",
    title: "SAP Systems",
    tag: "Enterprise ERP",
    description:
      "SAP implementation and integration that unifies finance, supply chain, and operations.",
    deliverables: ["Finance & Supply Chain", "System Integration", "Process Control"],
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

const reviews = [
  {
    quote:
      "CloudEnd Solutions transformed our manual stock records into a fast, structured cloud system. Their responsiveness and technical clarity stood out from day one.",
    author: "Kasun Perera",
    role: "Operations Director · Retail & Distribution",
    initials: "KP",
  },
  {
    quote:
      "Our new e-commerce storefront and ledger workflow run seamlessly together. Page speeds jumped immediately and reconciliation takes minutes instead of hours.",
    author: "Nimali Jayawardena",
    role: "Managing Partner · Commerce Group",
    initials: "NJ",
  },
  {
    quote:
      "From the initial free consultation to deployment, the CloudEnd team delivered clean architecture, reliable POS sync, and round-the-clock support.",
    author: "Dilshan Fernando",
    role: "Head of Finance · Hospitality & Retail",
    initials: "DF",
  },
  {
    quote:
      "Their SEO architecture and custom web engineering gave our brand measurable organic growth within weeks of going live.",
    author: "Tharindu Silva",
    role: "Founder · Enterprise Services",
    initials: "TS",
  },
];

function CloudIT3DElement() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 24 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(x);
    pointerY.set(y);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[390px] w-full max-w-[430px] items-center justify-center sm:h-[430px]"
      style={{ perspective: 1100 }}
    >
      {/* Ambient Radial Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-8 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-cyan-400/15 blur-3xl"
      />

      {/* Tilting 3D Cloud & IT Infrastructure Assembly */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex h-full w-full items-center justify-center"
      >
        {/* Back Tilted IT Mesh Plane */}
        <div
          style={{ transform: "translateZ(-36px) rotateX(62deg) rotateZ(-28deg)" }}
          className="pointer-events-none absolute h-64 w-64 rounded-3xl border border-indigo-400/25 bg-indigo-500/[0.03] shadow-[0_0_50px_rgba(99,102,241,0.12)]"
        >
          <div
            className="h-full w-full rounded-3xl opacity-45"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(129,140,248,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(129,140,248,0.22) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Central Sculpted 3D Metallic Cloud Core */}
        <div
          style={{ transform: "translateZ(24px)" }}
          className="relative z-10 flex h-56 w-68 items-center justify-center sm:h-64 sm:w-80"
        >
          <svg
            viewBox="0 0 360 250"
            className="h-full w-full overflow-visible drop-shadow-[0_28px_50px_rgba(0,0,0,0.9)]"
            fill="none"
          >
            <defs>
              <linearGradient id="cloudShellGrad" x1="40" y1="20" x2="310" y2="210" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3F3F46" />
                <stop offset="45%" stopColor="#18181B" />
                <stop offset="100%" stopColor="#09090B" />
              </linearGradient>
              <linearGradient id="cloudRimGrad" x1="65" y1="35" x2="295" y2="165" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.65" />
              </linearGradient>
              <linearGradient id="serverSlabGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#27272A" />
                <stop offset="100%" stopColor="#111115" />
              </linearGradient>
            </defs>

            {/* 3D Cloud Silhouette */}
            <path
              d="M92 178H266C296.928 178 322 152.928 322 122C322 92.5535 299.266 68.4143 270.355 66.1678C260.415 39.6716 234.749 21 204.5 21C177.812 21 154.688 35.951 142.878 57.9977C135.424 55.3948 127.419 54 119.1 54C79.898 54 48 85.798 48 125C48 154.271 65.7213 178 92 178Z"
              fill="url(#cloudShellGrad)"
              stroke="url(#cloudRimGrad)"
              strokeWidth="2"
            />

            {/* Inner Cloud Highlight Facet */}
            <path
              d="M112 72C126 52 152 38 185 38C214 38 238 51 251 74"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* IT Telemetry & Node Indicators Inside Cloud */}
            <rect
              x="114"
              y="92"
              width="132"
              height="56"
              rx="10"
              fill="url(#serverSlabGrad)"
              stroke="rgba(255,255,255,0.14)"
            />
            <circle cx="132" cy="112" r="4" fill="#34D399" />
            <circle cx="146" cy="112" r="4" fill="#818CF8" />
            <circle cx="160" cy="112" r="4" fill="#38BDF8" />
            <rect x="180" y="108" width="50" height="7" rx="3.5" fill="rgba(255,255,255,0.18)" />
            <line x1="128" y1="130" x2="232" y2="130" stroke="rgba(165,180,252,0.28)" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Connection Bus Lines Below Cloud */}
            <path d="M120 178V206H90" stroke="#818CF8" strokeOpacity="0.55" strokeWidth="1.5" />
            <path d="M180 178V218" stroke="#38BDF8" strokeOpacity="0.65" strokeWidth="1.5" />
            <path d="M240 178V206H270" stroke="#C084FC" strokeOpacity="0.55" strokeWidth="1.5" />
            <circle cx="90" cy="206" r="3.5" fill="#818CF8" />
            <circle cx="180" cy="218" r="4" fill="#38BDF8" />
            <circle cx="270" cy="206" r="3.5" fill="#C084FC" />
          </svg>
        </div>

        {/* Floating 3D IT Module Badges */}
        <motion.div
          style={{ transform: "translateZ(56px)" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 left-2 z-20 rounded-xl border border-white/15 bg-[#121218]/90 px-3.5 py-2 shadow-xl backdrop-blur-md sm:left-4"
        >
          <p className="font-mono text-[10px] text-indigo-300">LEDGER &amp; ERP</p>
          <p className="text-xs font-semibold text-white">Real-Time Sync</p>
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(64px)" }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 right-2 z-20 rounded-xl border border-white/15 bg-[#121218]/90 px-3.5 py-2 shadow-xl backdrop-blur-md sm:right-4"
        >
          <p className="font-mono text-[10px] text-cyan-300">E-COMMERCE &amp; POS</p>
          <p className="text-xs font-semibold text-white">Zero Latency</p>
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(52px)" }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-indigo-400/30 bg-[#121218]/95 px-4 py-1.5 font-mono text-[11px] text-zinc-200 shadow-lg backdrop-blur-md"
        >
          WEB · SEO · SAP · CLOUD
        </motion.div>
      </motion.div>
    </div>
  );
}

export function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("ecommerce");
  const [producedFilter, setProducedFilter] = useState<string>("All");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const { scrollYProgress } = useScroll();
  const scrollProgressScaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  const activeService =
    companyServices.find((s) => s.id === selectedServiceId) ?? companyServices[0];

  const filteredProduced =
    producedFilter === "All"
      ? producedSolutions
      : producedSolutions.filter((item) => item.category === producedFilter);

  const currentStep = workflowSteps[activeStepIndex];

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#09090B] text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-white">
        {/* Top Scroll Progress Indicator */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollProgressScaleX }}
          className="fixed top-0 right-0 left-0 z-50 h-0.5 origin-left bg-gradient-to-r from-indigo-400 via-purple-400 to-white"
        />

        {/* Subtle Top Radial Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[540px]"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 50% -10%, rgba(129, 140, 248, 0.14), transparent 70%)",
          }}
        />

        {/* Minimal Dark Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: smoothEase }}
          className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#09090B]/85 backdrop-blur-xl"
        >
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <a href="#home" className="flex items-center gap-2.5">
              <img
                src="/favicon.svg"
                alt="CloudEnd Solutions logo"
                className="h-6 w-6"
              />
              <span className="text-sm font-semibold tracking-tight text-white">
                CloudEnd
              </span>
            </a>

            <nav className="hidden items-center gap-7 text-xs font-medium text-zinc-400 md:flex">
              <a
                href="#what-we-produce"
                className="transition-colors hover:text-white"
              >
                What We Produce
              </a>
              <a href="#services" className="transition-colors hover:text-white">
                Services
              </a>
              <a href="#process" className="transition-colors hover:text-white">
                Process
              </a>
              <a href="#reviews" className="transition-colors hover:text-white">
                Reviews
              </a>
              <a href="#contact" className="transition-colors hover:text-white">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="tel:+94713789640"
                className="hidden text-xs font-medium text-zinc-400 transition-colors hover:text-white sm:inline-block"
              >
                +94 71 378 9640
              </a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={tactileSpring}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                <span>Get Started</span>
                <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </div>
        </motion.header>

        {/* Hero Section with Interactive 3D Cloud & IT Element */}
        <section
          id="home"
          className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-20 lg:pt-24 lg:pb-24"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, ease: smoothEase }}
              className="space-y-6 lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span>Engineering The Future · Galle, Sri Lanka</span>
              </div>

              <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-[56px]">
                Powering your business with smart IT solutions
              </h1>

              <p className="max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
                Scale your infrastructure with cutting-edge LEDGER systems,
                high-performance E-Commerce engines, and specialized SEO
                architectures built for modern enterprises.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={tactileSpring}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 sm:text-sm"
                >
                  <span>Get Started</span>
                  <span aria-hidden="true">→</span>
                </motion.a>
                <a
                  href="#what-we-produce"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-white sm:text-sm"
                >
                  <span>See What We Produce</span>
                  <span aria-hidden="true">›</span>
                </a>
              </div>
            </motion.div>

            {/* Right Interactive 3D Cloud & IT Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.58, delay: 0.08, ease: smoothEase }}
              className="relative flex items-center justify-center lg:col-span-5"
            >
              <CloudIT3DElement />
            </motion.div>
          </div>

          {/* Core Services Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: smoothEase }}
            className="mt-16 border-t border-white/[0.06] pt-10 text-center"
          >
            <p className="text-xs text-zinc-500">
              Comprehensive IT ecosystems engineered for growing businesses
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {companyServices.map((srv) => (
                <a
                  key={srv.id}
                  href="#services"
                  onClick={() => setSelectedServiceId(srv.id)}
                  className="text-sm font-semibold tracking-tight text-zinc-400 transition-colors hover:text-white"
                >
                  {srv.title}
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Why Choose CloudEnd? (4-Column Framed Section) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.45, ease: smoothEase }}
          className="relative z-10 mx-auto max-w-6xl px-6 py-16"
        >
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent px-6 pt-12 pb-10 sm:px-10">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Why choose CloudEnd?
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {whyChoosePillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.code}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.05,
                    ease: smoothEase,
                  }}
                  className="space-y-3"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] font-mono text-xs font-semibold text-zinc-300">
                    {pillar.code}
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    {pillar.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-block pt-1 text-xs font-medium text-zinc-300 transition-colors hover:text-white"
                  >
                    Learn more
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 1: What We Produce (Products & Integrated Systems) */}
        <section
          id="what-we-produce"
          className="relative z-10 mx-auto max-w-6xl px-6 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, ease: smoothEase }}
            className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <p className="font-mono text-xs text-indigo-400">
                What We Produce
              </p>
              <h2 className="mt-1.5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Software &amp;{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  systems we build
                </span>
              </h2>
            </div>

            {/* Filter Tabs with Shared layoutId Pill */}
            <div className="relative flex gap-1 rounded-full border border-white/10 bg-[#111114] p-1">
              {["All", "Product", "System"].map((tab) => {
                const active = producedFilter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setProducedFilter(tab)}
                    className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                      active ? "text-zinc-950" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="producedTabPill"
                        transition={tactileSpring}
                        className="absolute inset-0 -z-10 rounded-full bg-white"
                      />
                    )}
                    {tab === "All" ? "All Outputs" : `${tab}s`}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredProduced.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.28, ease: smoothEase }}
                  className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#111114] p-6 transition-colors hover:border-white/20 sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-0.5 font-mono text-[11px] font-medium text-indigo-300">
                        {item.category}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-500">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-zinc-400">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-md border border-white/[0.07] bg-[#09090B] px-2.5 py-1 text-[11px] text-zinc-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.link}
                      target={
                        item.link.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.link.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                      className="text-xs font-semibold text-white transition-colors hover:text-indigo-400"
                    >
                      Explore →
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Section 2: Services of Our Company */}
        <section
          id="services"
          className="relative z-10 mx-auto max-w-6xl px-6 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, ease: smoothEase }}
            className="text-center"
          >
            <p className="font-mono text-xs text-indigo-400">
              Services of Our Company
            </p>
            <h2 className="mt-1.5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              End-to-end IT services{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                tailored to your goals
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-zinc-400 sm:text-sm">
              Select any company service below to inspect its scope and core
              deliverables.
            </p>
          </motion.div>

          {/* Animated Selected Service Banner */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: smoothEase }}
              className="mt-10 flex flex-col justify-between gap-4 rounded-2xl border border-indigo-400/25 bg-[#121217] p-6 sm:flex-row sm:items-center"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-indigo-300">
                    {activeService.code}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-zinc-300">
                    {activeService.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {activeService.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  {activeService.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeService.deliverables.map((deliv) => (
                  <span
                    key={deliv}
                    className="rounded-lg border border-white/10 bg-[#09090B] px-3 py-1.5 text-xs font-medium text-zinc-200"
                  >
                    {deliv}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 6 Company Service Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companyServices.map((srv, idx) => {
              const isSelected = srv.id === selectedServiceId;
              return (
                <motion.button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedServiceId(srv.id)}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    duration: 0.32,
                    delay: idx * 0.04,
                    ease: smoothEase,
                  }}
                  className={`relative flex flex-col justify-between rounded-2xl border p-6 text-left transition-colors ${
                    isSelected
                      ? "border-indigo-400/50 bg-[#14141A]"
                      : "border-white/[0.08] bg-[#111114] hover:border-white/20"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="selectedServiceRing"
                      transition={tactileSpring}
                      className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-indigo-400/70"
                    />
                  )}

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-indigo-300">{srv.code}</span>
                      <span className="text-zinc-500">{srv.tag}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {srv.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
                      {srv.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-3.5 text-xs">
                    <span className="text-zinc-400">
                      {srv.deliverables.join(" · ")}
                    </span>
                    <span className="font-medium text-indigo-300">→</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* How It Works Section (Interactive 4-Step Pipeline with Lottie) */}
        <section
          id="process"
          className="relative z-10 mx-auto max-w-6xl px-6 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, ease: smoothEase }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">
              From custom web development to enterprise-level software
              integrations, we provide end-to-end solutions for businesses of all
              sizes.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {workflowSteps.map((s, idx) => {
              const active = idx === activeStepIndex;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`relative rounded-2xl border p-5 text-left transition-colors ${
                    active
                      ? "border-white/30 bg-[#141418]"
                      : "border-white/[0.07] bg-[#0D0D10] hover:border-white/15"
                  }`}
                >
                  <span className="font-mono text-xs text-indigo-400">
                    {s.step}
                  </span>
                  <p className="mt-1.5 text-base font-semibold text-white">
                    {s.title}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-1 items-center gap-8 rounded-2xl border border-white/[0.08] bg-[#111114] p-6 sm:p-8 lg:grid-cols-12">
            <div className="relative h-56 w-full overflow-hidden rounded-xl border border-white/[0.07] bg-[#09090B] lg:col-span-6">
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: smoothEase }}
                  className="space-y-2"
                >
                  <p className="font-mono text-xs text-indigo-400">
                    Step {currentStep.step} / 04
                  </p>
                  <h3 className="text-2xl font-semibold text-white">
                    {currentStep.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {currentStep.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStepIndex((prev) => Math.max(0, prev - 1))
                  }
                  disabled={activeStepIndex === 0}
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-white/35 disabled:opacity-30"
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
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 disabled:opacity-30"
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Client Reviews Section */}
        <section
          id="reviews"
          className="relative z-10 mx-auto max-w-6xl px-6 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, ease: smoothEase }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Hear from companies that{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                trust us
              </span>
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">
              Discover how businesses accelerate growth and streamline operations
              with CloudEnd Solutions.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((rev, idx) => (
              <motion.div
                key={rev.author}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.34,
                  delay: idx * 0.05,
                  ease: smoothEase,
                }}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#111114] p-5 transition-colors hover:border-white/20"
              >
                <div>
                  <div className="mb-3 flex items-center gap-1 text-xs text-amber-400">
                    <span>★★★★★</span>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-300">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] font-mono text-[11px] font-semibold text-white">
                    {rev.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      {rev.author}
                    </p>
                    <p className="text-[11px] text-zinc-500">{rev.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottom Centered CTA & Contact Form */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.45, ease: smoothEase }}
          className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-3 text-xs text-zinc-400 sm:text-sm">
            Start building with CloudEnd Solutions today and unlock the full
            potential of your business.
          </p>

          <form
            onSubmit={handleContactSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => {
                setContactEmail(e.target.value);
                if (contactSubmitted) setContactSubmitted(false);
              }}
              placeholder="you@company.com"
              className="w-full rounded-full border border-white/15 bg-[#111114] px-5 py-3 text-xs text-white outline-none placeholder:text-zinc-500 focus:border-indigo-400"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={tactileSpring}
              className="w-full shrink-0 rounded-full bg-white px-6 py-3 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 sm:w-auto"
            >
              {contactSubmitted ? "Request Sent ✓" : "Get Started →"}
            </motion.button>
          </form>

          <AnimatePresence mode="wait">
            <motion.div
              key={contactSubmitted ? "submitted" : "default"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400"
            >
              <span>
                {contactSubmitted
                  ? `Thank you! We will contact you at ${contactEmail}.`
                  : "Free Consultation · 24/7 Support"}
              </span>
              <span>•</span>
              <a
                href="tel:+94713789640"
                className="font-medium text-zinc-200 hover:text-white"
              >
                Contact Sales: +94 71 378 9640 →
              </a>
            </motion.div>
          </AnimatePresence>
        </motion.section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/[0.07] bg-[#09090B] py-14">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-12">
            <div className="space-y-3 md:col-span-4">
              <p className="text-xs leading-relaxed text-zinc-400">
                23/10 Sri Rewatha Mawatha
                <br />
                Galle 8000, Sri Lanka
              </p>
              <a
                href="tel:+94713789640"
                className="block text-xs font-medium text-zinc-300 hover:text-white"
              >
                +94 71 378 9640
              </a>
              <div className="flex items-center gap-2.5 pt-2">
                <img
                  src="/favicon.svg"
                  alt="CloudEnd Solutions logo"
                  className="h-5 w-5"
                />
                <span className="text-sm font-semibold text-white">
                  CloudEnd Solutions
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-xs sm:grid-cols-3 md:col-span-8">
              <div className="space-y-2.5">
                <p className="font-semibold text-white">Services</p>
                {companyServices.slice(0, 4).map((s) => (
                  <a
                    key={s.id}
                    href="#services"
                    onClick={() => setSelectedServiceId(s.id)}
                    className="block text-zinc-400 hover:text-white"
                  >
                    {s.title}
                  </a>
                ))}
              </div>

              <div className="space-y-2.5">
                <p className="font-semibold text-white">What We Produce</p>
                {producedSolutions.map((prod) => (
                  <a
                    key={prod.id}
                    href="#what-we-produce"
                    className="block text-zinc-400 hover:text-white"
                  >
                    {prod.title}
                  </a>
                ))}
              </div>

              <div className="space-y-2.5">
                <p className="font-semibold text-white">Company</p>
                <a href="#home" className="block text-zinc-400 hover:text-white">
                  Overview
                </a>
                <a
                  href="#process"
                  className="block text-zinc-400 hover:text-white"
                >
                  Process
                </a>
                <a
                  href="#reviews"
                  className="block text-zinc-400 hover:text-white"
                >
                  Reviews
                </a>
                <a
                  href="#contact"
                  className="block text-zinc-400 hover:text-white"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-6xl border-t border-white/[0.06] px-6 pt-6 text-xs text-zinc-500">
            © {new Date().getFullYear()} CloudEnd Solutions. All rights
            reserved.
          </p>
        </footer>
      </div>
    </MotionConfig>
  );
}

export default App;

