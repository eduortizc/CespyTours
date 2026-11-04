import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import CTA from './components/CTA';
import Moments from './components/Moments';
import Destinations from './components/Destinations';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Destinations />
      <Moments />
      <VideoSection />
      <CTA />
      <Footer />
      
      {/* Botón flotante de WhatsApp */}
      <a href="https://wa.me/529994388714" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </>
  );
}

export default App;
