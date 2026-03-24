import { clsx } from "clsx";

type SectionHeadingProps = {
  title: string;
  titleJa?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  decorative?: boolean;
};

export function SectionHeading({
  title,
  titleJa,
  subtitle,
  align = "center",
  className,
  decorative = true,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        align === "center" && "text-center",
        "mb-12 md:mb-16",
        className
      )}
    >
      {decorative ? (
        <div
          className={clsx(
            "w-12 h-[1px] bg-terra mb-6",
            align === "center" && "mx-auto"
          )}
        />
      ) : null}
      <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-light leading-editorial tracking-heading text-terra">
        {title}
      </h2>
      {titleJa ? (
        <>
          <div
            className={clsx(
              "w-8 h-[1px] bg-dark-subtle/40 mt-5 mb-4",
              align === "center" && "mx-auto"
            )}
          />
          <p className="text-sm md:text-base font-serif-ja text-dark-muted leading-relaxed">
            {titleJa}
          </p>
        </>
      ) : null}
      {subtitle ? (
        <p className="mt-4 subtitle-editorial max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
