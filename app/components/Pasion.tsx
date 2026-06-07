"use client";

import Image from "next/image";

export default function Pasion() {
  return (
    <section id="nosotros" className="py-24 md:py-32" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          <div>
            <p className="text-xs font-semibold uppercase mb-4" style={{ fontFamily: "var(--font-be-vietnam)", color: "var(--color-green-deep)", letterSpacing: "0.18em" }}>
              Sobre Nosotros
            </p>
            <h2 className="mb-6" style={{ fontFamily: "var(--font-literata)", fontSize: "clamp(1.75rem,3.5vw,2.5rem)", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.01em", color: "var(--color-text)", textWrap: "balance" }}>
              Nuestra Pasión<br />En Guapa Café
            </h2>
            <p className="leading-relaxed" style={{ fontFamily: "var(--font-be-vietnam)", fontSize: "1.0625rem", color: "var(--color-text-muted)", maxWidth: "58ch", lineHeight: 1.75 }}>
              Creemos en crear un espacio acogedor y amigable para todos. Somos un
              lugar donde el buen café, la deliciosa comida y una cálida atención se
              encuentran para ofrecerte una experiencia única. Inspirados en el amor
              por los detalles y la frescura de los ingredientes, trabajamos día a
              día para hacerte sentir como en casa. Nuestro ambiente pet-friendly y
              nuestros productos cuidadosamente seleccionados reflejan nuestra pasión
              por la calidad y el servicio personalizado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Pet-Friendly", "Ingredientes Frescos", "Ambiente Cálido"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full text-xs font-semibold" style={{ fontFamily: "var(--font-be-vietnam)", background: "var(--color-pink)", color: "var(--color-text)", letterSpacing: "0.04em" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <Image
              src="/images/food-pastries.png"
              alt="Croissants artesanales de Guapa Café"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(to top,rgba(53,103,93,0.25),transparent)" }} />
          </div>

        </div>
      </div>
    </section>
  );
}
