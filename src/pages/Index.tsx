import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import ServiceAreas from "@/components/ServiceAreas";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <BeforeAfterGallery />
      <ServiceAreas />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
