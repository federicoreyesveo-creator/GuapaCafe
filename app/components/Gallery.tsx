"use client";

import Image from "next/image";
import { useState } from "react";

const photos = [
  {
    src: "/images/food-pastries.png",
    alt: "Croissants y panadería artesanal de Guapa Café",
    span: "lg:col-span-1 lg:row-span-2",
  },
  {
    src: "/images/food-cocktails.png",
    alt: "Cócteles de Guapa Café",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/images/food-granola.png",
    alt: "Yogurt con granola y frutos rojos",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/images/food-burgers.png",
    alt: "Chipa muffins y limonadas de Guapa Café",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/images/food-cake.png",
    alt: "Pastel de pistacho con bebida de rosas",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/images/food-drinks.png",
    alt: "Bebidas especiales de Guapa Café",
    span: "lg:col-span-1 lg:row-span-1",
  },
];

export default function Gallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="galeria"
      className="py-24 md:py-32"
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

        {/* Asymmetric grid: desktop 3-col, mobile 2-col */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
          style={{ gridAutoRows: "280px" }}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-xl ${photo.span}`}
              style={{
                gridRow: i === 0 ? "span 2" : "span 1",
                transform: hovered === i ? "scale(1.02)" : "scale(1)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                cursor: "default",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
              />
              {/* Subtle overlay on hover */}
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
    </section>
  );
}
