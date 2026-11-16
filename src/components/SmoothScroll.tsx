"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

import { prefersReducedMotion } from "@/lib/motion";

/**
 * Lenis no mesmo relógio do GSAP: um ticker só para rolagem e ScrollTrigger,
 * então o scrub nunca treme. No toque fica a rolagem nativa do celular.
 */
let instance: Lenis | null = null;

export function scrollToTarget(target: string, offset = -72) {
  const el = document.querySelector<HTMLElement>(target);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.4 });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: LenisCtor }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap"),
      ]);
      if (cancelled) return;
      const lenis = new LenisCtor({ duration: 1.15 });
      instance = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        instance = null;
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
