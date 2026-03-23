"use client";

import { clsx } from "clsx";
import { TextReveal } from "./TextReveal";
import { ScrollReveal } from "./ScrollReveal";

type AnimatedSectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function AnimatedSectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: AnimatedSectionHeadingProps) {
  return (
    <div
      className={clsx(
        align === "center" && "text-center",
        "mb-12 md:mb-16",
        className
      )}
    >
      <TextReveal
        as="h2"
        className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-brand-dark"
      >
        {title}
      </TextReveal>
      {subtitle && (
        <ScrollReveal delay={0.3}>
          <p className="mt-4 text-base md:text-lg text-brand-muted font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
