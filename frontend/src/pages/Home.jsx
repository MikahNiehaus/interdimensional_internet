import React from "react";
import { useNavigate } from "react-router-dom";
import { useWebsiteContext } from "../context/WebsiteContext.jsx"; // Import the context hook
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const { generateNewWebsite } = useWebsiteContext(); // Access the fetch function from the context

  // Handle the "Generate" button click
  const handleGenerateClick = async () => {
    try {
      await generateNewWebsite(); // Call the API and set the context
      navigate("/interdimensional-web-page"); // Navigate to the interdimensional web page
    } catch (error) {
      console.error("Error generating website context:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="center-content">
        <h2>🌌 Welcome to the Interdimensional Internet Hub 🚀</h2>
        <p>
          Connect to infinite interdimensional websites. Choose a portal to explore unknown realms! 🌀
        </p>
        <button className="generate-btn" onClick={handleGenerateClick}>
          ✨ Generate New Website
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
          <a href="https://github.com/MikahNiehaus" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          |{" "}
          <a href="https://linkedin.com/in/mikahniehaus" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
