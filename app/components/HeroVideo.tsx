"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    if (reduce) return;

    // Force browser to decode frames so seeking works
    const forceLoad = () => {
      video.play().then(() => {
        video.pause();
        video.currentTime = 0;
      }).catch(() => {});
    };

    if (video.readyState >= 3) {
      forceLoad();
    } else {
      video.addEventListener("canplay", forceLoad, { once: true });
    }

    const ctx = gsap.context(() => {
      // Wait for video metadata to know duration
      const setup = () => {
        const duration = video.duration || 10;
        const scrollDist = Math.floor(duration * 200);

        ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          end: `+=${scrollDist}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            video.currentTime = duration * self.progress;
            // Fade out text as video progresses past 30%
            if (textRef.current) {
              const opacity = Math.max(0, 1 - self.progress * 3);
              textRef.current.style.opacity = String(opacity);
            }
          },
        });
      };

      if (video.readyState >= 1) {
        setup();
      } else {
        video.addEventListener("loadedmetadata", setup, { once: true });
      }
    }, wrap);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={wrapRef} className="relative" style={{ minHeight: "100dvh" }}>
      {/* Video */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        preload="auto"
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Dark scrim for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Hero text */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ minHeight: "100dvh", paddingTop: "64px" }}
      >
        <div className="text-center px-6 max-w-4xl mx-auto">
          <p
            className="text-sm font-semibold uppercase mb-6"
            style={{
              fontFamily: "var(--font-be-vietnam)",
              color: "var(--color-green)",
              letterSpacing: "0.18em",
            }}
          >
            Colonia del Valle · CDMX
          </p>
          <h1
            className="text-white mb-6"
            style={{
              fontFamily: "var(--font-literata)",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            Descubre Nuestro<br />Sabor Único.
          </h1>
          <p
            className="text-white/90 font-semibold uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-be-vietnam)",
              fontSize: "clamp(0.7rem, 1.5vw, 0.875rem)",
              letterSpacing: "0.22em",
            }}
          >
            Deléitate con nuestras creaciones
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#menu"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 active:scale-[0.98]"
              style={{
                fontFamily: "var(--font-be-vietnam)",
                fontSize: "0.875rem",
                background: "var(--color-green-deep)",
                minHeight: "44px",
              }}
            >
              Ver Menú
            </a>
            <a
              href="#nosotros"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-[0.98]"
              style={{
                fontFamily: "var(--font-be-vietnam)",
                fontSize: "0.875rem",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "#ffffff",
                minHeight: "44px",
              }}
            >
              Nuestra Historia
            </a>
          </div>
        </div>

        {/* Scroll indicator — purely decorative, no label per skill rules */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
          style={{ opacity: 0.7 }}
        >
          <div
            className="w-px h-12 mx-auto"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
