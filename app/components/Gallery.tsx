"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const photos = [
  {
    src: "/images/food-cake.png",
    alt: "Pastel de pistacho con bebida de rosas",
  },
  {
    src: "/images/food-cocktails.png",
    alt: "Cócteles de Guapa Café",
  },
  {
    src: "/images/food-granola.png",
    alt: "Yogurt con granola y frutos rojos",
  },
  {
    src: "/images/food-burgers.png",
    alt: "Chipa muffins y limonadas de Guapa Café",
  },
  {
    src: "/images/food-drinks.png",
    alt: "Bebidas especiales de Guapa Café",
  },
];

export default function Gallery() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => i !== null ? (i + 1) % photos.length : null);
      if (e.key === "ArrowLeft") setLightbox((i) => i !== null ? (i - 1 + photos.length) % photos.length : null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section
      id="galeria"
      className="py-16 md:py-28"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <h2
            style={{
              fontFamily: "var(--font-literata)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              textWrap: "balance",
            }}
          >
            Una Probada Visual
          </h2>
          <div
            className="mx-auto mt-4"
            style={{
              width: "40px",
              height: "2px",
              background: "var(--color-pink)",
              borderRadius: "9999px",
            }}
          />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
          style={{ gridAutoRows: "auto" }}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                aspectRatio: "1 / 1",
                transform: hovered === i ? "scale(1.02)" : "scale(1)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setLightbox(i)}
              role="button"
              aria-label={`Ver ${photo.alt}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: "rgba(53,103,93,0.12)",
                  opacity: hovered === i ? 1 : 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.88)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors"
            style={{ fontSize: "2rem", lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
            aria-label="Cerrar"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            style={{ fontSize: "2.5rem", lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
            aria-label="Anterior"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}
          >
            ‹
          </button>
          <div
            className="relative rounded-xl overflow-hidden"
            style={{ width: "min(90vw, 900px)", height: "min(80vh, 640px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            style={{ fontSize: "2.5rem", lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
            aria-label="Siguiente"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}
          >
            ›
          </button>
          <p
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm"
            style={{ fontFamily: "var(--font-be-vietnam)" }}
          >
            {lightbox + 1} / {photos.length}
          </p>
        </div>
      )}
    </section>
  );
}
