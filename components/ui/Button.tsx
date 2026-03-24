"use client";

import { clsx } from "clsx";
import { m, useReducedMotion } from "framer-motion";
import { SPRING_CTA } from "@/lib/animation";

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
  const prefersReducedMotion = useReducedMotion();

  const baseStyles =
    "inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wider uppercase rounded-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-terra focus:ring-offset-2 transition-colors duration-300";

  const variants = {
    primary:
      "bg-terra text-white hover:bg-terra-hover",
    outline:
      "border-2 border-dark text-dark hover:bg-dark hover:text-cream-50",
  };

  const styles = clsx(
    baseStyles,
    variants[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
        transition: SPRING_CTA,
      };

  if (href) {
    return (
      <m.a href={href} className={styles} {...motionProps}>
        {children}
      </m.a>
    );
  }

  return (
    <m.button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </m.button>
  );
}
