export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const MOBILE_QUERY = "(max-width: 900px)";
export const DESKTOP_QUERY = "(min-width: 901px)";
