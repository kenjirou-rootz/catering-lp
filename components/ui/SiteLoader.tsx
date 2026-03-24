"use client";

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE_EDITORIAL, EASE_REVEAL } from "@/lib/animation";

const LOADER_TIMEOUT = 6000;
const LETTERS = "Kitao".split("");

export function SiteLoader() {
  const [ready, setReady] = useState(false);
  const [exit, setExit] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const triggerExit = useCallback(() => {
    if (exit) return;
    setExit(true);
    setTimeout(() => setReady(true), 900);
  }, [exit]);

  useEffect(() => {
    // Find hero video or image and wait for load
    const checkMedia = () => {
      const video = document.querySelector("section video") as HTMLVideoElement;
      if (video) {
        if (video.readyState >= 3) {
          triggerExit();
          return;
        }
        video.addEventListener("canplaythrough", triggerExit, { once: true });
        return () => video.removeEventListener("canplaythrough", triggerExit);
      }

      // Fallback: image-based hero
      const heroImg = document.querySelector("section img[priority]") as HTMLImageElement;
      if (heroImg) {
        if (heroImg.complete && heroImg.naturalWidth > 0) {
          triggerExit();
          return;
        }
        heroImg.addEventListener("load", triggerExit, { once: true });
        return () => heroImg.removeEventListener("load", triggerExit);
      }
    };

    // Small delay to let DOM render
    const raf = requestAnimationFrame(() => {
      checkMedia();
    });

    // Safety timeout
    const timeout = setTimeout(triggerExit, LOADER_TIMEOUT);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [triggerExit]);

  // Prevent scroll while loading
  useEffect(() => {
    if (!ready) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  if (ready) return null;

  if (prefersReducedMotion) {
    if (exit) return null;
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0a0908] flex items-center justify-center">
        <p className="text-white/60 text-sm font-serif-ja">読み込み中...</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {!exit ? (
        <m.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0908]"
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: EASE_EDITORIAL },
          }}
        >
          {/* Subtle grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Logo letters */}
          <div className="flex items-baseline gap-[2px]" aria-hidden="true">
            {LETTERS.map((letter, i) => (
              <m.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.1,
                  ease: EASE_REVEAL,
                }}
                className="text-5xl md:text-7xl font-serif font-light text-white/90 tracking-wider"
              >
                {letter}
              </m.span>
            ))}
          </div>

          {/* Tagline */}
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE_REVEAL }}
            className="mt-4 text-xs md:text-sm font-serif-ja text-white/40 tracking-[0.3em]"
          >
            French Chef Catering
          </m.p>

          {/* Progress line */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-white/10 overflow-hidden">
            <m.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-terra to-transparent"
            />
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
