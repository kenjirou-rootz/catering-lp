import { clsx } from "clsx";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        align === "center" && "text-center",
        "mb-12 md:mb-16",
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-brand-dark">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-brand-muted font-light max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
