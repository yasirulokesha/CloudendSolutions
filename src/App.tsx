import "./App.css";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Button, Capsule } from "./Components";

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <span
        className="w-250 h-250 max-w-full -z-100 rounded-full absolute left-1/2 -translate-x-1/2 -top-1/4 "
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(34, 211, 238, 0.101961) 0%, rgba(168, 85, 247, 0.02) 60%, rgba(9, 9, 11, 0) 100%)",
          filter: "blur(100px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:items-center justify-center h-screen"
      >
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

      <motion.div className="flex flex-col items-center justify-center h-screen">
        <h1>Powering Your Business</h1>
        <h1>
          with{" "}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 2 }}
            className="text-[#22D3EE]"
          >
            Smart IT Solutions
          </motion.span>{" "}
        </h1>
      </motion.div>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "var(--color-theme)",
          transformOrigin: "0%",
        }}
      />
    </>
  );
}

export default App;
