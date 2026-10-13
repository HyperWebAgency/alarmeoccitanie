"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1600;

// Number that counts up from 0 the first time it scrolls into view (ease-out, ~1.6s).
// The final value stays in the HTML for screen readers and Google; only the visible copy animates.
export function StatCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setShown(value));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          setShown(Math.round(value * (1 - (1 - t) ** 3)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {prefix}
        {shown}
        {suffix}
      </span>
    </>
  );
}
