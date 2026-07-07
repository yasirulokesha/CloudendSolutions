import "./App.css";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { Button, Capsule, ServiceCard, StarField } from "./Components";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Business Websites",
    description:
      "Modern, responsive websites that establish your brand and convert visitors into customers.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="18" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "E-Commerce",
    description:
      "High-performance online stores built to scale, from checkout to inventory to fulfillment.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2 2h2l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 6H6" />
      </svg>
    ),
  },
  {
    title: "SEO Support",
    description:
      "Data-driven search optimization to grow organic traffic and improve visibility.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="10" cy="10" r="6" />
        <line x1="21" y1="21" x2="14.5" y2="14.5" />
      </svg>
    ),
  },
  {
    title: "Ledger Management",
    description:
      "Reliable ledger systems that keep your finances accurate, auditable, and up to date.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    title: "POS Systems",
    description:
      "Fast, dependable point-of-sale software built for retail and hospitality operations.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: "SAP Systems",
    description:
      "SAP implementation and integration that unifies finance, supply chain, and operations.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="M2 12l10 5 10-5" />
        <path d="M2 17l10 5 10-5" />
      </svg>
    ),
  },
];

const subservices = [
  {
    title: "Unique",
    subtitle: "Designs",
  },
  {
    title: "Free",
    subtitle: "Consultation",
  },

  {
    title: "24/7",
    subtitle: "Support",
  },
];

const steps = [
  {
    title: "Consulting",
    description:
      "We learn your goals, audit your current systems, and map out the right approach.",
    animation:
      "https://lottie.host/embed/7130b1e6-0f54-431c-bd24-8ccaaf1b23a3/p8JKnH7ByI.lottie",
  },
  {
    title: "Engineering",
    description:
      "We architect the solution, choosing the right stack and systems for your goals.",
    animation:
      "https://lottie.host/embed/46f4950d-54e0-4f62-88d8-ed06006c37ad/1HFYsT1CYR.lottie",
  },

  {
    title: "Building",
    description:
      "Our team designs and develops your solution, with regular check-ins along the way.",
    animation:
      "https://lottie.host/embed/09a1a000-446f-48b3-9fbb-bd901a1115d3/1oVTCOQOy0.lottie",
  },
  {
    title: "Launching",
    description:
      "We deploy, test, and stay on hand to support you as your platform goes live.",
    animation:
      "https://lottie.host/embed/051ab0f0-a1a6-4aa0-a453-460fa069fc54/exCqR34icZ.lottie",
  },
];

