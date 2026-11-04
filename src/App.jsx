import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import CTA from "./components/CTA";
import Moments from "./components/Moments";
import Destinations from "./components/Destinations";
import VideoSection from "./components/VideoSection";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import { whatsappUrl } from "./lib/trip";
import "./index.css";
import "./enhancements.css";
function App() {
  const [selection, setSelection] = useState(null);
  function plan(values) {
    setSelection({ ...values });
    document
      .getElementById("contacto")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Services onPlan={plan} />
        <Destinations onPlan={plan} />
        <Moments />
        <VideoSection onPlan={plan} />
        <CTA selection={selection} />
        <FAQ />
      </main>
      <Footer />
      <a
        href={whatsappUrl()}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Platicar con Cespy Tours por WhatsApp"
      >
        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
      </a>
    </>
  );
}
export default App;
