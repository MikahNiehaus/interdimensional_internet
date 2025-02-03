import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHtml = async () => {
    setLoading(true);
    console.log("🧠 Sending AI request...");

    const prompt = `you are a web dev that only can respond with the code asked for and not a single word at all what so ever. you pride yourself on making full websites in html in one go that do not break no matter what u do. you like there to be a lot on your website html for people to see and do and fill the entire page with stuff. 
      Generate a fully interactive single page HTML, CSS, and JavaScript file that creates a **completely unique, fully functional website** on every execution.
      
      ### **Core Requirements:**
      - **Normal UI & Navigation:** The website must appear structured, readable, and functional—**no chaotic layouts, clashing colors, or unreadable fonts**.
      - **Dynamic Generation:** Every execution must generate an **original, bizarre, but logically structured website** with **no placeholder text**.
      - **Strict Uniqueness:** **DO NOT reuse or modify the provided examples.** Each website must be **entirely new**.
      
      ### **Example Features to Include:**
      - Do NOT reuse this example **Random Legal Disclaimers:** Increasingly suspicious fine print.
      - Do NOT reuse this example **Fake Reviews:** Some reviewers openly admit they were paid.
      - Do NOT reuse this example **Absurd Mission Statement:** The website's mission should be **objectively terrible** (e.g., "Accelerate climate change for profit").
      
      ### **Rules:**
      - **Strictly generate a brand-new concept on each execution.**
      - **Do NOT reuse any of the listed examples.**
      - **Provide only code—no explanations or comments.**
      - **404 Page Trick:** Clicking any link to another page triggers a **404 error** with a message like **"This page does not exist in your universe. and will not open new page"**
      - **The website must take itself 100% seriously, regardless of its absurdity.**
      - be creative and only give back code
    `;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "system", content: prompt }],
          max_tokens: 4000,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0]?.message?.content;
      console.log("🤖 AI Response:", aiResponse);
      setHtmlContent(aiResponse || "<h2>Error: AI response unavailable.</h2>");
    } catch (error) {
      console.error("❌ AI Error:", error.message);
      setHtmlContent("<h2>Failed to generate content. Please try again.</h2>");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #ff007e, #1e00ff, #00fff6)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        color: "#fff",
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "10px",
        overflow: "hidden",
      }}
    >
      {/* Small button at the top */}
      <button
        onClick={fetchHtml}
        disabled={loading}
        style={{
          background: "#ff007e",
          color: "#fff",
          border: "none",
          padding: "5px 15px",
          fontSize: "14px",
          cursor: "pointer",
          borderRadius: "5px",
          boxShadow: "0 0 5px rgba(255, 255, 255, 0.7)",
          marginBottom: "5px",
        }}
      >
        {loading ? "Looking Through the Multivuse..." : "Find New Website"}
      </button>

      {/* Generated content */}
      <div style={{ width: "95vw", height: "90vh" }}>
        {htmlContent ? (
          <iframe
            title="Interdimensional Page"
            srcDoc={htmlContent}
            style={{
              width: "100%",
              height: "100%",
              border: "3px solid #fff",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
            }}
          />
        ) : (
          <p style={{ fontSize: "1.2em", marginTop: "20px" }}>
            Click the button to find a new interdimensional website!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
