import { useState, useEffect } from "react";
import { fetchGeneratedHtml } from "./api"; // Import the API function
import "./App.css";

function App() {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    let checkCrashInterval;

    if (htmlContent) {
      checkCrashInterval = setInterval(() => {
        const iframe = document.getElementById("generated-iframe");
        if (iframe && !iframe.contentWindow) {
          console.error("🚨 Interdimensional site crashed!");
          setCrashed(true);
          clearInterval(checkCrashInterval);
        }
      }, 3000);
    }

    return () => clearInterval(checkCrashInterval);
  }, [htmlContent]);

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
      {loading && (
        <div className="loading-overlay">
          <div className="loading-text">🔮 Peering into the Multiverse...</div>
        </div>
      )}

      {crashed && (
        <div className="crash-overlay">
          <div className="crash-text">💥 The interdimensional link has been severed! Reload to reconnect.</div>
        </div>
      )}

      {!htmlContent && (
        <button className="generate-btn" onClick={fetchHtml} disabled={loading}>
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
  );
}

export default App;