function App() {
  const targetref = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetref,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start start", "end end"],
  });

  const [activeStep, setActiveStep] = useState(0);
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Thank you for reaching out! We'll contact you at ${contactEmail}.`);
    setContactSubmitted(true);
  };

  useMotionValueEvent(stepsProgress, "change", (latest) => {
    const index = Math.min(steps.length - 1, Math.floor(latest * steps.length));
    setActiveStep(index);
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        setActiveStep((current) => Math.min(steps.length - 1, current + 1));
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setActiveStep((current) => Math.max(0, current - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.35], [1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.35], [0, 0, 100]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.8],
    [1, 1, 0.8, 0],
  );

  // const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <>
      <section ref={targetref} id="home">
        <div
          style={{ position: "sticky", top: 0, overflow: "hidden" }}
          className="px-10"
        >
          <StarField />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            style={{ y, opacity, scale, filter: `blur(${blur}px)` }}
            className="flex flex-col md:items-center justify-center h-screen sticky"
            exit={{ opacity: 0 }}
          >
            <span
              className=" w-300 h-300 max-w-full -z-100 rounded-full absolute left-1/2 -translate-x-1/2 -top-20"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(34, 211, 238, 0.20) 0%, rgba(168, 85, 247, 0.02) 60%, rgba(9, 9, 11, 0) 100%)",
              }}
            />
            <Capsule className="mb-8" text="Engineering The Future" />

            <h1>Powering Your Business</h1>
            <h1>
              with{" "}
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-theme"
              >
                Smart IT Solutions
              </motion.span>{" "}
            </h1>
            <p className="md:text-center mt-4 text-[#9CA3AF]  max-w-125">
              Scale your infrastructure with cutting-edge LEDGER systems,
              high-performance E-Commerce engines, and specialized SEO
              architectures.{" "}
            </p>
            <div className="flex gap-4">
              <Button
                text="Get Started"
                className="mt-8"
                onClick={() => (window.location.href = "/contact")}
                varient="default"
              />
              <Button
                text="Get Started"
                className="mt-8"
                onClick={() => (window.location.href = "/contact")}
                varient="flat"
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          id="services"
          style={{ top: 0, overflow: "hidden" }}
          className="flex gap-5 bg-bg/50  flex-col container h-fit w-full backdrop-blur-2xl"
        >
          <div className="mx-auto flex-col sm:flex-row flex w-full justify-between sm:items-end h-fit">
            <div>
              <span className="ghost-text">OUR EXPERTISE</span>
              <h2>
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, y: -100 }}
                >
                  Comprehensive IT <br /> Ecosystems
                </motion.span>{" "}
              </h2>
            </div>
            <div className="w-fit h-full flex flex-col justify-end items-end">
              <p className="text-[#9CA3AF] max-w-75 sm:text-right w-fit">
                Tailored digital solutions designed to accelerate growth and
                streamline operations.
              </p>
            </div>
          </div>
          <AnimatePresence>
            <motion.div className="flex flex-wrap w-full items-center gap-6 sm:justify-between justify-center">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.4 }}
                  exit={{ opacity: 0, y: 50 }}
                >
                  <ServiceCard
                    key={service.title}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
              className="gap-20 sm:gap-0 mt-20 backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 py-20 sm:py-6 p-6 transition-all duration-300 hover:border-theme/50 hover:bg-theme/5"
            >
              {subservices.map((subservice) => (
                <div
                  key={subservice.title}
                  className="sm:border-r last:border-none"
                >
                  <div className="flex flex-col  justify-center items-center ">
                    <h1
                      className="text-xl uppercase text-theme font-Gabarito"
                      style={{ fontWeight: 500, fontSize: "2.5rem" }}
                    >
                      {subservice.title}
                    </h1>
                    <span className="text-sm -mt-1 font-light uppercase text-white/50">
                      {subservice.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <section className=" h-fit pb-60 w-full overflow-hidden sticky">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className=" h-fit pt-50 flex-col-reverse sm:flex-row md:items-center gap-10 sm:justify-between px-10 sm:px-20 flex justify-center max-h-screen max-w-full"
          >
            <AnimatePresence>
              <motion.div className="flex flex-col w-full h-fit sm:gap-10 items-center gap-4 sm:justify-start justify-center max-w-200 max-h-150">
                <motion.div className="flex flex-col gap-4 items-start w-full h-full">
                  <Capsule className="" text="Platform spotlight" />
                  <h2 className="text-2xl font-bold text-white">
                    E-Commerce Reimagined
                  </h2>
                  <p className="text-[#9CA3AF] tracking-widest text-sm max-w-125">
                    From inventory management to secure checkout flows, our
                    E-Commerce solutions handle millions of transactions with
                    zero latency.
                  </p>
                  <ul className="text-sm mt-5">
                    <li className="flex items-center gap-2 my-2">
                      <span className="text-theme">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.1669 8.33351C18.5474 10.2013 18.2762 12.143 17.3984 13.835C16.5206 15.527 15.0893 16.8669 13.3431 17.6313C11.597 18.3957 9.64154 18.5383 7.80293 18.0355C5.96433 17.5326 4.35368 16.4147 3.23958 14.868C2.12548 13.3214 1.57529 11.4395 1.68074 9.53633C1.78619 7.63312 2.54092 5.82358 3.81906 4.40948C5.0972 2.99538 6.8215 2.0622 8.7044 1.76555C10.5873 1.4689 12.515 1.82672 14.166 2.77934M7.49967 9.16644L9.99967 11.6664L18.333 3.33311"
                            stroke="#22D3EE"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      </span>
                      Headless Commerce Architecture
                    </li>
                    <li className="flex items-center gap-2 my-2">
                      <span className="text-theme">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.1669 8.33351C18.5474 10.2013 18.2762 12.143 17.3984 13.835C16.5206 15.527 15.0893 16.8669 13.3431 17.6313C11.597 18.3957 9.64154 18.5383 7.80293 18.0355C5.96433 17.5326 4.35368 16.4147 3.23958 14.868C2.12548 13.3214 1.57529 11.4395 1.68074 9.53633C1.78619 7.63312 2.54092 5.82358 3.81906 4.40948C5.0972 2.99538 6.8215 2.0622 8.7044 1.76555C10.5873 1.4689 12.515 1.82672 14.166 2.77934M7.49967 9.16644L9.99967 11.6664L18.333 3.33311"
                            stroke="#22D3EE"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      </span>
                      Global CDN Distribution
                    </li>
                    <li className="flex items-center gap-2 my-2">
                      <span className="text-theme">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.1669 8.33351C18.5474 10.2013 18.2762 12.143 17.3984 13.835C16.5206 15.527 15.0893 16.8669 13.3431 17.6313C11.597 18.3957 9.64154 18.5383 7.80293 18.0355C5.96433 17.5326 4.35368 16.4147 3.23958 14.868C2.12548 13.3214 1.57529 11.4395 1.68074 9.53633C1.78619 7.63312 2.54092 5.82358 3.81906 4.40948C5.0972 2.99538 6.8215 2.0622 8.7044 1.76555C10.5873 1.4689 12.515 1.82672 14.166 2.77934M7.49967 9.16644L9.99967 11.6664L18.333 3.33311"
                            stroke="#22D3EE"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      </span>
                      Secure Multi-currency Ledger
                    </li>
                    <li className="flex items-center gap-2 my-2">
                      <span className="text-theme">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.1669 8.33351C18.5474 10.2013 18.2762 12.143 17.3984 13.835C16.5206 15.527 15.0893 16.8669 13.3431 17.6313C11.597 18.3957 9.64154 18.5383 7.80293 18.0355C5.96433 17.5326 4.35368 16.4147 3.23958 14.868C2.12548 13.3214 1.57529 11.4395 1.68074 9.53633C1.78619 7.63312 2.54092 5.82358 3.81906 4.40948C5.0972 2.99538 6.8215 2.0622 8.7044 1.76555C10.5873 1.4689 12.515 1.82672 14.166 2.77934M7.49967 9.16644L9.99967 11.6664L18.333 3.33311"
                            stroke="#22D3EE"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      </span>
                      Real-time Inventory Sync
                    </li>
                  </ul>
                  <Button
                    className="mt-5"
                    text="Start Your Journey"
                    varient="default"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative w-full h-fit drop-shadow-[0px_0px_150px] drop-shadow-theme/50 rounded-2xl overflow-hidden flex justify-center items-center p-0.5"
                style={{ maxWidth: "800px" }}
              >
                <motion.div
                  className="pointer-events-none absolute inset-[-300%]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, transparent 260deg, #22D3EE 300deg, #A855F7 330deg, transparent 360deg)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-bg flex justify-center items-center">
                  <span>
                    <motion.img
                      src="/wallet.png"
                      alt="System Integrations"
                      className="w-full h-full "
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.0003 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                      exit={{ opacity: 0, scale: -1.2 }}
                    />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="flex flex-col gap-10 px-10 sm:px-20">
          <div>
            <div className="sticky top-0 flex h-screen items-end pb-[10vh] justify-center">
              <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 ">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col h-fit gap-4 items-center "
                  style={{ top: "5vh", overflow: "hidden" }}
                >
                  <Capsule
                    className=""
                    text="Your Future | Our Responsibility"
                  />
                  <h2 className="text-center sm:text-left text-2xl font-bold text-white">
                    Start Your Digital Transformation Today
                  </h2>
                  <p className="text-[#9CA3AF] tracking-widest text-sm max-w-125 sm:text-center">
                    From custom web development to enterprise-level software
                    integrations, we provide end-to-end solutions for businesses
                    of all sizes.
                  </p>
                </motion.div>
                <div className="flex w-full items-center justify-center gap-6">
                  <button
                    onClick={() =>
                      setActiveStep((current) => Math.max(0, current - 1))
                    }
                    disabled={activeStep === 0}
                    aria-label="Previous step"
                    className="md:flex hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:border-theme/50 hover:text-theme disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <div className="relative flex min-h-[60vh] w-full flex-1 items-end justify-center overflow-hidden rounded-xl  p-8">
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      {steps.map((step, index) => (
                        <iframe
                          key={step.title}
                          className="absolute h-100 mx-auto mb-35 w-full transition-opacity duration-500"
                          style={{
                            opacity: index === activeStep ? 1 : 0,
                          }}
                          loading="eager"
                          src={step.animation}
                        />
                      ))}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5 }}
                        className="flex w-full flex-col items-center gap-1 text-center"
                      >
                        <span className="ghost-text">
                          {String(activeStep + 1).padStart(2, "0")} /{" "}
                          {String(steps.length).padStart(2, "0")}
                        </span>
                        <h3 className="text-3xl font-semibold text-white">
                          {steps[activeStep].title}
                        </h3>
                        <p className="max-w-md text-sm text-[#9CA3AF]">
                          {steps[activeStep].description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() =>
                      setActiveStep((current) =>
                        Math.min(steps.length - 1, current + 1),
                      )
                    }
                    disabled={activeStep === steps.length - 1}
                    aria-label="Next step"
                    className="md:flex hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:border-theme/50 hover:text-theme disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>

                <div className="relative h-3 w-full max-w-md">
                  <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/10" />
                  <motion.div
                    className="absolute left-0 top-1/2 h-1 -translate-y-1/2 origin-left rounded-full bg-theme"
                    animate={{
                      width: `${(activeStep / (steps.length - 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  {steps.map((step, index) => (
                    <button
                      key={step.title}
                      onClick={() => setActiveStep(index)}
                      aria-label={`Go to ${step.title}`}
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${(index / (steps.length - 1)) * 100}%`,
                      }}
                    >
                      <span
                        className={
                          "block h-3 w-3 rounded-full border-2 transition-colors duration-300 " +
                          (index <= activeStep
                            ? "border-theme bg-theme"
                            : "border-white/20 bg-bg")
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section
        id="contact"
        className="flex flex-col gap-10 px-10 py-20 sm:px-20"
      >
        <div className="flex flex-col items-center gap-4">
          <Capsule className="" text="Let's Build Together" />
          <h2 className="text-center text-2xl font-bold text-white sm:text-left">
            Ready to Elevate Your Business?
          </h2>
          <p className="max-w-125 text-sm tracking-widest text-[#9CA3AF] sm:text-center">
            Contact us today to discuss your project and discover how our
            expertise can help you achieve your goals.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 rounded-2xl border border-white/10 bg-white/5 p-8 sm:flex-row sm:p-10">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/favicon.svg"
                alt="CloudEnd Solutions logo"
                className="h-10 w-10"
              />
              <span className="text-lg font-semibold text-white">
                CloudEnd Solutions
              </span>
            </div>
            <ul className="flex flex-col gap-4 text-sm text-[#9CA3AF]">
              <li className="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 shrink-0 text-theme"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                23/10 Sri Rewatha Mawatha, Galle 8000, Sri Lanka
              </li>
              <li className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 shrink-0 text-theme"
                >
                  <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.163 21 3 14.837 3 7a2 2 0 0 1 2-2Z" />
                </svg>
                +94 71 378 9640
              </li>
            </ul>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="flex flex-1 flex-col gap-4"
          >
            <label className="flex flex-col gap-2 text-sm text-white">
              Email address
              <input
                type="email"
                required
                onChange={(event) => setContactEmail(event.target.value)}
                placeholder="you@company.com"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/30 focus:border-theme/50"
              />
            </label>
            <Button
              text={contactSubmitted ? "Request Sent" : "Send Request"}
              varient="default"
              className="w-full"
            />
            <p className="text-xs text-[#9CA3AF]">
              We will get in touch with you as soon as possible.
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 px-10 py-10 sm:px-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex max-w-70 flex-col gap-3">
            <div className="flex items-center gap-2">
              <img
                src="/favicon.svg"
                alt="CloudEnd Solutions logo"
                className="h-8 w-8"
              />
              <span className="font-semibold text-white">
                CloudEnd Solutions
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF]">
              Engineering the future with smart IT solutions for growing
              businesses.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="ghost-text">Services</span>
            {services.map((service) => (
              <a
                key={service.title}
                href="#services"
                className="text-sm text-[#9CA3AF] transition-colors duration-300 hover:text-theme"
              >
                {service.title}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="ghost-text">Company</span>
            <a
              href="#home"
              className="text-sm text-[#9CA3AF] transition-colors duration-300 hover:text-theme"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-sm text-[#9CA3AF] transition-colors duration-300 hover:text-theme"
            >
              Contact
            </a>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-white/30">
          © {new Date().getFullYear()} CloudEnd Solutions. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App;
