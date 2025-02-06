
import React from "react";
import Header from "./Header";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import CareersSection from "./CareersSection";
import BlogSection from "./BlogSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import "./InterdimensionalWebPage.css";

function InterdimensionalWebPage() {
  return (
    <div className="interdimensional-web-page">
      <Header />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <CareersSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default InterdimensionalWebPage;
