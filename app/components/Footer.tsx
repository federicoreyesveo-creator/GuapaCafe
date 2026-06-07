import Image from "next/image";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.437!2d-99.17280!3d19.37200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fefef94ef765%3A0x0!2sNicol%C3%A1s+San+Juan+1665%2C+Del+Valle+Sur%2C+Benito+Ju%C3%A1rez%2C+03104+Ciudad+de+M%C3%A9xico%2C+CDMX!5e0!3m2!1ses-419!2smx!4v1749000000000!5m2!1ses-419!2smx";

export default function Footer() {
  return (
    <footer id="contacto" style={{ background: "var(--color-green-deep)", color: "#ffffff" }}>
      {/* Map */}
      <div className="w-full" style={{ height: "320px" }}>
        <iframe
          src={MAP_EMBED}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "saturate(0.7) brightness(0.9)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Guapa Café"
        />
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div>
            <Image
              src="/logo.jpeg"
              alt="Guapa Café"
              width={100}
              height={40}
              className="h-10 w-auto object-contain mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p
              style={{
                fontFamily: "var(--font-be-vietnam)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.75)",
                maxWidth: "28ch",
              }}
            >
              Café artesanal y coctelería en la Colonia del Valle. Pet-friendly. Abierto todos los días.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-xs font-semibold uppercase mb-4"
              style={{
                fontFamily: "var(--font-be-vietnam)",
                color: "var(--color-green)",
                letterSpacing: "0.14em",
              }}
            >
              Contacto
            </p>
            <div
              className="flex flex-col gap-2"
              style={{
                fontFamily: "var(--font-be-vietnam)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              <a
                href="tel:5596887214"
                className="hover:text-white transition-colors"
              >
                55 9688 7214
              </a>
              <a
                href="mailto:guapacafemx@gmail.com"
                className="hover:text-white transition-colors"
              >
                guapacafemx@gmail.com
              </a>
              <address
                className="not-italic mt-1"
                style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}
              >
                Nicolás San Juan 1665<br />
                Col. Del Valle Sur, Benito Juárez<br />
                03204, Ciudad de México
              </address>
            </div>
          </div>

          {/* Social */}
          <div>
            <p
              className="text-xs font-semibold uppercase mb-4"
              style={{
                fontFamily: "var(--font-be-vietnam)",
                color: "var(--color-green)",
                letterSpacing: "0.14em",
              }}
            >
              Síguenos
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/guapacafemx/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                aria-label="Guapa Café en Instagram"
              >
                {/* Instagram icon from Simple Icons */}
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 shrink-0"
                  fill="rgba(255,255,255,0.7)"
                  aria-hidden="true"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.061 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.061 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.061-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.061-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-be-vietnam)",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.75)",
                  }}
                  className="group-hover:text-white transition-colors"
                >
                  @guapacafemx
                </span>
              </a>

              <a
                href="https://www.facebook.com/p/Guapa-Caf%C3%A9-61566433299634/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                aria-label="Guapa Café en Facebook"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 shrink-0"
                  fill="rgba(255,255,255,0.7)"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-be-vietnam)",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.75)",
                  }}
                  className="group-hover:text-white transition-colors"
                >
                  Guapa Café
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-be-vietnam)",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            &copy; {new Date().getFullYear()} Guapa Café. Todos los derechos reservados.
          </p>
          <p
            style={{
              fontFamily: "var(--font-be-vietnam)",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Colonia del Valle, CDMX
          </p>
        </div>
      </div>
    </footer>
  );
}
