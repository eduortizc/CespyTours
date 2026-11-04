import React from 'react';

export default function Destinations() {
  const destinations = [
    { 
      id: 1, 
      title: "Cancún, México", 
      image: "/cancun.jpg", 
      desc: "Playas de arena blanca y vida nocturna vibrante." 
    },
    { 
      id: 2, 
      title: "París, Francia", 
      image: "/image1.jpg", 
      desc: "La ciudad del amor, arte y gastronomía." 
    },
    { 
      id: 3, 
      title: "Punta Cana, RD", 
      image: "/image2.jpg", 
      desc: "El paraíso caribeño perfecto para relajarse." 
    },
    { 
      id: 4, 
      title: "Tulum, México", 
      image: "/image3.jpg", 
      desc: "Ruinas mayas, cenotes mágicos y playas espectaculares." 
    },
    { 
      id: 5, 
      title: "Machu Picchu, Perú", 
      image: "/fondo.jpg", 
      desc: "Maravilla del mundo con increíbles montañas y cultura Inca." 
    },
    { 
      id: 6, 
      title: "Roma, Italia", 
      image: "/image.jpg", 
      desc: "Explora la historia antigua y disfruta de la mejor pasta." 
    }
  ];

  return (
    <section className="destinations" id="destinos">
      <div className="section-header">
        <h2>Destinos Populares</h2>
        <p>Descubre los lugares más increíbles que nuestros viajeros recomiendan.</p>
      </div>
      
      <div className="destinations-grid">
        {destinations.map(dest => (
          <div className="destination-card" key={dest.id}>
            <div className="destination-img-wrapper">
              <img src={dest.image} alt={dest.title} className="destination-img" />
              <div className="destination-overlay">
                <button className="btn-primary btn-small">Ver Paquetes</button>
              </div>
            </div>
            <div className="destination-info">
              <h3>{dest.title}</h3>
              <p>{dest.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
