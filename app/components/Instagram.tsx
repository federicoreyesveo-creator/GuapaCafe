"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

// To connect a live feed: use a service like Behold (behold.so) or Curator (curator.io)
// They provide a script/iframe embed that auto-updates when you post.
// Replace the static grid below with their embed code once you have an account.

const POSTS = [
  { src: "/images/food-cocktails.png", alt: "Cócteles artesanales" },
  { src: "/images/food-granola.png", alt: "Yogurt con granola y frutos rojos" },
  { src: "/images/food-burgers.png", alt: "Chipa muffins y limonadas" },
  { src: "/images/food-drinks.png", alt: "Bebidas especiales" },
];

export default function Instagram() {
  const reduce = useReducedMotion();

  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          className="text-center mb-12"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.3 },
                transition: { duration: 0.6, ease: "easeOut" as const },
              })}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="var(--color-green-deep)"
              aria-hidden="true"
            >
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.061 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.061 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.061-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.061-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
            </svg>
            <p
              className="text-xs font-semibold uppercase"
              style={{
                fontFamily: "var(--font-be-vietnam)",
                color: "var(--color-green-deep)",
                letterSpacing: "0.18em",
              }}
            >
              @guapacafemx
            </p>
          </div>
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
            Síguenos en Instagram
          </h2>
          <div
            className="mx-auto mt-4"
            style={{
              width: "40px",
              height: "2px",
              background: "var(--color-green)",
              borderRadius: "9999px",
            }}
          />
        </motion.div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {POSTS.map((post, i) => (
            <motion.a
              key={post.src}
              href="https://www.instagram.com/guapacafemx/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver en Instagram: ${post.alt}`}
              className="relative overflow-hidden rounded-xl group"
              style={{ aspectRatio: "1/1" }}
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.15 },
                    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
                  })}
              whileHover={reduce ? {} : { scale: 1.02 }}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Instagram hover overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(53,103,93,0.55)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="white"
                  aria-hidden="true"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.061 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.061 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.061-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.061-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.5 },
                transition: { duration: 0.5, delay: 0.4, ease: "easeOut" as const },
              })}
        >
          <a
            href="https://www.instagram.com/guapacafemx/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-[0.98]"
            style={{
              fontFamily: "var(--font-be-vietnam)",
              fontSize: "0.875rem",
              background: "var(--color-green-deep)",
              color: "#ffffff",
              minHeight: "44px",
            }}
          >
            Ver perfil completo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
