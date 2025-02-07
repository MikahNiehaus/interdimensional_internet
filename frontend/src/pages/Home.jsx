
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="center-content">
        <h2>🌌 Welcome to the Interdimensional Internet Hub 🚀</h2>
        <p>
          Connect to infinite interdimensional websites. Choose a portal to explore unknown realms! 🌀
        </p>
        <button className="generate-btn" onClick={() => navigate("/interdimensional-web-page")}>
          ✨ Visit Interdimensional Website
        </button>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>
          Created by <strong>Mikah Niehaus</strong> |{" "}
          <a href="mailto:mikah.niehaus@gmail.com" target="_blank" rel="noopener noreferrer">
            Email Me
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/MikahNiehaus"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://linkedin.com/in/mikahniehaus"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
