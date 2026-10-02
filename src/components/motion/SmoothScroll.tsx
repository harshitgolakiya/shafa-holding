"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";

export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const headerOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -headerOffset },
      // The mobile menu locks body scroll while it is open.
      prevent: () => document.body.style.overflow === "hidden",
    });

    return () => lenis.destroy();
  }, [reduceMotion]);

  return null;
}
