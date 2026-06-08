"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);

  // Safari requires muted + playsinline as HTML attributes (not just JS props)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("loadedmetadata", tryPlay, { once: true });
    v.addEventListener("loadeddata",     tryPlay, { once: true });
    v.addEventListener("canplay",        tryPlay, { once: true });
    return () => {
      v.removeEventListener("loadedmetadata", tryPlay);
      v.removeEventListener("loadeddata",     tryPlay);
      v.removeEventListener("canplay",        tryPlay);
    };
  }, []);

  return (
    <div className="relative" style={{ minHeight: "100svh" }}>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        src="/hero-video.mp4"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.15) 50%,rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero text */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ minHeight: "100svh", paddingTop: "64px" }}
      >
        <div className="text-center px-6 max-w-4xl mx-auto">
          <p
            className="text-sm font-semibold uppercase mb-6"
            style={{ fontFamily: "var(--font-be-vietnam)", color: "var(--color-green)", letterSpacing: "0.18em" }}
          >
            Colonia del Valle · CDMX
          </p>
          <h1
            className="text-white mb-6"
            style={{ fontFamily: "var(--font-literata)", fontSize: "clamp(2.5rem,7vw,5.5rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", textWrap: "balance" }}
          >
            Descubre Nuestro<br />Sabor Único.
          </h1>
          <p
            className="text-white/90 font-semibold uppercase"
            style={{ fontFamily: "var(--font-be-vietnam)", fontSize: "clamp(0.7rem,1.5vw,0.875rem)", letterSpacing: "0.22em" }}
          >
            Deléitate con nuestras creaciones
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#menu"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200"
              style={{ fontFamily: "var(--font-be-vietnam)", fontSize: "0.875rem", background: "var(--color-green-deep)", minHeight: "44px" }}
            >
              Ver Menú
            </a>
            <a
              href="#nosotros"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              style={{ fontFamily: "var(--font-be-vietnam)", fontSize: "0.875rem", border: "1px solid rgba(255,255,255,0.6)", color: "#ffffff", minHeight: "44px" }}
            >
              Nuestra Historia
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true" style={{ opacity: 0.7 }}>
          <div className="w-px h-12 mx-auto" style={{ background: "linear-gradient(to bottom,rgba(255,255,255,0.8),transparent)" }} />
        </div>
      </div>
    </div>
  );
}
