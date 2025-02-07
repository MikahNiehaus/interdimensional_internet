import React from "react";
import { useWebsiteContext } from "../../context/WebsiteContext.jsx"; // Corrected path

function Header() {
  const { websiteContext } = useWebsiteContext(); // Access global context

  // Extract the name from the `websiteContext` string
  let parsedName = "Welcome to the Interdimensional Internet Hub";
  try {
    if (websiteContext) {
      const firstColonIndex = websiteContext.indexOf(":");
      const firstCommaIndex = websiteContext.indexOf(",");
      if (firstColonIndex !== -1 && firstCommaIndex !== -1) {
        // Extract the substring after the colon and before the comma
        parsedName = websiteContext.slice(firstColonIndex + 1, firstCommaIndex).trim();
      }
    }
  } catch (error) {
    console.error("Error parsing websiteContext:", error);
  }

  return (
    <header className="header">
      <h1>{parsedName}</h1>
      <h2>
        {websiteContext
          ? "Comprehensive Services Tailored to Your Needs"
          : "Connect to infinite interdimensional websites."}
      </h2>
    </header>
  );
}

export default Header;
