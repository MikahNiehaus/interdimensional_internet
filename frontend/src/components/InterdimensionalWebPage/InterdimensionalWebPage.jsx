import React, { useState } from "react";
import Header from "./Header";
import Home from "./InterdimensionalWebPageHome";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import CareersSection from "./CareersSection";
import BlogSection from "./BlogSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import "./InterdimensionalWebPage.css";

function InterdimensionalWebPage() {
  const [activePage, setActivePage] = useState("home"); // Default to Home

  const renderSection = () => {
    switch (activePage) {
      case "home":
        return <Home onNavigate={setActivePage} />;
      case "about":
        return <AboutSection />;
      case "services":
        return <ServicesSection />;
      case "testimonials":
        return <TestimonialsSection />;
      case "careers":
        return <CareersSection />;
      case "blog":
        return <BlogSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="interdimensional-web-page">
      <Header />
      <nav className="fake-router">
        <button onClick={() => setActivePage("home")}>Home</button>
        <button onClick={() => setActivePage("about")}>About</button>
        <button onClick={() => setActivePage("services")}>Services</button>
        <button onClick={() => setActivePage("testimonials")}>Testimonials</button>
        <button onClick={() => setActivePage("careers")}>Careers</button>
        <button onClick={() => setActivePage("blog")}>Blog</button>
        <button onClick={() => setActivePage("contact")}>Contact</button>
      </nav>
      <div className="content-section">{renderSection()}</div>
      <Footer />
    </div>
  );
}

export default InterdimensionalWebPage;
