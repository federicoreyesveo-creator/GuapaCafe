"use client";
import { useState, useEffect } from "react";

export default function HydrationTest() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        zIndex: 9999,
        background: "#00c851",
        color: "white",
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "bold",
        pointerEvents: "none",
      }}
    >
      ✓ JS OK
    </div>
  );
}
