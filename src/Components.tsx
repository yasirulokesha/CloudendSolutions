import { motion } from "motion/react";
import { useEffect, useRef } from "react";

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
        "capsule uppercase text-sm font-light text-[#22D3EE]" + " " + className
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
