import React from 'react';

export default function Moments() {
  return (
    <section className="moments" id="momentos">
      <div className="moments-header">
        <h2 className="moments-title">#CESPYMOMENTS <br/> <span className="moments-subtitle">EN LA RIVIERA MAYA</span></h2>
      </div>
      
      <div className="moments-container">
        {/* Decoraciones marinas (opcional, puedes agregar tus propios pngs en public) */}
        <img src="/starfish.png" alt="" className="decoration starfish" style={{display: 'none'}} />
        <img src="/seashell.png" alt="" className="decoration seashell" style={{display: 'none'}} />
        
        {/* Polaroids - Agrega tus imágenes en public/ y actualiza el src */}
        <div className="polaroid-wrapper polaroid-1">
          <div className="polaroid">
            <div className="polaroid-img-placeholder">
               <img src="/image1.jpg" alt="Moment 1" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="polaroid-caption">
              <div className="polaroid-logo">
                <img src="/logo.png" alt="Cespy Tours" className="polaroid-logo-img" />
              </div>
              <p>¡Disfruté muchísimo el hotel y sin duda volvería a viajar con ustedes!</p>
            </div>
          </div>
        </div>

        <div className="polaroid-wrapper polaroid-2">
          <div className="polaroid">
            <div className="polaroid-img-placeholder">
               <img src="/image2.jpg" alt="Moment 2" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="polaroid-caption">
              <div className="polaroid-logo">
                <img src="/logo.png" alt="Cespy Tours" className="polaroid-logo-img" />
              </div>
              <p>Unas vacaciones inolvidables gracias a Cespy Tours.</p>
            </div>
          </div>
        </div>
        
        <div className="polaroid-wrapper polaroid-3">
          <div className="polaroid">
            <div className="polaroid-img-placeholder">
               <img src="/image3.jpg" alt="Moment 3" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="polaroid-caption">
              <div className="polaroid-logo">
                <img src="/logo.png" alt="Cespy Tours" className="polaroid-logo-img" />
              </div>
              <p>El paraíso perfecto, 100% recomendado.</p>
            </div>
          </div>
        </div>
        
        <div className="polaroid-wrapper polaroid-4">
          <div className="polaroid">
            <div className="polaroid-img-placeholder">
               <img src="/image.jpg" alt="Moment 4" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="polaroid-caption">
              <div className="polaroid-logo">
                <img src="/logo.png" alt="Cespy Tours" className="polaroid-logo-img" />
              </div>
              <p>Experiencia maravillosa y atención de primera.</p>
            </div>
          </div>
        </div>
        <div className="polaroid-wrapper polaroid-5">
          <div className="polaroid">
            <div className="polaroid-img-placeholder">
               <img src="/cancun.jpg" alt="Moment 5" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="polaroid-caption">
              <div className="polaroid-logo">
                <img src="/logo.png" alt="Cespy Tours" className="polaroid-logo-img" />
              </div>
              <p>Todo el viaje fue perfecto, los mejores precios.</p>
            </div>
          </div>
        </div>
        
        <div className="polaroid-wrapper polaroid-6">
          <div className="polaroid">
            <div className="polaroid-img-placeholder">
               <img src="/fondo.jpg" alt="Moment 6" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="polaroid-caption">
              <div className="polaroid-logo">
                <img src="/logo.png" alt="Cespy Tours" className="polaroid-logo-img" />
              </div>
              <p>Excelente servicio y seguimiento en cada paso.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
