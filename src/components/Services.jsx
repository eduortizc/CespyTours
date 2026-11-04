import { services } from "../data/site";
export default function Services({ onPlan }) {
  return (
    <section
      className="services"
      id="servicios"
      aria-labelledby="services-title"
    >
      <div className="section-header">
        <span className="eyebrow">TÚ ELIGES CÓMO VIAJAR</span>
        <h2 id="services-title">Nos encargamos de los detalles</h2>
        <p>Desde una escapada hasta ese viaje que llevas tiempo imaginando.</p>
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <div className="icon-wrapper">
              <i className={`fa-solid ${service.icon}`} aria-hidden="true" />
            </div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <button
              className="text-link"
              onClick={() => onPlan({ service: service.id })}
            >
              Consultar opciones <span aria-hidden="true">↗</span>
              <span className="sr-only"> de {service.title}</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
