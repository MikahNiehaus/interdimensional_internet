import React, { useEffect, useState } from "react";
import { useWebsiteContext } from "../../context/WebsiteContext.jsx"; // Import global context

function AboutSection() {
  const { websiteContext } = useWebsiteContext(); // Get the current website context
  const [aboutContent, setAboutContent] = useState("Loading about section...");

  useEffect(() => {
    // Ensure we have a valid website context before making a request
    if (!websiteContext) return;

    // Fetch about content from /api/fill based on websiteContext
    const fetchAboutContent = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/fill", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            context: `Generate an engaging and professional 'About Us' section for a website with this concept: ${websiteContext}`,
            tokens: 150, // Control the length of the response
            component: "about-section",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data?.content) {
          setAboutContent(data.content); // Update about content
        } else {
          console.error("No about content returned from API.");
        }
      } catch (error) {
        console.error("Error fetching about content:", error);
      }
    };

    fetchAboutContent();
  }, [websiteContext]); // Re-fetch whenever websiteContext changes

  return (
    <section className="about-section">
      <h2>About Us</h2>
      <p dangerouslySetInnerHTML={{ __html: aboutContent }} />
    </section>
  );
}

export default AboutSection;
