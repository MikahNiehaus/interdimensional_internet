import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHtml = async () => {
    setLoading(true);
    console.log("🧠 Sending AI request...");

    const prompt = `
Generate a fully interactive single-page HTML, simple CSS, and JavaScript file that creates a **completely unique, fully functional website** on every execution.

### **Core Requirements:**
1. **Structured and Professional UI:**
   - The website must have a **clean, readable, and navigable layout** with intuitive menus, links, and sections.
   - Use balanced colors, legible fonts, and an organized layout—avoid chaotic designs or visual clutter.
   - The design must remain visually coherent and functional, regardless of user interactions.

2. **Pre-Populated, Unique Content:**
   - The website must look as if it has existed for a while, with **pre-filled data** that makes it feel like a complete website.
   - Include content relevant to the theme (e.g., company details, user reviews, blog posts, or other populated sections).
   - Do not include empty fields or placeholders; all sections should have meaningful data already populated.

3. **Dynamic and Distinct Website Generation:**
   - Each generated website must have a **unique concept, style, and set of features**.
   - **Avoid repetition of features across websites.** For example:
     - If one website includes a "post comments" feature, the next website must not have anything similar.
     - New features could include company bios, interactive widgets, product catalogs, team member profiles, services offered, etc.
   - Ensure the generated features and layouts are **original and logically consistent** within the website's theme.

4. **Logical Absurdity with Serious Execution:**
   - The website’s content and purpose should be bizarre yet coherent, written as if it takes itself seriously.
   - Examples for reference (**DO NOT reuse or modify these**):
     - A mission statement promoting strange but clearly articulated goals.
     - User testimonials with humorous contradictions or surreal scenarios.

5. **404 Error Twist:**
   - Clicking any external or broken link must trigger a custom 404 message, such as:
     **"This page does not exist in your universe. Please consult a local time-traveler for assistance."**

6. **Complete Standalone Functionality:**
   - The website must work fully with **only HTML, CSS, and JavaScript**—no external dependencies or frameworks.
   - Ensure the code is self-contained and stable, so it **does not break** under any circumstances, regardless of user actions or modifications.

### **Rules:**
1. **Only reply with code.** No explanations, comments, or additional text are allowed.
2. **Ensure every website has a unique concept, style, and features.**
3. **Do NOT reuse or modify any examples provided in this prompt.**
4. **Pre-fill all website content—no placeholders or empty fields.**
5. **Every interaction or feature must remain confined to a single page.**
6. **The code must be unbreakable—no matter how the website is used or altered.**
7. **Under no circumstances are you allowed to include anything other than code.**

### **Output Format:**
- Provide the code for a complete, fully functional website using HTML, CSS, and JavaScript only.
- Do not include comments, explanations, or additional text—strictly code only.
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

      let aiResponse = response.data.choices[0]?.message?.content;

      // Extract only the HTML part from the response
      const match = aiResponse.match(/<html[\s\S]*<\/html>/i);
      aiResponse = match ? match[0] : "<h2>This universe has disconnected. Please try again.</h2>";

      console.log("🤖 AI Response Parsed:", aiResponse);
      setHtmlContent(aiResponse);
    } catch (error) {
      console.error("❌ AI Error:", error.message);
      setHtmlContent("<h2>This universe has disconnected. Please try again.</h2>");
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
        {loading ? "Looking Through the Multiverse..." : "Find New Website"}
      </button>

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
