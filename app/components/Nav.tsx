"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Menú", href: "#menu" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Close drawer on scroll (UX improvement)
  useEffect(() => {
    const onScroll = () => { if (open) setOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const toggle = () => setOpen((v) => !v);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--color-pink)",
        borderBottom: "1px solid rgba(192,200,197,0.3)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="#" aria-label="Guapa Café inicio" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logo.jpeg"
            alt="Guapa Café"
            width={100}
            height={40}
            style={{ height: "40px", width: "auto", objectFit: "contain" }}
            priority
          />
        </a>

        {/* Desktop nav — hidden on mobile */}
        <nav
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "2rem" }}
          aria-label="Navegación principal"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-be-vietnam)",
                fontSize: "0.875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden"
          onClick={toggle}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
            minWidth: "44px",
            minHeight: "44px",
            alignItems: "center",
            justifyContent: "center",
          } as React.CSSProperties}
        >
          <span style={{
            display: "block", width: "24px", height: "2px",
            background: "var(--color-text)",
            transition: "transform 0.3s",
            transform: open ? "rotate(45deg) translate(4px, 4px)" : "none",
          }} />
          <span style={{
            display: "block", width: "24px", height: "2px",
            background: "var(--color-text)",
            transition: "opacity 0.3s",
            opacity: open ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: "24px", height: "2px",
            background: "var(--color-text)",
            transition: "transform 0.3s",
            transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none",
          }} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden"
        style={{
          overflow: "hidden",
          maxHeight: open ? "300px" : "0px",
          transition: "max-height 0.3s ease",
          background: "rgba(255,255,255,0.97)",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", padding: "1rem 1.5rem", gap: "0.5rem" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-be-vietnam)",
                fontSize: "0.875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text)",
                textDecoration: "none",
                padding: "0.75rem 0",
                display: "block",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
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
