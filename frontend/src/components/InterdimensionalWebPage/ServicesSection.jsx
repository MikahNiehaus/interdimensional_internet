
import React from "react";

function ServicesSection() {
  return (
    <section className="services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <h3>🪑 Basic Coverage</h3>
          <p>Protects against minor discomforts, such as misplaced gum and warm seats.</p>
        </div>
        <div className="service-card">
          <h3>🔧 Deluxe Coverage</h3>
          <p>Covers moderate risks like unexpected pets or forgotten remote controls.</p>
        </div>
        <div className="service-card">
          <h3>🚀 Premium Multiversal Plan</h3>
          <p>Includes interdimensional mishaps, quantum lapses, and space chairs.</p>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
