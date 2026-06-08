"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const links = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Menú", href: "#menu" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "var(--color-pink)",
        borderBottom: "1px solid rgba(192,200,197,0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center" aria-label="Guapa Café inicio">
          <Image
            src="/logo.jpeg"
            alt="Guapa Café"
            width={100}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold uppercase tracking-widest transition-colors duration-200"
              style={{
                fontFamily: "var(--font-be-vietnam)",
                color: "var(--color-text)",
                letterSpacing: "0.08em",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          style={{ touchAction: "manipulation", cursor: "pointer", WebkitTapHighlightColor: "transparent" } as React.CSSProperties}
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--color-text)",
              transform: open ? "rotate(45deg) translate(3px, 3px)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--color-text)",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--color-text)",
              transform: open ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "240px" : "0",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
        }}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold uppercase tracking-widest py-2"
              style={{
                fontFamily: "var(--font-be-vietnam)",
                color: "var(--color-text)",
                letterSpacing: "0.08em",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
