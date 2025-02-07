import React, { useEffect, useState } from "react";

function Footer() {
  const [footerContent, setFooterContent] = useState("© 2025 Butt Insurance Inc. All Rights Reserved.");
  const tokens = 30; // Number of tokens for AI response

  useEffect(() => {
    // Fetch footer content from /api/fill
    const fetchFooterContent = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/fill", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            context: "Create a professional and engaging footer for a website about Butt Insurance.",
            tokens,
            component: "footer",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data?.content) {
          setFooterContent(data.content); // Update footer content
        } else {
          console.error("No footer content returned from API.");
        }
      } catch (error) {
        console.error("Error fetching footer content:", error);
      }
    };

    fetchFooterContent();
  }, []);

  return (
    <footer className="footer">
      <p dangerouslySetInnerHTML={{ __html: footerContent }} />
    </footer>
  );
}

export default Footer;
