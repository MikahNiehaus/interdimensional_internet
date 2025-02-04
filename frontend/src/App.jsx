import { useState } from "react";
import { fetchGeneratedHtml } from "./api";
import "./App.css";

function App() {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [showAbout, setShowAbout] = useState(false); // Toggle between pages

  const fetchHtml = async () => {
    setLoading(true);
    setCrashed(false);
    console.log("🌌 Tuning into the multiverse...");

    const prompt = `Generate an HTML page that looks like a portal into another dimension.`;
    const html = await fetchGeneratedHtml(prompt);

    setHtmlContent(html);
    setLoading(false);
  };

  return (
    <div className="full-page">
      <header>
        <nav className="nav-bar">
          <button onClick={() => setShowAbout(false)} className="nav-button">
            Home
          </button>
          <button onClick={() => setShowAbout(true)} className="nav-button">
            About
          </button>
        </nav>
      </header>

      {!showAbout ? (
        // Main Page Content
        <div className="center-content">
          {loading && (
            <div className="loading-overlay">
              <div className="loading-text">🔮 Peering into the Multiverse...</div>
            </div>
          )}

          {crashed && (
            <div className="crash-overlay">
              <div className="crash-text">
                💥 The interdimensional link has been severed! Reload to
                reconnect.
              </div>
            </div>
          )}

          {!htmlContent && (
            <button
              className="generate-btn"
              onClick={fetchHtml}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Interdimensional Website"}
            </button>
          )}

          {htmlContent && !crashed && (
            <iframe
              id="generated-iframe"
              title="Interdimensional Website"
              srcDoc={htmlContent}
              sandbox="allow-scripts allow-same-origin"
              style={{ width: "100vw", height: "100vh", border: "none" }}
            />
          )}
        </div>
      ) : (
        // About Page Content
        <div className="about-page">
          <h1>About the Interdimensional Internet</h1>
          <p>
            Welcome to the Interdimensional Internet project, a dynamic web
            application built to explore the infinite possibilities of
            interdimensional design! Using advanced technologies, this
            application generates portals into the unknown, leveraging APIs and
            AI-generated content.
          </p>
          <h2>About Me</h2>
          <p>
            Hi! I’m <strong>Mikah Niehaus</strong>, a Full Stack Software
            Developer and Certified AI Developer with over six years of
            experience building cloud-native, event-driven distributed systems.
            I specialize in:
          </p>
          <ul>
            <li>
              Designing and developing scalable, high-performance web
              applications.
            </li>
            <li>
              Leveraging AI to build cutting-edge applications that push the
              boundaries of technology.
            </li>
            <li>
              Utilizing .NET Core, Kubernetes, and microservices to craft
              robust backend systems.
            </li>
          </ul>
          <p>
            Check out my portfolio and contact me below for more exciting
            projects!
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="portfolio-footer">
        <p>
          Created by <strong>Mikah Niehaus</strong> |{" "}
          <a href="mailto:mikah.niehaus@gmail.com">mikah.niehaus@gmail.com</a>
        </p>
        <p>
          <a
            href="https://github.com/MikahNiehaus/interdimensional_internet"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 View Code
          </a>{" "}
          |{" "}
          <a
            href="https://linkedin.com/in/mikahniehaus"
            target="_blank"
            rel="noopener noreferrer"
          >
            💼 LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
