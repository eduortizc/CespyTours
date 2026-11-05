# Cespy Tours

Landing page en React + Vite para consultar servicios turísticos y preparar solicitudes por WhatsApp. No requiere servidor de aplicaciones, cuentas ni base de datos.

## Desarrollo

Requiere Node.js 22.12+ (o 24 LTS).

```sh
npm ci
npm run dev
```

## Validación y compilación

```sh
npm test
npm run build
npm run preview
```

La carpeta `dist/` se puede alojar en un servicio de hosting estático. Está preparada para publicarse en la raíz de un dominio.

## Solicitudes

1. El usuario elige servicio, destino y fechas exactas, flexibles o por definir.
2. Indica adultos, menores y sus edades. Presupuesto y preferencias son opcionales.
3. Indica su nombre; teléfono y correo son opcionales.
4. Revisa el mensaje y abre WhatsApp con el texto preparado, o copia la solicitud.

La página no envía mensajes automáticamente ni confirma reservas o disponibilidad. El cliente termina el envío dentro de WhatsApp. Los datos permanecen únicamente en memoria durante el uso de la página y se pierden al recargar. No se usa localStorage, analítica de formularios ni un servicio externo de recepción.

Las tarjetas de servicios/destinos rellenan la solicitud conservando los demás datos introducidos. Los campos ocultos de fechas, hospedaje y edades que ya no corresponden no se incluyen en el mensaje.

## Contenido y contacto

Editar `src/data/site.js` para modificar servicios, destinos, galería, origen del video y contactos. El WhatsApp `529995545813` es el número oficial de atención. Correo y redes permanecen vacíos hasta tener datos confirmados; los enlaces vacíos no se muestran. Se retiraron las reseñas y datos de ejemplo.

Se usan directamente las imágenes originales de `public/` y `public/moments/`. El catálogo utiliza los cinco carteles originales proporcionados por Cespy: `parispaisesbajos.jpeg`, `perlaseuropa.jpeg`, `peru.jpeg`, `puntacana.jpeg` y `ecosjapon.jpeg`. No se generan fotografías, miniaturas ni copias WebP. Las imágenes de portada y su composición se mantienen, con ajustes de proporciones para evitar que tapen el texto. La galería usa fotografías existentes; no las presenta como reseñas.

El video se agrega manualmente en `public/sensira.mp4`. Al copiarlo a esa ruta, el reproductor lo utiliza sin cambiar el código. Este cambio no incluye ni sube archivos de video. La portada reutiliza `public/cancun.jpg`; no se presenta como un fotograma de Sensira. El reproductor nativo se monta al pulsar la portada, tiene controles y se detiene al cerrar. Si el archivo aún no está disponible o falla su reproducción, se muestra un mensaje y sigue disponible la consulta por WhatsApp.

La ruta del video y su portada se configuran en `video` en `src/data/site.js`. No se publican enlaces a carpetas multimedia privadas.

## Catálogo de viajes

Los cinco carteles se agregan manualmente en `public/` con los nombres indicados arriba. Esta actualización publica únicamente código y documentación; no incluye archivos de imágenes ni video.

La sección «¿A dónde te gustaría ir?» muestra los carteles completos en dos columnas grandes y una columna en móvil. Se pueden ampliar y abrir en su tamaño original. La información también se presenta como texto: duración, precio base en USD, impuestos por separado, ocupación, ruta e inclusiones y suplementos desplegables. Los importes se transcribieron de los carteles suministrados; no se anuncia disponibilidad en tiempo real.

Consultar un paquete prellena el destino en el formulario. Punta Cana también prellena Monterrey como ciudad de salida. Se conservan los demás datos de la solicitud. Los carteles y sus datos se configuran en `destinations` en `src/data/site.js`.

## Estructura

- `src/components/CTA.jsx`: formulario por pasos, revisión y copia.
- `src/lib/trip.js`: validaciones y composición del mensaje.
- `tests/trip.test.js`: validaciones de fechas, viajeros, edades, presupuesto, contactos y URL de WhatsApp.
- `src/components/Moments.jsx`: galería con visor, navegación y cierre con Escape.
- `src/components/VideoSection.jsx`: video con controles y cierre accesible.
- `src/enhancements.css`: ajustes visuales y responsive sobre la identidad existente.

## Comprobación manual

Revisar en escritorio y móvil: prellenado desde servicios y destinos, fechas, edades de menores (incluido cero años), edición del mensaje y copia de solicitud. Abrir el enlace de WhatsApp sin enviar mensajes de prueba a la agencia. Comprobar galería, menú y cierre de los visores con Escape.

Después de agregar `public/sensira.mp4`, comprobar la reproducción y el cierre del video. Antes de subirlo, la consulta por WhatsApp sigue disponible.
