import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span className="brand-cespy">Cespy</span>
        <span className="brand-tours">tours</span>
      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a></li>
        <li><a href="#destinos" onClick={() => setMenuOpen(false)}>Destinos</a></li>
        <li><a href="#contacto" className="btn-primary" onClick={() => setMenuOpen(false)}>Planear Viaje</a></li>
      </ul>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </div>
    </nav>
  );
}
