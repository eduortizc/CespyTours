import { useState, useEffect } from "react";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}
      aria-label="Navegación principal"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setMenuOpen(false);
          document.getElementById("menu-toggle")?.focus();
        }
      }}
    >
      <a
        href="#inicio"
        className="logo"
        aria-label="Cespy Tours, inicio"
        onClick={() => setMenuOpen(false)}
      >
        <img
          src="/logo.png"
          alt=""
          className="logo-img"
          width="50"
          height="50"
        />
        <span className="brand-cespy">Cespy</span>
        <span className="brand-tours">tours</span>
      </a>
      <ul id="nav-links" className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>
            Servicios
          </a>
        </li>
        <li>
          <a href="#destinos" onClick={() => setMenuOpen(false)}>
            Destinos
          </a>
        </li>
        <li>
          <a href="#momentos" onClick={() => setMenuOpen(false)}>
            Experiencias
          </a>
        </li>
        <li>
          <a
            href="#contacto"
            className="btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Planear viaje
          </a>
        </li>
      </ul>
      <button
        id="menu-toggle"
        className="menu-icon"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i
          className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}
