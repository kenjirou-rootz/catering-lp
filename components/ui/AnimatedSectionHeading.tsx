"use client";

import { clsx } from "clsx";
import { TextReveal } from "./TextReveal";
import { ScrollReveal } from "./ScrollReveal";

type AnimatedSectionHeadingProps = {
  title: string;
  titleJa?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  decorative?: boolean;
};

export function AnimatedSectionHeading({
  title,
  titleJa,
  subtitle,
  align = "center",
  className,
  decorative = true,
}: AnimatedSectionHeadingProps) {
  return (
    <div
      className={clsx(
        align === "center" && "text-center",
        "mb-12 md:mb-16",
        className
      )}
    >
      {decorative ? (
        <ScrollReveal>
          <div
            className={clsx(
              "w-12 h-[1px] bg-terra mb-6",
              align === "center" && "mx-auto"
            )}
          />
        </ScrollReveal>
      ) : null}
      <TextReveal
        as="h2"
        className="text-4xl md:text-6xl lg:text-8xl font-serif font-light leading-editorial tracking-heading text-terra"
      >
        {title}
      </TextReveal>
      {titleJa ? (
        <ScrollReveal delay={0.2}>
          <div
            className={clsx(
              "w-8 h-[1px] bg-dark-subtle/40 mt-5 mb-4",
              align === "center" && "mx-auto"
            )}
          />
          <p className="text-sm md:text-base font-serif-ja text-dark-muted leading-relaxed">
            {titleJa}
          </p>
        </ScrollReveal>
      ) : null}
      {subtitle ? (
        <ScrollReveal delay={0.3}>
          <p className="mt-4 subtitle-editorial max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>
      ) : null}
    </div>
  );
}
