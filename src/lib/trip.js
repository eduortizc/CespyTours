import { contact, services } from "../data/site.js";
export const serviceOptions = [
  { id: "trip", title: "Viaje completo" },
  ...services,
];
export const initialTrip = {
  service: "trip",
  origin: "",
  destination: "",
  dateMode: "undecided",
  departure: "",
  returnDate: "",
  month: "",
  adults: "2",
  children: "0",
  ages: [],
  budget: "",
  budgetType: "Por persona",
  accommodation: "Sin preferencia",
  notes: "",
  name: "",
  phone: "",
  email: "",
};
export function localToday(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function validateStep(data, step, today = localToday()) {
  const errors = {};
  if (step === 0) {
    if (!serviceOptions.some((s) => s.id === data.service))
      errors.service = "Selecciona un servicio.";
    if (!data.destination.trim())
      errors.destination = "Escribe un destino o “Necesito recomendaciones”.";
    if (data.service !== "visa") {
      if (data.dateMode === "exact") {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(data.departure))
          errors.departure = "Elige la fecha de salida.";
        else if (data.departure < today)
          errors.departure = "La salida no puede ser anterior a hoy.";
        if (!/^\d{4}-\d{2}-\d{2}$/.test(data.returnDate))
          errors.returnDate = "Elige la fecha de regreso.";
        else if (
          data.returnDate < today ||
          (data.departure && data.returnDate < data.departure)
        )
          errors.returnDate =
            "El regreso debe ser igual o posterior a la salida y a hoy.";
      }
      if (
        data.dateMode === "flexible" &&
        (!/^\d{4}-\d{2}$/.test(data.month) || data.month < today.slice(0, 7))
      )
        errors.month = "Elige un mes actual o futuro.";
    }
  }
  if (step === 1) {
    if (
      !/^\d+$/.test(String(data.adults)) ||
      +data.adults < 1 ||
      +data.adults > 50
    )
      errors.adults = "Indica entre 1 y 50 adultos.";
    if (
      !/^\d+$/.test(String(data.children)) ||
      +data.children < 0 ||
      +data.children > 20
    )
      errors.children = "Indica entre 0 y 20 menores.";
    if (!errors.children)
      for (let i = 0; i < +data.children; i++) {
        if (
          data.ages[i] === "" ||
          data.ages[i] === undefined ||
          !/^\d+$/.test(String(data.ages[i])) ||
          +data.ages[i] < 0 ||
          +data.ages[i] > 17
        )
          errors[`age${i}`] = "Indica una edad entre 0 y 17 años.";
      }
    if (
      data.budget &&
      (!Number.isFinite(+data.budget) ||
        +data.budget <= 0 ||
        +data.budget > 10000000)
    )
      errors.budget =
        "Escribe un presupuesto mayor a cero y de hasta $10,000,000 MXN, o déjalo vacío.";
  }
  if (step === 2) {
    if (data.name.trim().length < 2)
      errors.name = "Escribe tu nombre (al menos 2 caracteres).";
    if (data.phone && !/^\+?[\d\s()-]{7,25}$/.test(data.phone.trim()))
      errors.phone = "Revisa el teléfono o deja este campo vacío.";
    else if (
      data.phone &&
      (data.phone.replace(/\D/g, "").length < 7 ||
        data.phone.replace(/\D/g, "").length > 15)
    )
      errors.phone = "El teléfono debe tener entre 7 y 15 dígitos.";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      errors.email = "Revisa el correo o deja este campo vacío.";
  }
  return errors;
}
const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(
        new Date(`${value}T12:00:00`),
      )
    : "";
export function tripSummary(data) {
  const service =
    serviceOptions.find((s) => s.id === data.service)?.title || data.service;
  const dates =
    data.dateMode === "exact"
      ? `${formatDate(data.departure)} al ${formatDate(data.returnDate)}`
      : data.dateMode === "flexible"
        ? `Fechas flexibles, mes aproximado: ${data.month}`
        : "Fechas por definir";
  return [
    "Hola, Cespy Tours. Me gustaría solicitar información para mi viaje.",
    "",
    `Nombre: ${data.name.trim() || "Por completar"}`,
    `Servicio: ${service}`,
    `Destino: ${data.destination.trim() || "Por definir"}`,
    data.origin.trim() && `Salida desde: ${data.origin.trim()}`,
    data.service !== "visa" && `Fechas: ${dates}`,
    `${data.service === "visa" ? "Solicitantes" : "Viajeros"}: ${data.adults} adulto(s), ${data.children} menor(es)`,
    +data.children > 0 &&
      `Edades de menores: ${data.ages.slice(0, +data.children).join(", ")} años`,
    data.budget
      ? `Presupuesto aproximado: ${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(+data.budget)} MXN · ${data.budgetType.toLowerCase()}`
      : "Presupuesto: me gustaría recibir orientación",
    ["trip", "hotel", "stay"].includes(data.service) &&
      `Hospedaje: ${data.accommodation}`,
    data.notes.trim() && `Comentarios: ${data.notes.trim()}`,
    data.phone.trim() && `Teléfono de contacto: ${data.phone.trim()}`,
    data.email.trim() && `Correo: ${data.email.trim()}`,
    "",
    "Entiendo que esta es una solicitud de información y no una reserva confirmada.",
  ]
    .filter((line) => line !== false && line !== undefined && line !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}
export const whatsappUrl = (
  message = "Hola, Cespy Tours. Me gustaría recibir información para planear un viaje.",
) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
