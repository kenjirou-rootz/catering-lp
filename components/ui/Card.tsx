import { clsx } from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  overlay?: boolean;
};

export function Card({ children, className, overlay }: CardProps) {
  return (
    <div
      className={clsx(
        "overflow-hidden bg-white border border-cream-300 hover:border-terra transition-colors duration-300",
        overlay && "relative",
        className
      )}
    >
      {children}
    </div>
  );
}
