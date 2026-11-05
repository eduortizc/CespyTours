import { test } from "node:test";
import assert from "node:assert/strict";
import {
  initialTrip,
  localToday,
  tripSummary,
  validateStep,
  whatsappUrl,
} from "../src/lib/trip.js";
const trip = (overrides) => ({
  ...initialTrip,
  ages: [],
  destination: "Cancún",
  name: "Ana",
  ...overrides,
});
const today = "2026-11-04";
test("permite planear sin fechas, presupuesto ni contacto adicional", () => {
  for (let step = 0; step < 3; step++)
    assert.deepEqual(validateStep(trip(), step, today), {});
});
test("rechaza destinos vacíos y servicios desconocidos", () => {
  const errors = validateStep(
    trip({ destination: "  ", service: "unknown" }),
    0,
    today,
  );
  assert.ok(errors.destination);
  assert.ok(errors.service);
});
test("rechaza salida pasada, regreso anterior y fechas incompletas", () => {
  assert.ok(
    validateStep(
      trip({
        dateMode: "exact",
        departure: "2026-11-03",
        returnDate: "2026-11-07",
      }),
      0,
      today,
    ).departure,
  );
  assert.ok(
    validateStep(
      trip({
        dateMode: "exact",
        departure: "2026-11-08",
        returnDate: "2026-11-07",
      }),
      0,
      today,
    ).returnDate,
  );
  assert.ok(
    validateStep(trip({ dateMode: "exact", departure: "2026-11-08" }), 0, today)
      .returnDate,
  );
  assert.deepEqual(
    validateStep(
      trip({ dateMode: "exact", departure: today, returnDate: today }),
      0,
      today,
    ),
    {},
  );
});
test("valida mes flexible pero ignora fechas ocultas al consultar visas", () => {
  assert.ok(
    validateStep(trip({ dateMode: "flexible", month: "2026-10" }), 0, today)
      .month,
  );
  assert.deepEqual(
    validateStep(trip({ dateMode: "flexible", month: "2026-11" }), 0, today),
    {},
  );
  assert.deepEqual(
    validateStep(trip({ service: "visa", dateMode: "exact" }), 0, today),
    {},
  );
});
test("valida cantidades y solicita la edad de cada menor; acepta cero años", () => {
  assert.ok(validateStep(trip({ adults: "0" }), 1).adults);
  assert.ok(validateStep(trip({ adults: "1.5" }), 1).adults);
  assert.ok(validateStep(trip({ children: "21" }), 1).children);
  assert.ok(validateStep(trip({ children: "2", ages: ["0", ""] }), 1).age1);
  assert.deepEqual(
    validateStep(trip({ children: "2", ages: ["0", "17"] }), 1),
    {},
  );
});
test("rechaza presupuesto y datos de contacto inválidos", () => {
  assert.ok(validateStep(trip({ budget: "-1" }), 1).budget);
  assert.ok(validateStep(trip({ phone: "555", email: "incorrecto" }), 2).phone);
  assert.ok(validateStep(trip({ email: "incorrecto" }), 2).email);
  assert.deepEqual(
    validateStep(
      trip({ phone: "+52 999 123 4567", email: "ana@example.com" }),
      2,
    ),
    {},
  );
});
test("el mensaje preserva acentos y caracteres sin alterar la URL de destino", () => {
  const message = tripSummary(
    trip({
      destination: "París & Cancún #1",
      notes: "Viaje con niños + abuelos",
      budget: "15000",
      children: "1",
      ages: ["0", "16"],
    }),
  );
  const url = new URL(whatsappUrl(message));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/529995545813");
  assert.equal(url.searchParams.get("text"), message);
  assert.match(message, /Edades de menores: 0 años/);
  assert.doesNotMatch(message, /0, 16/);
  assert.match(message, /15,000/);
  assert.match(message, /no una reserva confirmada/);
});
test("el resumen omite campos ocultos de visa y fechas exactas abandonadas", () => {
  const visa = tripSummary(
    trip({
      service: "visa",
      accommodation: "Todo incluido",
      dateMode: "exact",
      departure: today,
      returnDate: today,
    }),
  );
  assert.doesNotMatch(visa, /Fechas:|Hospedaje:/);
  const flexible = tripSummary(
    trip({ dateMode: "undecided", departure: today, returnDate: today }),
  );
  assert.match(flexible, /Fechas por definir/);
  assert.doesNotMatch(flexible, /nov/);
});
test("hoy usa los componentes locales de fecha", () => {
  assert.equal(localToday(new Date(2026, 10, 4, 23, 45)), today);
});
