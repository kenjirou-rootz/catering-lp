import { clsx } from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2";

  const variants = {
    primary:
      "bg-brand-orange text-white hover:bg-brand-orange-hover active:scale-[0.97]",
    outline:
      "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white",
  };

  const styles = clsx(
    baseStyles,
    variants[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
