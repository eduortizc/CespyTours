import React from 'react';

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Hoteles Todo Incluido",
      icon: "fa-hotel",
      desc: "Relájate y disfruta sin preocupaciones en los mejores resorts del mundo."
    },
    {
      id: 2,
      title: "Vuelos",
      icon: "fa-plane",
      desc: "Encuentra las mejores tarifas en vuelos nacionales e internacionales."
    },
    {
      id: 3,
      title: "Hospedajes a tu medida",
      icon: "fa-bed",
      desc: "Desde cabañas acogedoras hasta villas de lujo para tu descanso."
    },
    {
      id: 4,
      title: "Cruceros Inolvidables",
      icon: "fa-ship",
      desc: "Vive la magia de navegar por el océano con todas las comodidades."
    },
    {
      id: 5,
      title: "Traslados Seguros",
      icon: "fa-van-shuttle",
      desc: "Llega a tu destino de forma segura y cómoda desde el aeropuerto."
    },
    {
      id: 6,
      title: "Trámites de Visas",
      icon: "fa-passport",
      desc: "Te asesoramos en todo el proceso para obtener tu visa sin estrés."
    }
  ];

  return (
    <section className="services" id="servicios">
      <div className="section-header">
        <h2>Nuestros Servicios</h2>
        <p>Todo lo que necesitas para tu viaje perfecto, en un solo lugar.</p>
      </div>
      
      <div className="services-grid">
        {services.map(service => (
          <div className="service-card" key={service.id}>
            <div className="icon-wrapper">
              <i className={`fa-solid ${service.icon}`}></i>
            </div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
