export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <span className="brand-cespy">Cespy</span>
            <span className="brand-tours">tours</span>
          </div>
          <p>Operadora turística de confianza para crear memorias que durarán toda la vida.</p>
        </div>
        <div className="footer-links">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#destinos">Destinos</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contacto</h4>
          <p><i className="fa-solid fa-envelope"></i> info@cespytours.com</p>
          <p><i className="fa-solid fa-phone"></i> +52 123 456 7890</p>
          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Cespy Tours. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
