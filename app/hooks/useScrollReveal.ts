import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Returns motion props for a scroll-reveal animation.
 * Guarantees visibility even if IntersectionObserver doesn't fire (e.g. mobile quirks).
 * After a 1.5s safety timeout, forces the element visible regardless.
 */
export function useScrollReveal(delay = 0) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce) { setVisible(true); return; }

    // Safety net: if observer never fires, show content after 1.5s
    const fallback = setTimeout(() => setVisible(true), 1500);

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => { clearTimeout(fallback); observer.disconnect(); };
  }, [reduce]);

  if (reduce) return { ref, style: {} as React.CSSProperties };

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    } as React.CSSProperties,
  };
}
