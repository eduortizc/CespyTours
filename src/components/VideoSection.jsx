import React from 'react';

export default function VideoSection() {
  return (
    <section className="video-section" id="experiencias">
      <div className="section-header">
        <h2>Vive la Experiencia</h2>
        <p>Un pequeño vistazo a las aventuras que te esperan con nosotros.</p>
      </div>
      
      <div className="video-container">
        {/* Aquí puedes reemplazar el src con tu propio video de YouTube, Vimeo, o un video local */}
        <div className="video-wrapper">
          <div className="video-placeholder">
            <i className="fa-solid fa-play play-button"></i>
            <p>Spot para tu Video Promocional</p>
            <span className="video-subtitle">Agrega la etiqueta &lt;video&gt; o iframe aquí</span>
          </div>
        </div>
      </div>
    </section>
  );
}
