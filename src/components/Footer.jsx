import { contact } from "../data/site";
import { whatsappUrl } from "../lib/trip";
export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <a href="#inicio" className="logo">
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
          <p>
            Viajes locales, nacionales e internacionales. Empecemos por lo que
            tienes en mente.
          </p>
        </div>
        <div className="footer-links">
          <h4>Explora</h4>
          <ul>
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#destinos">Destinos</a>
            </li>
            <li>
              <a href="#contacto">Planear mi viaje</a>
            </li>
            <li>
              <a href="#preguntas">Preguntas frecuentes</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Platiquemos</h4>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-whatsapp" aria-hidden="true" />{" "}
            {contact.phoneLabel}
          </a>
          <p>Cuéntanos tu idea por WhatsApp.</p>
          {contact.email && (
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          )}
          <div className="social-icons">
            {contact.instagram && (
              <a href={contact.instagram} aria-label="Instagram de Cespy Tours">
                Instagram
              </a>
            )}
            {contact.facebook && (
              <a href={contact.facebook} aria-label="Facebook de Cespy Tours">
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Cespy Tours</p>
        <a href="#datos">Sobre tus datos</a>
        <span>Tu solicitud no confirma una reserva.</span>
      </div>
    </footer>
  );
}
