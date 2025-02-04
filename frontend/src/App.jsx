import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Page from "./Page"; // Component to display section content when clicked

function App() {
  const [loading, setLoading] = useState(true);
  const [context, setContext] = useState("");
  const [css, setCss] = useState("");
  const [content, setContent] = useState({
    header: "",
    home: "",
    about: "",
    services: "",
    testimonials: "",
    callToAction: "",
    footer: "",
  });
  const [currentPage, setCurrentPage] = useState(null);

  // Logging function for debugging
  const log = (message) => console.log(`📝 LOG: ${message}`);

  // Fetch AI-generated content
  const fetchAIContent = async () => {
    setLoading(true);
    log("Fetching new AI-generated website content...");

    try {
      // Fetch global context
      const uniqueWebsitePrompt = `
I want you to generate an outrageously unique and unexpected website concept that completely subverts common expectations. The idea should be absurd yet somehow functional and satirical, evoking intelligent and surreal humor.

Guidelines:
- The website should be for a niche, unconventional audience.
- It must turn an ordinary idea upside-down or present it in a ridiculous way.
- Avoid using common website ideas or real-world examples—create something completely original.
- Include a brief description of how the website works and why it (almost) makes sense.
- The humor should be dark, self-aware, and meta without referencing existing franchises.

Do not use any examples—generate three fresh, bizarre, and hilarious website ideas that fit these criteria.
`;

      log("Fetching website context...");
      const contextResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "system", content: uniqueWebsitePrompt }],
          max_tokens: 50, // Adjusted for a more detailed context
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      let newContext = contextResponse.data.choices[0]?.message?.content || "Default Website Concept";
      setContext(newContext);
      log(`Context received: ${newContext}`);

      // Fetch AI-generated CSS
      log("Fetching AI-generated CSS...");
      const cssResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "system", content: `Generate a modern, aesthetically pleasing CSS theme for a website based on this context: ${newContext}. Ensure it is visually appealing, responsive, and well-structured.` }],
          max_tokens: 100, // Adjusted for better CSS coverage
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      let newCss = cssResponse.data.choices[0]?.message?.content || "";
      setCss(newCss);
      log("CSS received.");

      // Fetch AI-generated text for each section
      const sections = ["header", "home", "about", "services", "testimonials", "callToAction", "footer"];
      const newContent = {};

      await Promise.all(sections.map(async (section) => {
        log(`Fetching content for section: ${section}`);
        const sectionResponse = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4",
            messages: [{ role: "system", content: `Generate engaging and professional content for the ${section} section of a website with this theme: ${newContext}. Ensure the text is informative and matches the website’s purpose. also make sure the amount of text is correct as well as the spacing and do not add any comments or your own additinal text outside the request also headers should only be few words and short` }],
            max_tokens: 50, // Adjusted for efficient section content
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        newContent[section] = sectionResponse.data.choices[0]?.message?.content || `No content for ${section}`;
        log(`Content for ${section}: ${newContent[section]}`);
      }));

      setContent({ ...newContent });

    } catch (error) {
      console.error("❌ AI Error:", error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAIContent(); // Fetch content on first load
  }, []);

  return (
    <div className="fullscreen-container">
      {loading ? (
        <div className="loading-screen">
          <h2>Connecting to Interdimensional website...</h2>
        </div>
      ) : currentPage ? (
        <Page title={currentPage} content={content[currentPage]} goBack={() => setCurrentPage(null)} />
      ) : (
        <div className="website-container">
          <style>{css}</style> {/* Apply AI-generated CSS */}
          <header className="header">
            <h1>{content.header}</h1>
            <nav>
              <ul>
                <li onClick={() => setCurrentPage("home")}>Home</li>
                <li onClick={() => setCurrentPage("about")}>About</li>
                <li onClick={() => setCurrentPage("services")}>Services</li>
                <li onClick={() => setCurrentPage("testimonials")}>Testimonials</li>
                <li onClick={() => setCurrentPage("callToAction")}>Contact</li>
              </ul>
            </nav>
          </header>

          <section className="home">
            <h2>{content.home}</h2>
          </section>

          <section className="about">
            <h2>About Us</h2>
            <p>{content.about}</p>
          </section>

          <section className="services">
            <h2>Our Services</h2>
            <p>{content.services}</p>
          </section>

          <section className="testimonials">
            <h2>Testimonials</h2>
            <p>{content.testimonials}</p>
          </section>

          <section className="call-to-action">
            <h2>{content.callToAction}</h2>
          </section>

          <footer className="footer">
            <p>{content.footer}</p>
          </footer>

          <button className="reload-button" onClick={fetchAIContent}>
            Go to New Website
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
