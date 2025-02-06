import React from "react";

function Home({ onNavigate }) {
  return (
    <div className="home-container">
    
      {/* Hero Section */}
      <section className="hero">
        <h1>Your Seat. Your Safety. Our Priority.</h1>
        <p>
          Protect yourself from unexpected interdimensional accidents, quantum lapses, and
          intergalactic seat mishaps with our comprehensive insurance plans.
        </p>
        <button className="hero-btn" onClick={() => onNavigate("interdimensional-web-page")}>
          Get Protected Now
        </button>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Insurance Plans</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>🪑 Basic Coverage</h3>
            <p>Protects against minor discomforts, such as misplaced gum and warm seats.</p>
          </div>
          <div className="service-card">
            <h3>🔧 Deluxe Coverage</h3>
            <p>
              Covers moderate risks like unexpected pets, forgotten remote controls, and mild
              interdimensional disturbances.
            </p>
          </div>
          <div className="service-card">
            <h3>🚀 Premium Multiversal Plan</h3>
            <p>
              Includes interdimensional mishaps, quantum lapses, and space-chair accidents.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <p>🦸‍♂️ "Thanks to Interdimensional Insurance, I can finally sit with confidence!" - John</p>
        <p>👩 "Never again will I suffer from unexpected surprises under my chair!" - Sarah</p>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Secure Your Seat?</h2>
        <p>Your safety is just one click away. Get started today!</p>
        <button className="cta-btn" onClick={() => onNavigate("contact")}>
          Get Covered Now
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; 2025 Interdimensional Insurance Inc. |{" "}
          <a href="mailto:support@interdimensionalinsurance.com">Email Us</a> |{" "}
          <a href="https://linkedin.com/in/mikahniehaus" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{" "}
          |{" "}
          <a href="https://github.com/MikahNiehaus" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
