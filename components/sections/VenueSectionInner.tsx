"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EASE_EDITORIAL, DURATION } from "@/lib/animation";

/* ─── Types ─── */
type VenueCard = {
  category: string;
  title: string;
  description?: string;
  image: any; // Sanity image object — typed loosely to match urlFor() input
};

type VenueData = {
  cards?: VenueCard[];
};

type SectionHeading = { en: string; ja: string };

/* ─── Constants ─── */
const SWIPE_THRESHOLD = 50;
const CARD_PEEK_MOBILE = 0.82;
const CARD_PEEK_TABLET = 0.42;
const GAP = 20;
const SPRING_EXPAND = { type: "spring" as const, stiffness: 200, damping: 30 };
const BREAKPOINT_MD = 768;
const BREAKPOINT_LG = 1024;

/* ─── Main component ─── */
export function VenueSectionInner({
  data,
  heading,
}: {
  data: VenueData;
  heading: SectionHeading;
}) {
  const cards = data.cards || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [viewMode, setViewMode] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const prefersReducedMotion = useReducedMotion();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  /* Measure container & determine view mode */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      setContainerWidth(w);
      if (w < BREAKPOINT_MD) setViewMode("mobile");
      else if (w < BREAKPOINT_LG) setViewMode("tablet");
      else setViewMode("desktop");
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Body scroll lock when expanded */
  useEffect(() => {
    if (expandedIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [expandedIndex]);

  /* Close handler — declared before the useEffect that references it */
  const closeExpanded = useCallback(() => {
    setExpandedIndex(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  /* Keyboard: Escape to close */
  useEffect(() => {
    if (expandedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeExpanded();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [expandedIndex, closeExpanded]);

  const openExpanded = useCallback(
    (index: number, buttonEl: HTMLButtonElement) => {
      triggerRef.current = buttonEl;
      setExpandedIndex(index);
    },
    []
  );

  const goNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, cards.length - 1));
  }, [cards.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  /* Carousel calculations */
  const isCarousel = viewMode !== "desktop";
  const cardPct =
    viewMode === "mobile" ? CARD_PEEK_MOBILE : CARD_PEEK_TABLET;
  const cardWidth = isCarousel
    ? containerWidth * cardPct
    : (containerWidth - GAP * 2) / 3;
  const padLeft = isCarousel ? (containerWidth - cardWidth) / 2 : 0;
  /* Center active card: padLeft offsets the first card to center, then shift by index */
  const offsetX = isCarousel
    ? padLeft - activeIndex * (cardWidth + GAP)
    : 0;

  const motionTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: DURATION.SLOWER, ease: EASE_EDITORIAL };

  return (
    <section className="section-padding bg-cream-200 overflow-hidden">
      <div className="container-site">
        <AnimatedSectionHeading
          title={heading.en}
          titleJa={heading.ja}
          subtitle="会場の手配もお任せください"
        />
      </div>

      {/* ── Cards Area ── */}
      <ScrollReveal delay={0.2}>
        <div
          ref={wrapperRef}
          className="relative w-full overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="会場カルーセル"
        >
          {/* Carousel Track / Desktop Grid */}
          {isCarousel ? (
            <div
              className="touch-pan-y select-none"
              onPointerDown={(e) => {
                dragRef.current = e.clientX;
                e.currentTarget.setPointerCapture(e.pointerId);
              }}
              onPointerUp={(e) => {
                const dx = e.clientX - dragRef.current;
                if (Math.abs(dx) > SWIPE_THRESHOLD) {
                  if (dx < 0) goNext();
                  else goPrev();
                }
                dragRef.current = 0;
              }}
            >
              <m.div
                className="flex will-change-transform"
                style={{ gap: GAP }}
                animate={{ x: offsetX }}
                transition={motionTransition}
              >
                {cards.map((card, i) => (
                  <CarouselCard
                    key={card.title}
                    card={card}
                    index={i}
                    isActive={i === activeIndex}
                    cardWidth={cardWidth}
                    isCarousel
                    prefersReducedMotion={!!prefersReducedMotion}
                    onExpand={openExpanded}
                    expandedIndex={expandedIndex}
                  />
                ))}
              </m.div>
            </div>
          ) : (
            <div
              className="container-site grid grid-cols-3"
              style={{ gap: GAP }}
            >
              {cards.map((card, i) => (
                <CarouselCard
                  key={card.title}
                  card={card}
                  index={i}
                  isActive
                  cardWidth={cardWidth}
                  isCarousel={false}
                  prefersReducedMotion={!!prefersReducedMotion}
                  onExpand={openExpanded}
                  expandedIndex={expandedIndex}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dot navigation (carousel mode only) */}
        {isCarousel && cards.length > 1 ? (
          <div className="flex justify-center gap-1.5 mt-6">
            {cards.map((card, i) => (
              <button
                key={card.title}
                onClick={() => setActiveIndex(i)}
                aria-label={`会場 ${i + 1}`}
                className={`h-2.5 rounded-full border-none cursor-pointer transition-all duration-400 ${
                  i === activeIndex
                    ? "w-4 bg-terra"
                    : "w-2.5 bg-dark-subtle/40 hover:bg-dark-subtle/60"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            ))}
          </div>
        ) : null}
      </ScrollReveal>

      {/* ── Expanded Modal ── */}
      <AnimatePresence>
        {expandedIndex !== null && cards[expandedIndex] ? (
          <ExpandedCard
            card={cards[expandedIndex]}
            index={expandedIndex}
            onClose={closeExpanded}
            prefersReducedMotion={!!prefersReducedMotion}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

/* ─── Card Component ─── */
function CarouselCard({
  card,
  index,
  isActive,
  cardWidth,
  isCarousel,
  prefersReducedMotion,
  onExpand,
  expandedIndex,
}: {
  card: VenueCard;
  index: number;
  isActive: boolean;
  cardWidth: number;
  isCarousel: boolean;
  prefersReducedMotion: boolean;
  onExpand: (index: number, el: HTMLButtonElement) => void;
  expandedIndex: number | null;
}) {
  const isHidden = expandedIndex === index;

  return (
    <m.div
      className={isCarousel ? "shrink-0" : ""}
      style={isCarousel ? { width: cardWidth } : undefined}
      animate={
        isCarousel
          ? {
              scale: isActive ? 1 : 0.95,
              opacity: isActive ? 1 : 0.5,
            }
          : undefined
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: DURATION.SLOW, ease: EASE_EDITORIAL }
      }
      role="group"
      aria-roledescription="slide"
      aria-label={card.title}
    >
      <m.button
        layoutId={`venue-card-${index}`}
        className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer text-left block focus:outline-none focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-2 ${
          isHidden ? "invisible" : ""
        }`}
        whileHover={
          prefersReducedMotion
            ? undefined
            : { scale: 1.02, y: -4 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: DURATION.FAST }
        }
        onClick={(e) => onExpand(index, e.currentTarget)}
        aria-haspopup="dialog"
      >
        {/* Image */}
        <Image
          src={urlFor(card.image).width(1200).quality(85).url()}
          alt={card.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 82vw, (max-width: 1024px) 42vw, 400px"
          priority={index === 0}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent pointer-events-none" />

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-serif-ja font-light text-white tracking-heading leading-tight mb-2">
            {card.category}
          </h3>
          <span className="text-xs uppercase tracking-editorial text-white/70 font-serif-ja">
            {card.title}
          </span>
        </div>
      </m.button>
    </m.div>
  );
}

/* ─── Expanded Card Modal ─── */
function ExpandedCard({
  card,
  index,
  onClose,
  prefersReducedMotion,
}: {
  card: VenueCard;
  index: number;
  onClose: () => void;
  prefersReducedMotion: boolean;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headingId = `venue-expanded-title-${index}`;

  /* Focus close button on mount */
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  /* Focus trap: keep Tab within the modal */
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Click outside to close */
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  return (
    <m.div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ backgroundColor: "rgba(28, 25, 23, 0)" }}
      animate={{ backgroundColor: "rgba(28, 25, 23, 0.6)" }}
      exit={{ backgroundColor: "rgba(28, 25, 23, 0)" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: DURATION.DEFAULT }
      }
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <m.div
        layoutId={`venue-card-${index}`}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-cream-50"
        transition={
          prefersReducedMotion ? { duration: 0 } : SPRING_EXPAND
        }
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-dark/40 backdrop-blur-sm text-white hover:bg-dark/60 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-terra"
          aria-label="閉じる"
        >
          <X className="size-5" />
        </button>

        {/* Expanded image */}
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={urlFor(card.image).width(2400).quality(85).url()}
            alt={card.title}
            fill
            className="object-cover rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          {/* Gradient fade into content */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream-50 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="px-6 md:px-10 pb-8 md:pb-10 -mt-8 relative z-10">
          <h3
            id={headingId}
            className="text-3xl md:text-4xl font-serif-ja font-light text-dark tracking-heading leading-tight mb-2"
          >
            {card.category}
          </h3>
          <span className="text-xs uppercase tracking-editorial text-terra font-serif-ja mb-4 block">
            {card.title}
          </span>
          {card.description ? (
            <p className="text-base md:text-lg leading-reading text-dark-muted font-serif-ja whitespace-pre-line">
              {card.description}
            </p>
          ) : null}
        </div>
      </m.div>
    </m.div>
  );
}
