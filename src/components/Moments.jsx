import { useEffect, useRef, useState } from "react";
import { gallery } from "../data/site";
export default function Moments() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  useEffect(() => {
    if (selected !== null && !dialog.current.open) dialog.current.showModal();
  }, [selected]);
  const move = (direction) =>
    setSelected(
      (index) => (index + direction + gallery.length) % gallery.length,
    );
  return (
    <section
      className="travel-stories"
      id="momentos"
      aria-labelledby="moments-title"
    >
      <div className="stories-heading">
        <div>
          <span className="eyebrow">RECUERDOS QUE SE QUEDAN</span>
          <h2 id="moments-title">El viaje también se cuenta en fotos</h2>
        </div>
        <p>
          Un vistazo a los momentos y paisajes que nos inspiran a seguir
          viajando.
        </p>
      </div>
      <div className="stories-grid">
        {gallery.map((photo, i) => (
          <button
            className={`story-photo story-photo-${i}`}
            key={photo.image}
            onClick={() => setSelected(i)}
            aria-label={`Ampliar: ${photo.title}`}
          >
            <img
              src={photo.image}
              alt={photo.alt}
              loading="lazy"
              width="720"
              height="900"
            />
            <span className="story-caption">
              {photo.title}
              <span aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="media-dialog"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move(1);
          if (event.key === "ArrowLeft") move(-1);
        }}
        aria-labelledby="photo-caption"
      >
        <button
          className="dialog-close"
          onClick={() => dialog.current.close()}
          aria-label="Cerrar fotografía"
          autoFocus
        >
          ×
        </button>
        {selected !== null && (
          <div className="lightbox-content">
            <img src={gallery[selected].image} alt={gallery[selected].alt} />
            <div className="lightbox-controls">
              <button onClick={() => move(-1)} aria-label="Foto anterior">
                ←
              </button>
              <p id="photo-caption">
                {gallery[selected].title}{" "}
                <small>
                  {selected + 1} / {gallery.length}
                </small>
              </p>
              <button onClick={() => move(1)} aria-label="Foto siguiente">
                →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
