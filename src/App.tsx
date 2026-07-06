import "./App.css";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { Button, Capsule, ServiceCard } from "./Components";
import { useRef } from "react";

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

function App() {
  const targetref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const smoothY = useTransform(smoothProgress, [0, 1], [-200, 200]);
  const smoothOpacity = useTransform(
    smoothProgress,
    [0, 0.4, 0.5, 0.9, 1],
    [1, 1, 0.5, 0, 0],
  );

  const y = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.8],
    [1, 1, 0.8, 0],
  );
  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <>
      <section ref={targetref}>
        <div
          style={{ position: "sticky", top: 0, overflow: "hidden" }}
          className="px-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            style={{ y, opacity, scale }}
            className="flex flex-col md:items-center justify-center h-screen sticky"
            exit={{ opacity: 0 }}
          >
            <span
              className="w-250 h-250 max-w-full -z-100 rounded-full absolute left-1/2 -translate-x-1/2 -top-1/4  "
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(34, 211, 238, 0.101961) 0%, rgba(168, 85, 247, 0.02) 60%, rgba(9, 9, 11, 0) 100%)",
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
                className="text-[#22D3EE]"
              >
                Smart IT Solutions
              </motion.span>{" "}
            </h1>
            <p className="md:text-center mt-4 text-[#9CA3AF]  max-w-[500px]">
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
          style={{ top: 0, overflow: "hidden" }}
          className="flex gap-5  bg-bg/50 backdrop-blur-2xl flex-col container h-fit w-full"
        >
          <div className="mx-auto flex-col sm:flex-row  flex w-full justify-between sm:items-end h-fit">
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
              <p className="text-[#9CA3AF] max-w-[300px] sm:text-right w-fit">
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
              className=" mt-20 backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-theme/50 hover:bg-theme/5"
            >
              {subservices.map((subservice) => (
                <div
                  key={subservice.title}
                  className="sm:border-r last:border-none"
                >
                  <div className="flex flex-col  justify-center items-center ">
                    <h1
                      className="text-xl uppercase text-theme font-Gabarito"
                      style={{ fontWeight: 500, fontSize: "3rem" }}
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
        <section className="h-screen bg-bg ">
          <motion.div className="flex sm:py-20 gap-10 sm:gap-0 flex-col sm:flex-row-reverse w-full sm:h-screen h-fit sm:justify-between justify-start sm:px-40 px-10 items-center">
            <div
              className="relative w-full h-fit"
              style={{ maxWidth: "500px", aspectRatio: "600 / 460" }}
            >
              <motion.img
                src="/system_integrations.svg"
                alt="System Integrations"
                className="w-full h-full drop-shadow-[0px_0px_150px] drop-shadow-theme/50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, y: -50 }}
              />

              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="group absolute"
                  style={{
                    left: "66%",
                    width: "30%",
                    height: "5.22%",
                    top: `${15.65 + index * 7.83}%`,
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="relative h-full w-full cursor-pointer rounded border border-transparent transition-colors duration-300 group-hover:border-theme/50 group-hover:bg-theme/15">
                    <span className="absolute left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-theme animate-pulse" />

                    <div className="pointer-events-none absolute right-full top-1/2 mr-3 w-56 -translate-y-1/2 scale-95 rounded-xl border border-theme/30 bg-bg/90 p-3 opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <div className="flex items-center gap-2 text-theme">
                        {service.icon}
                        <h3 className="text-sm font-semibold text-white">
                          {service.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs text-[#9CA3AF]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col w-full max-w-[800px] h-full justify-center items-start gap-4">
              <Capsule className="mb-4 " text="Platform Spotlights" />
              <h2>E-Commerce Reimagined</h2>
            </div>
          </motion.div>
        </section>
      </section>
    </>
  );
}

export default App;
