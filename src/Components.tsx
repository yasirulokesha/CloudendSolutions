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
        " px-6 py-2 rounded-lg text-xs  transition-all duration-300" +
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
        (varient === "default" ? " bg-linear-to-l from-0% to-100% from-theme/80 to-theme/30 text-white hover:bg-theme/50 hover:outline-3  outline-theme/50 outline-offset-0" : "")
      }
    >
      {text}
    </button>
  );
};
