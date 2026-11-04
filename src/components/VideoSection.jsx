import { useEffect, useRef, useState } from "react";
import { video } from "../data/site";
import { whatsappUrl } from "../lib/trip";
export default function VideoSection({ onPlan }) {
  const [playing, setPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    if (playing) dialog.current.showModal();
  }, [playing]);
  return (
    <section
      className="experience-section"
      id="experiencias"
      aria-labelledby="experience-title"
    >
      <div className="experience-inner">
        <div className="experience-copy">
          <span className="eyebrow">IMAGINA ESTAR AQUÍ</span>
          <h2 id="experience-title">
            Tu próxima pausa,
            <br />
            <em>más cerca.</em>
          </h2>
          <p>
            Conoce un poco de Sensira en la Riviera Maya y empieza a imaginar tu
            escapada.
          </p>
          <button
            className="btn-primary"
            onClick={() =>
              onPlan({ service: "hotel", destination: "Sensira, Riviera Maya" })
            }
          >
            Quiero una escapada <span aria-hidden="true">↗</span>
          </button>
        </div>
        <button
          className="video-cover"
          onClick={() => {
            setVideoError(false);
            setPlaying(true);
          }}
          aria-label="Ver video de Sensira, Riviera Maya"
        >
          <img
            src={video.poster}
            alt="Mar turquesa del Caribe mexicano"
            loading="lazy"
            width="800"
            height="600"
          />
          <span className="video-play" aria-hidden="true">
            <i className="fa-solid fa-play" />
          </span>
          <span className="video-caption">
            <span>
              {video.title}
              <small>{video.subtitle}</small>
            </span>
            <span>Ver video</span>
          </span>
        </button>
      </div>
      <dialog
        ref={dialog}
        className="media-dialog video-modal"
        onClose={() => setPlaying(false)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
        aria-labelledby="video-title"
      >
        <button
          className="dialog-close"
          onClick={() => dialog.current.close()}
          aria-label="Cerrar video"
          autoFocus
        >
          ×
        </button>
        {playing && (
          <>
            <h3 id="video-title">{video.title}</h3>
            <video
              src={video.src}
              poster={video.poster}
              controls
              playsInline
              autoPlay
              preload="metadata"
              aria-label={video.title}
              onError={() => setVideoError(true)}
            >
              Tu navegador no puede reproducir este video.
            </video>
            {videoError && (
              <p role="status">
                El video no está disponible en este momento. Puedes consultar
                las opciones para Sensira con nuestro equipo.
              </p>
            )}
            <p>
              <a
                href={whatsappUrl("Hola, Cespy Tours. Me gustaría recibir información sobre Sensira, Riviera Maya.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar Sensira por WhatsApp ↗
              </a>
            </p>
          </>
        )}
      </dialog>
    </section>
  );
}
