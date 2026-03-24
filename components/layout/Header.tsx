"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { m, useScroll, useMotionValueEvent, useReducedMotion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { EASE_REVEAL, DURATION } from "@/lib/animation";

const navItems = [
  { label: "Kitaoとは", href: "#about" },
  { label: "実績", href: "#portfolio" },
  { label: "特長", href: "#features" },
  { label: "料金", href: "#pricing" },
  { label: "コーディネート", href: "#coordinate" },
  { label: "ご利用の流れ", href: "#flow" },
  { label: "お客様の声", href: "#testimonials" },
];

type HeaderProps = {
  logo?: { asset: { _ref: string } } | null;
};

export function Header({ logo }: HeaderProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const isAtTop = latest < 50;

    setIsScrolled(!isAtTop);

    if (isAtTop) {
      setIsHidden(false);
    } else if (latest > previous && latest > 100) {
      setIsHidden(true);
      setIsMobileMenuOpen(false);
    } else if (previous - latest > 5) {
      setIsHidden(false);
    }
  });

  return (
    <m.header
      animate={isHidden ? { y: "-100%" } : { y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: DURATION.SLOW, ease: EASE_REVEAL }
      }
      className={clsx(
        "fixed top-0 left-0 right-0 z-50",
        isScrolled
          ? "bg-cream-50/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      )}
      style={{ transition: "background-color 0.3s, padding 0.3s, box-shadow 0.3s" }}
    >
      <div className="container-site flex items-center justify-between">
        <a href="#" className="flex-shrink-0">
          {logo ? (
            <Image
              src={urlFor(logo).width(160).url()}
              alt="Kitao Catering"
              width={160}
              height={40}
              priority
            />
          ) : (
            <span className={clsx("text-xl font-serif font-semibold transition-colors", isScrolled ? "text-dark" : "text-white")}>
              Kitao
            </span>
          )}
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={clsx("text-xs tracking-wider uppercase transition-colors", isScrolled ? "text-dark-subtle hover:text-dark" : "text-white/80 hover:text-white")}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 text-xs font-medium tracking-wider uppercase text-white bg-terra hover:bg-terra-hover rounded-full transition-colors cursor-pointer"
          >
            お問い合わせ
          </a>
        </nav>

        <button
          className={clsx("lg:hidden p-2 cursor-pointer transition-colors", isScrolled ? "text-dark" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.DEFAULT, ease: EASE_REVEAL }}
            className="lg:hidden bg-cream-50 border-t border-cream-300 shadow-lg overflow-hidden"
          >
            <nav className="container-site py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-2 text-sm tracking-wider uppercase text-dark-muted hover:text-dark transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 py-3 text-center text-white bg-terra hover:bg-terra-hover transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                お問い合わせ
              </a>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
