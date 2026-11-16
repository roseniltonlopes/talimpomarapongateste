"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/** Registro único dos plugins. Importe GSAP sempre daqui. */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  /* saída longa e macia, a curva "Apple" */
  CustomEase.create("apple", "0.16,1,0.3,1");
  /* gota caindo: desce rápido e assenta com um quique curto */
  CustomEase.create("drop", "M0,0 C0.18,0.7 0.3,1.06 0.55,1.02 0.75,0.99 0.88,1 1,1");
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: "power3.out" });
}

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };
