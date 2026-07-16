import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  speed: number;
  phase: number;
  depth: number;
  color: string;
};

const STAR_COLORS = ["255, 255, 255", "34, 211, 238", "168, 85, 247"];

export const StarField = ({
  className,
  count = 160,
}: {
  className?: string;
  count?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seedStars = (width: number, height: number) => {
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.4,
        baseAlpha: Math.random() * 0.5 + 0.4,
        speed: Math.random() * 1.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.6 + 0.2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }));
    };

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars(clientWidth, clientHeight);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frameId: number;
    const maxShift = 18;

    const draw = (time: number) => {
      const { clientWidth: width, clientHeight: height } = canvas;

      smoothMouseRef.current.x +=
        (mouseRef.current.x - smoothMouseRef.current.x) * 0.05;
      smoothMouseRef.current.y +=
        (mouseRef.current.y - smoothMouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      for (const star of starsRef.current) {
        const twinkle =
          star.baseAlpha *
          (0.5 + 0.5 * Math.sin(time * 0.001 * star.speed + star.phase));
        const offsetX = smoothMouseRef.current.x * maxShift * star.depth;
        const offsetY = smoothMouseRef.current.y * maxShift * star.depth;

        ctx.beginPath();
        ctx.arc(
          star.x + offsetX,
          star.y + offsetY,
          star.radius,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(${star.color}, ${twinkle})`;
        ctx.fill();
      }

      frameId = requestAnimationFrame(draw);
    };
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={"pointer-events-none absolute inset-0 h-full w-full " + (className ?? "")}
    />
  );
};

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const Header = ({ phone }: { phone: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappNumber = phone.replace(/[^0-9]/g, "");

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#home" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="CloudEnd Solutions"
            className="h-7 w-auto sm:h-8"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#9CA3AF] transition-colors duration-300 hover:text-theme"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message us on WhatsApp"
            title="Message us on WhatsApp"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-theme/10 text-theme transition-all duration-300 hover:bg-theme/20 hover:outline-2 outline-theme/50 outline-offset-0"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.163 21 3 14.837 3 7a2 2 0 0 1 2-2Z" />
            </svg>
          </a>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition-colors duration-300 hover:border-theme/50 hover:text-theme md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-1 overflow-hidden border-t border-white/10 px-6 py-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-3 text-sm text-[#9CA3AF] transition-colors duration-300 hover:text-theme"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Capsule = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  return (
    <div
      className={
        "capsule uppercase text-sm font-light text-theme" + " " + className
      }
    >
      <div className="capsule-inner">{text}</div>
    </div>
  );
};

export const Button = ({
  text,
  className,
  onClick,
  varient,
}: {
  text: React.ReactNode;
  className?: string;
  onClick?: () => void;
  varient?: "primary" | "flat" | "outline" | "ghost" | "link" | "default";
}) => {
  return (
    <button
      onClick={onClick}
      className={
        " px-6 py-2 rounded-lg text-sm font-medium tracking-wide  transition-all duration-300" +
        " " +
        className +
        (varient === "flat"
          ? " bg-[#27272A] hover:bg-[#27272A]/50 text-white hover:outline-2 outline-1 outline-theme/50 outline-offset-0 "
          : "") +
        (varient === "outline"
          ? " bg-transparent border-2 border-theme text-theme hover:bg-theme/10 hover:outline-3  outline-theme/50 outline-offset-0"
          : "") +
        (varient === "ghost"
          ? " bg-transparent text-theme hover:bg-theme/10"
          : "") +
        (varient === "link"
          ? " bg-transparent text-theme underline hover:text-theme/50"
          : "") +
        (varient === "default"
          ? " bg-linear-to-l from-0% to-100% from-theme/80 to-theme/30 text-white hover:bg-theme/50 hover:outline-2  outline-theme/50 outline-offset-0"
          : "")
      }
    >
      {text}
    </button>
  );
};

export const ServiceCard = ({
  icon,
  title,
  description,
  className,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={
        "group shrink-0 w-65 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-theme/50 hover:bg-theme/5" +
        " " +
        (className ?? "")
      }
      style={style}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-theme/10 text-theme transition-colors duration-300 group-hover:bg-theme/20">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-[#9CA3AF]">{description}</p>
    </motion.div>
  );
};
