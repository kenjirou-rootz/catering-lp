"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      )}
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
            <span className="text-xl font-serif font-semibold text-brand-dark">
              Kitao
            </span>
          )}
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 text-sm font-medium text-white bg-brand-orange rounded hover:bg-brand-orange-hover transition-colors cursor-pointer"
          >
            お問い合わせ
          </a>
        </nav>

        <button
          className="lg:hidden p-2 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-beige-200 shadow-lg">
          <nav className="container-site py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-2 text-base text-brand-muted hover:text-brand-dark transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 py-3 text-center text-white bg-brand-orange rounded hover:bg-brand-orange-hover transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              お問い合わせ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
