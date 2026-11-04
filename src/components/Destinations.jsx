import { destinations } from "../data/site";
export default function Destinations({ onPlan }) {
  return (
    <section
      className="destinations"
      id="destinos"
      aria-labelledby="destinations-title"
    >
      <div className="section-header">
        <span className="eyebrow">UN POCO DE INSPIRACIÓN</span>
        <h2 id="destinations-title">¿A dónde te gustaría ir?</h2>
        <p>Empieza por un destino. El resto lo planeamos contigo.</p>
      </div>
      <div className="destinations-grid">
        {destinations.map((dest) => (
          <article className="destination-card" key={dest.id}>
            <div className="destination-img-wrapper">
              <img
                src={dest.image}
                alt={
                  dest.id === "custom"
                    ? "Atardecer en una playa, inspiración para tu próximo viaje"
                    : `Paisaje de ${dest.title}`
                }
                className="destination-img"
                loading="lazy"
                width="600"
                height="440"
              />
            </div>
            <div className="destination-info">
              <span className="eyebrow">{dest.region}</span>
              <h3>{dest.title}</h3>
              <p>{dest.desc}</p>
              <button
                className="text-link"
                onClick={() =>
                  onPlan({
                    destination: dest.destination,
                    service: dest.service,
                  })
                }
              >
                {dest.id === "custom"
                  ? "Diseñar mi viaje"
                  : `Consultar ${dest.title}`}{" "}
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
