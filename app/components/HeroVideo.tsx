"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 60;          // fewer frames = less memory, still smooth
const MAX_CAPTURE_WIDTH = 1280;  // cap resolution so mobile doesn't explode

export default function HeroVideo() {
  const wrapRef     = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const framesRef   = useRef<ImageBitmap[]>([]);
  const [ready, setReady]     = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotion();

  // Detect mobile once (client-only)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // ── Step 1: extract frames (desktop only) ──────────────────────────────────
  useEffect(() => {
    // On mobile or reduced-motion: skip extraction, go straight to ready
    if (isMobile || reduce) { setReady(true); return; }

    let cancelled = false;
    const video = document.createElement("video");
    video.src = "/hero-video.mp4";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";

    const extract = async () => {
      const duration = video.duration;
      // Scale capture size down so we don't blow mobile RAM
      const scale = Math.min(1, MAX_CAPTURE_WIDTH / video.videoWidth);
      const w = Math.round(video.videoWidth  * scale);
      const h = Math.round(video.videoHeight * scale);

      const frames: ImageBitmap[] = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        video.currentTime = (i / (FRAME_COUNT - 1)) * duration;
        await new Promise<void>((res) => {
          video.addEventListener("seeked", () => res(), { once: true });
        });
        if (cancelled) return;
        const bitmap = await createImageBitmap(video, { resizeWidth: w, resizeHeight: h });
        frames.push(bitmap);
      }
      if (cancelled) return;
      framesRef.current = frames;
      setReady(true);
    };

    if (video.readyState >= 1) {
      extract();
    } else {
      video.addEventListener("loadedmetadata", extract, { once: true });
    }

    return () => {
      cancelled = true;
      video.src = "";
    };
  }, [isMobile, reduce]);

  // ── Step 2: set up canvas + ScrollTrigger once ready ──────────────────────
  useEffect(() => {
    if (!ready || isMobile || reduce) return;
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    const frames = framesRef.current;
    let currentIdx = 0;

    // object-fit: cover — scale to fill, crop to center
    const draw = (index: number) => {
      if (!frames.length) return;
      currentIdx = index;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const frame = frames[Math.min(index, frames.length - 1)];
      const sw = frame.width, sh = frame.height;
      const dw = canvas.width,  dh = canvas.height;
      const scale = Math.max(dw / sw, dh / sh);
      const x = (dw - sw * scale) / 2;
      const y = (dh - sh * scale) / 2;
      ctx.drawImage(frame, x, y, sw * scale, sh * scale);
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(currentIdx);
    };

    resize();
    window.addEventListener("resize", resize);

    const scrollDist = window.innerHeight * 6;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: `+=${scrollDist}`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          draw(Math.floor(self.progress * (FRAME_COUNT - 1)));
          if (textRef.current) {
            textRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 4));
          }
        },
      });
    }, wrap);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", resize);
    };
  }, [ready, isMobile, reduce]);

  // On mobile we simply show autoplay video — no pin, no canvas
  if (isMobile) {
    return (
      <div className="relative" style={{ minHeight: "100dvh" }}>
        <video
          src="/hero-video.mp4"
          autoPlay muted playsInline loop
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <HeroText textRef={null} />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative" style={{ minHeight: "100dvh" }}>
      {/* Canvas (desktop) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ display: "block", width: "100%", height: "100%" }}
        aria-hidden="true"
      />

      {/* Video plays while frames are being extracted */}
      {!ready && (
        <video
          src="/hero-video.mp4"
          autoPlay muted playsInline loop
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <HeroText textRef={textRef} />
    </div>
  );
}

// ── Shared hero text (used by both mobile & desktop) ─────────────────────────
function HeroText({ textRef }: { textRef: React.RefObject<HTMLDivElement | null> | null }) {
  return (
    <div
      ref={textRef ?? undefined}
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
          className="text-white/90 font-semibold uppercase"
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
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
        style={{ opacity: 0.7 }}
      >
        <div
          className="w-px h-12 mx-auto"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)" }}
        />
      </div>
    </div>
  );
}
