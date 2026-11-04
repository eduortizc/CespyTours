export default function Hero() {
  return (
    <header className="hero" id="inicio">
      <div className="hero-overlay"></div>
      <div className="hero-text-box">
        <div className="hero-content">
          <span className="subtitle">OPERADORA TURÍSTICA</span>
          <h1>
            Crea experiencias <br />{" "}
            <span className="highlight">inolvidables</span>
          </h1>
          <p>
            Somos una agencia de viajes especializada en llevarte a descubrir
            destinos locales, nacionales e internacionales con la mejor
            atención.
          </p>
          <div className="hero-actions">
            <a href="#contacto" className="btn-primary">
              Planear mi viaje <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="airplane-banner-container">
        {/* Decorative flight path */}
        <div className="flight-path-svg">
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%" }}
          >
            <path
              d="M0,50 Q250,150 500,80 T1000,50"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeDasharray="15,15"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Airplane Icon */}
        <i className="fa-solid fa-plane airplane-icon"></i>
      </div>

      {/* Floating Photo Grid */}
      <div className="hero-family-widget">
        <div className="hero-photo-large">
          <img src="/cancun.jpg" alt="Playa del Caribe en Cancún" />
        </div>
        <div className="hero-photo-column">
          <img src="/image1.jpg" alt="Vista aérea de Cancún" />
          <img src="/image2.jpg" alt="Mar turquesa y embarcación" />
          <img src="/image3.jpg" alt="Hoteles frente al mar" />
        </div>
      </div>
    </header>
  );
}
