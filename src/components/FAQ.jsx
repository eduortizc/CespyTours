const questions = [
  [
    "¿Qué pasa después de llenar el formulario?",
    "Podrás revisar tu solicitud y abrir WhatsApp con un mensaje preparado. Envíalo desde tu cuenta para que un asesor conozca tu idea de viaje y te ayude a revisar opciones.",
  ],
  [
    "¿Necesito tener fechas y destino definidos?",
    "No. Puedes elegir “Aún no sé” en las fechas y escribir “Necesito recomendaciones” en el destino. También puedes compartir un mes aproximado.",
  ],
  [
    "¿El formulario calcula un precio o hace una reserva?",
    "No. El presupuesto sirve como referencia para buscar opciones. Un asesor te confirmará tarifas, disponibilidad, condiciones y los pasos para reservar.",
  ],
  [
    "¿Puedo consultar solo un servicio?",
    "Sí. Puedes consultar vuelos, hospedaje, hoteles todo incluido, cruceros, traslados o asesoría para visas desde las tarjetas de servicios.",
  ],
];
export default function FAQ() {
  return (
    <section className="faq-section" id="preguntas" aria-labelledby="faq-title">
      <div>
        <span className="eyebrow">ANTES DE HACER LAS MALETAS</span>
        <h2 id="faq-title">Resolvemos tus dudas</h2>
        <p>Lo que necesitas saber para empezar.</p>
      </div>
      <div className="faq-list">
        {questions.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
