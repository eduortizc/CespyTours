import { useEffect, useRef, useState } from "react";
import { destinations } from "../data/site";

const amount = (value) => new Intl.NumberFormat("en-US").format(value);

export default function Destinations({ onPlan }) {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  useEffect(() => {
    if (selected && !dialog.current.open) dialog.current.showModal();
  }, [selected]);

  function plan(dest) {
    onPlan({
      destination: dest.destination,
      service: dest.service,
      ...(dest.origin ? { origin: dest.origin } : {}),
    });
  }

  return (
    <section
      className="destinations package-catalog"
      id="destinos"
      aria-labelledby="destinations-title"
    >
      <div className="section-header">
        <span className="eyebrow">ELIGE TU PRÓXIMA HISTORIA</span>
        <h2 id="destinations-title">¿A dónde te gustaría ir?</h2>
        <p>Cinco viajes para empezar a imaginar. Explora los paquetes y cuéntanos cuál va contigo.</p>
      </div>
      <div className="destinations-grid">
        {destinations.map((dest) => (
          <article className="destination-card" key={dest.id}>
            <button
              className="package-poster"
              onClick={() => setSelected(dest)}
              aria-label={`Ampliar cartel de ${dest.title}`}
            >
              <img
                src={dest.image}
                alt={`Cartel de ${dest.title}. ${dest.days} días y ${dest.nights} noches. ${dest.priceLabel}: $${amount(dest.price)} USD más $${amount(dest.taxes)} USD de impuestos y suplementos indicados.`}
                className="destination-img"
                loading="lazy"
                width="894"
                height="1280"
              />
              <span className="package-zoom" aria-hidden="true">Ampliar cartel ↗</span>
            </button>
            <div className="destination-info">
              <div className="package-meta">
                <span className="eyebrow">{dest.region}</span>
                <span>{dest.days} días · {dest.nights} noches</span>
              </div>
              <h3>{dest.title}</h3>
              <div className="package-price">
                <span>{dest.priceLabel}</span>
                <strong>${amount(dest.price)} <small>USD</small></strong>
                <span>+ ${amount(dest.taxes)} USD de impuestos</span>
              </div>
              <p className="package-occupancy">{dest.occupancy}. Más suplementos indicados.</p>
              <p className="package-route"><strong>Visitando</strong>{dest.places.join(" · ")}</p>
              <details className="package-details">
                <summary>Qué incluye y condiciones <span aria-hidden="true">+</span></summary>
                <ul>{dest.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                <p>Servicios según itinerario. Aerolínea: {dest.airline}.</p>
                <ul>{dest.conditions.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
              <button className="btn-primary package-consult" onClick={() => plan(dest)}>
                Consultar este viaje <span className="sr-only">: {dest.title}</span><span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="package-catalog-footer">
        <p>Tarifas por persona en USD. Consulta fechas, disponibilidad y precio final con un asesor.</p>
        <button className="text-link" onClick={() => onPlan({ service: "trip", destination: "Necesito recomendaciones para otro destino" })}>
          Tengo otro destino en mente <span aria-hidden="true">↗</span>
        </button>
      </div>
      <dialog
        ref={dialog}
        className="media-dialog package-dialog"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
        aria-labelledby="package-dialog-title"
      >
        <button className="dialog-close" onClick={() => dialog.current.close()} aria-label="Cerrar cartel" autoFocus>×</button>
        {selected && (
          <>
            <h3 id="package-dialog-title" className="sr-only">{selected.title}</h3>
            <img src={selected.image} alt={`Cartel completo de ${selected.title}`} width="894" height="1280" />
            <a href={selected.image} target="_blank" rel="noopener noreferrer">Abrir imagen en tamaño original ↗</a>
          </>
        )}
      </dialog>
    </section>
  );
}
