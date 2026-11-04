import { useEffect, useRef, useState } from "react";
import {
  initialTrip,
  localToday,
  serviceOptions,
  tripSummary,
  validateStep,
  whatsappUrl,
} from "../lib/trip";

function Field({ label, id, error, children, className = "" }) {
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
export default function CTA({ selection }) {
  const [data, setData] = useState(() => ({ ...initialTrip, ages: [] }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [review, setReview] = useState(false);
  const [copied, setCopied] = useState("");
  const heading = useRef(null);
  const summaryRef = useRef(null);
  const hasInteracted = useRef(false);
  useEffect(() => {
    if (!selection) return;
    setData((previous) => ({ ...previous, ...selection }));
    setStep(0);
    setReview(false);
    setErrors({});
    heading.current?.focus({ preventScroll: true });
  }, [selection]);
  useEffect(() => {
    if (hasInteracted.current) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    }
  }, [step, review]);
  const change = (key, value) => {
    setData((previous) => {
      if (key === "children") {
        const count = Math.min(20, Math.max(0, Number(value) || 0));
        return {
          ...previous,
          children: value,
          ages: Array.from({ length: count }, (_, i) => previous.ages[i] ?? ""),
        };
      }
      return { ...previous, [key]: value };
    });
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    setCopied("");
  };
  const props = (key) => ({
    id: key,
    name: key,
    value: data[key],
    onChange: (event) => change(key, event.target.value),
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });
  function next(event) {
    event.preventDefault();
    hasInteracted.current = true;
    const found = validateStep(data, step);
    if (Object.keys(found).length) {
      setErrors(found);
      document
        .getElementById(Object.keys(found)[0].replace(/^age/, "age-"))
        ?.focus();
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      setErrors({});
      return;
    }
    for (let i = 0; i < 3; i++) {
      const invalid = validateStep(data, i);
      if (Object.keys(invalid).length) {
        setStep(i);
        setErrors(invalid);
        return;
      }
    }
    setReview(true);
    setCopied("");
  }
  async function copySummary() {
    try {
      await navigator.clipboard.writeText(tripSummary(data));
      setCopied(
        "Solicitud copiada. Puedes pegarla en tu conversación de WhatsApp.",
      );
    } catch {
      summaryRef.current?.focus();
      summaryRef.current?.select();
      setCopied(
        "Seleccionamos el texto. Cópialo con el menú de tu dispositivo o con Ctrl/Cmd + C.",
      );
    }
  }
  const visa = data.service === "visa";
  return (
    <section
      className="planner-section"
      id="contacto"
      aria-labelledby="planner-title"
    >
      <div className="planner-intro">
        <span className="eyebrow">EL PRIMER PASO HACIA TU VIAJE</span>
        <h2 id="planner-title">
          Tú pones la idea.
          <br />
          <em>Nosotros, el plan.</em>
        </h2>
        <p>
          Cuéntanos qué tienes en mente para que un asesor pueda orientarte
          desde el primer mensaje.
        </p>
        <ol className="planner-how">
          <li>
            <span>01</span>
            <div>
              <strong>Cuéntanos tu idea</strong>
              <p>Destino, fechas y lo que necesitas.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Revisa tu solicitud</strong>
              <p>Todos los detalles en un solo mensaje.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Platiquemos por WhatsApp</strong>
              <p>Envíala y consulta opciones con un asesor.</p>
            </div>
          </li>
        </ol>
        <a
          className="text-link"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prefiero hablar directamente <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="planner-card">
        <ol className="form-progress" aria-label="Pasos de tu solicitud">
          {["Tu viaje", "Viajeros", "Contacto"].map((label, index) => (
            <li
              key={label}
              aria-current={index === step ? "step" : undefined}
              className={index <= step ? "current" : ""}
            >
              <span>{index < step ? "✓" : index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
        <h3 ref={heading} tabIndex="-1" className="form-title">
          {review
            ? "Tu viaje empieza con este mensaje"
            : [
                "¿Qué viaje tienes en mente?",
                visa
                  ? "¿Para quién es la asesoría?"
                  : "¿Con quién vas a viajar?",
                "¿Cómo te llamas?",
              ][step]}
        </h3>
        {review ? (
          <div className="form-review">
            <p>
              Revisa los detalles. Abriremos WhatsApp con tu mensaje preparado;
              tú decides cuándo enviarlo.
            </p>
            <label htmlFor="request-summary" className="sr-only">
              Resumen de tu solicitud
            </label>
            <textarea
              id="request-summary"
              className="request-summary"
              readOnly
              value={tripSummary(data)}
              ref={summaryRef}
              rows="15"
            />
            <div className="form-actions">
              <button
                className="btn-secondary"
                onClick={() => {
                  setReview(false);
                  setCopied("");
                }}
              >
                Editar solicitud
              </button>
              <a
                className="btn-primary whatsapp-send"
                href={whatsappUrl(tripSummary(data))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Abrir
                WhatsApp con mi solicitud
              </a>
            </div>
            <button className="text-link copy-button" onClick={copySummary}>
              Copiar solicitud
            </button>
            <p role="status" className="copy-status">
              {copied}
            </p>
            <p className="form-note">
              Tu solicitud aún no se ha enviado. No confirma disponibilidad,
              precio ni reserva.
            </p>
          </div>
        ) : (
          <form onSubmit={next} noValidate>
            <p className="form-help">
              {step === 0
                ? "Solo destino y servicio son obligatorios. Si aún no sabes, podemos orientarte."
                : step === 1
                  ? "Estos detalles nos ayudan a buscar opciones que se ajusten a ti."
                  : "Tu nombre es obligatorio. El teléfono y el correo son opcionales."}
            </p>
            {step === 0 && (
              <div className="form-grid">
                <Field
                  label="¿Qué necesitas? *"
                  id="service"
                  error={errors.service}
                  className="full"
                >
                  <select {...props("service")}>
                    {serviceOptions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label={
                    visa
                      ? "País para el que consultas *"
                      : "Destino o idea de viaje *"
                  }
                  id="destination"
                  error={errors.destination}
                  className="full"
                >
                  <input
                    {...props("destination")}
                    maxLength="120"
                    placeholder="Ej. Cancún o Necesito recomendaciones"
                    required
                  />
                </Field>
                {!visa && (
                  <>
                    <Field
                      label="Ciudad de salida (opcional)"
                      id="origin"
                      className="full"
                    >
                      <input
                        {...props("origin")}
                        maxLength="100"
                        placeholder="Ej. Mérida, Yucatán"
                      />
                    </Field>
                    <fieldset className="date-options full">
                      <legend>¿Ya tienes fechas?</legend>
                      {[
                        ["undecided", "Aún no sé"],
                        ["exact", "Fechas exactas"],
                        ["flexible", "Soy flexible"],
                      ].map(([value, label]) => (
                        <label
                          className={data.dateMode === value ? "selected" : ""}
                          key={value}
                        >
                          <input
                            type="radio"
                            name="dateMode"
                            value={value}
                            checked={data.dateMode === value}
                            onChange={() => change("dateMode", value)}
                          />
                          {label}
                        </label>
                      ))}
                    </fieldset>
                    {data.dateMode === "exact" && (
                      <>
                        <Field
                          label="Salida *"
                          id="departure"
                          error={errors.departure}
                        >
                          <input
                            {...props("departure")}
                            type="date"
                            min={localToday()}
                            required
                          />
                        </Field>
                        <Field
                          label="Regreso *"
                          id="returnDate"
                          error={errors.returnDate}
                        >
                          <input
                            {...props("returnDate")}
                            type="date"
                            min={
                              data.departure > localToday()
                                ? data.departure
                                : localToday()
                            }
                            required
                          />
                        </Field>
                      </>
                    )}
                    {data.dateMode === "flexible" && (
                      <Field
                        label="Mes aproximado *"
                        id="month"
                        error={errors.month}
                        className="full"
                      >
                        <input
                          {...props("month")}
                          type="month"
                          min={localToday().slice(0, 7)}
                          required
                        />
                      </Field>
                    )}
                  </>
                )}
              </div>
            )}
            {step === 1 && (
              <div className="form-grid">
                <Field label="Adultos *" id="adults" error={errors.adults}>
                  <input
                    {...props("adults")}
                    type="number"
                    min="1"
                    max="50"
                    required
                  />
                </Field>
                <Field
                  label="Menores de 18 años *"
                  id="children"
                  error={errors.children}
                >
                  <input
                    {...props("children")}
                    type="number"
                    min="0"
                    max="20"
                    required
                  />
                </Field>
                {data.ages.map((age, i) => (
                  <Field
                    key={i}
                    label={`Edad del menor ${i + 1} *`}
                    id={`age-${i}`}
                    error={errors[`age${i}`]}
                  >
                    <select
                      id={`age-${i}`}
                      value={age}
                      required
                      aria-invalid={!!errors[`age${i}`]}
                      aria-describedby={
                        errors[`age${i}`] ? `age-${i}-error` : undefined
                      }
                      onChange={(event) => {
                        const ages = [...data.ages];
                        ages[i] = event.target.value;
                        change("ages", ages);
                        setErrors((prev) => ({
                          ...prev,
                          [`age${i}`]: undefined,
                        }));
                      }}
                    >
                      <option value="">Selecciona</option>
                      {Array.from({ length: 18 }, (_, n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "año" : "años"}
                        </option>
                      ))}
                    </select>
                  </Field>
                ))}
                <Field
                  label="Presupuesto aproximado en MXN"
                  id="budget"
                  error={errors.budget}
                >
                  <input
                    {...props("budget")}
                    type="number"
                    min="1"
                    max="10000000"
                    placeholder="Aún no sé"
                  />
                </Field>
                <Field label="Este presupuesto es" id="budgetType">
                  <select {...props("budgetType")}>
                    <option>Por persona</option>
                    <option>Para todo el grupo</option>
                  </select>
                </Field>
                {["trip", "hotel", "stay"].includes(data.service) && (
                  <Field
                    label="Preferencia de hospedaje"
                    id="accommodation"
                    className="full"
                  >
                    <select {...props("accommodation")}>
                      <option>Sin preferencia</option>
                      <option>Todo incluido</option>
                      <option>Solo hospedaje</option>
                      <option>Hotel con desayuno</option>
                      <option>Cabaña o villa</option>
                    </select>
                  </Field>
                )}
                <Field
                  label={
                    visa
                      ? "¿Sobre qué necesitas orientación? (opcional)"
                      : "¿Algo más que debamos saber? (opcional)"
                  }
                  id="notes"
                  className="full"
                >
                  <textarea
                    {...props("notes")}
                    rows="3"
                    maxLength="700"
                    placeholder={
                      visa
                        ? "Comparte tu duda general. No incluyas datos de documentos."
                        : "Ej. viaje en pareja, salida grupal o un hotel que te gustaría conocer."
                    }
                  />
                </Field>
                <p className="form-note full">
                  Comparte solo detalles del viaje. No incluyas pasaportes,
                  documentos ni información bancaria.
                </p>
              </div>
            )}
            {step === 2 && (
              <div className="form-grid">
                <Field
                  label="Tu nombre *"
                  id="name"
                  error={errors.name}
                  className="full"
                >
                  <input
                    {...props("name")}
                    autoComplete="given-name"
                    maxLength="80"
                    placeholder="¿Cómo te gusta que te llamen?"
                    required
                  />
                </Field>
                <Field
                  label="Teléfono (opcional)"
                  id="phone"
                  error={errors.phone}
                >
                  <input
                    {...props("phone")}
                    type="tel"
                    autoComplete="tel"
                    maxLength="25"
                    placeholder="Con código de país"
                  />
                </Field>
                <Field
                  label="Correo (opcional)"
                  id="email"
                  error={errors.email}
                >
                  <input
                    {...props("email")}
                    type="email"
                    autoComplete="email"
                    maxLength="120"
                    placeholder="tu@correo.com"
                  />
                </Field>
                <div className="trip-mini-summary full">
                  <span className="eyebrow">TU IDEA DE VIAJE</span>
                  <strong>{data.destination}</strong>
                  <p>
                    {serviceOptions.find((s) => s.id === data.service)?.title} ·{" "}
                    {data.adults} adulto(s)
                    {+data.children > 0 ? ` y ${data.children} menor(es)` : ""}
                  </p>
                </div>
              </div>
            )}
            {Object.values(errors).some(Boolean) && (
              <p role="alert" className="field-error form-error">
                Revisa los campos señalados para continuar.
              </p>
            )}
            <div className="form-actions">
              {step > 0 ? (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    hasInteracted.current = true;
                    setStep(step - 1);
                    setErrors({});
                  }}
                >
                  Atrás
                </button>
              ) : (
                <span className="form-required">* Campos obligatorios</span>
              )}
              <button type="submit" className="btn-primary">
                {step === 2 ? "Revisar solicitud" : "Continuar"}{" "}
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="form-note">
              Sin compromiso. Los detalles se enviarán solo cuando tú mandes el
              mensaje en WhatsApp.
            </p>
          </form>
        )}
        <details className="data-notice" id="datos">
          <summary>¿Qué pasa con mis datos?</summary>
          <p>
            Este formulario prepara tu solicitud en la página y no la guarda en
            una base de datos. Si cierras o recargas la página, tendrás que
            llenarlo de nuevo. Al abrir WhatsApp, el texto se comparte con ese
            servicio; Cespy Tours lo recibe cuando envías el mensaje. Se
            utilizará para atender tu consulta. No incluyas información
            sensible.
          </p>
        </details>
      </div>
    </section>
  );
}
