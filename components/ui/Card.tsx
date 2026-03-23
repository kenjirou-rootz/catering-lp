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
        "rounded-lg overflow-hidden bg-white shadow-sm",
        overlay && "relative",
        className
      )}
    >
      {children}
    </div>
  );
}
