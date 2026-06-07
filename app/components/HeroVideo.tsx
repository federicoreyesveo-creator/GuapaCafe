"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 60;

export default function HeroVideo() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const [framesReady, setFramesReady] = useState(false);

  // iOS Safari needs explicit .play() call after load
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => { v.play().catch(() => {}); };
    tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, []);

  // Desktop-only: extract frames for canvas animation
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let cancelled = false;
    const vid = document.createElement("video");
    vid.src = "/hero-video.mp4";
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "auto";

    const extract = async () => {
      const dur = vid.duration;
      const maxW = 1280;
      const scale = Math.min(1, maxW / (vid.videoWidth || 1920));
      const w = Math.round((vid.videoWidth  || 1920) * scale);
      const h = Math.round((vid.videoHeight || 1080) * scale);
      const frames: ImageBitmap[] = [];

      for (let i = 0; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        vid.currentTime = (i / (FRAME_COUNT - 1)) * dur;
        await new Promise<void>((res) =>
          vid.addEventListener("seeked", () => res(), { once: true })
        );
        if (cancelled) return;
        try { frames.push(await createImageBitmap(vid, { resizeWidth: w, resizeHeight: h })); }
        catch { return; }
      }
      if (cancelled) return;
      framesRef.current = frames;
      setFramesReady(true);
    };

    vid.readyState >= 1 ? extract() : vid.addEventListener("loadedmetadata", extract, { once: true });
    return () => { cancelled = true; vid.src = ""; };
  }, []);

  // Canvas + pin — desktop only, after frames ready
  useEffect(() => {
    if (!framesReady || !window.matchMedia("(min-width: 768px)").matches) return;
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap || !framesRef.current.length) return;

    const frames = framesRef.current;
    let idx = 0;

    const draw = (i: number) => {
      idx = i;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const f = frames[Math.min(i, frames.length - 1)];
      const sc = Math.max(canvas.width / f.width, canvas.height / f.height);
      ctx.drawImage(f, (canvas.width - f.width * sc) / 2, (canvas.height - f.height * sc) / 2, f.width * sc, f.height * sc);
    };

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; draw(idx); };
    resize();
    window.addEventListener("resize", resize);

    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: `+=${window.innerHeight * 6}`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          draw(Math.floor(self.progress * (FRAME_COUNT - 1)));
          if (textRef.current)
            textRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 4));
        },
      });
    }, wrap);

    return () => { gsapCtx.revert(); window.removeEventListener("resize", resize); };
  }, [framesReady]);

  return (
    <div ref={wrapRef} className="relative" style={{ minHeight: "100dvh" }}>
      <video
        ref={videoRef}
        autoPlay muted playsInline loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Canvas covers video on desktop once frames are ready */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 hidden md:block"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      />

      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.15) 50%,rgba(0,0,0,0.55) 100%)" }} />

      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center" style={{ minHeight: "100dvh", paddingTop: "64px" }}>
        <div className="text-center px-6 max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase mb-6" style={{ fontFamily: "var(--font-be-vietnam)", color: "var(--color-green)", letterSpacing: "0.18em" }}>
            Colonia del Valle · CDMX
          </p>
          <h1 className="text-white mb-6" style={{ fontFamily: "var(--font-literata)", fontSize: "clamp(2.5rem,7vw,5.5rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", textWrap: "balance" }}>
            Descubre Nuestro<br />Sabor Único.
          </h1>
          <p className="text-white/90 font-semibold uppercase" style={{ fontFamily: "var(--font-be-vietnam)", fontSize: "clamp(0.7rem,1.5vw,0.875rem)", letterSpacing: "0.22em" }}>
            Deléitate con nuestras creaciones
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#menu" className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200" style={{ fontFamily: "var(--font-be-vietnam)", fontSize: "0.875rem", background: "var(--color-green-deep)", minHeight: "44px" }}>
              Ver Menú
            </a>
            <a href="#nosotros" className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-200" style={{ fontFamily: "var(--font-be-vietnam)", fontSize: "0.875rem", border: "1px solid rgba(255,255,255,0.6)", color: "#ffffff", minHeight: "44px" }}>
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
