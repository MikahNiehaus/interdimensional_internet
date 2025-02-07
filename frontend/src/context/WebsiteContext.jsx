import React, { createContext, useState, useContext } from "react";

const WebsiteContext = createContext();

export function useWebsiteContext() {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error("useWebsiteContext must be used within a WebsiteProvider");
  }
  return context;
}

export function WebsiteProvider({ children }) {
  const [websiteContext, setWebsiteContext] = useState(null);

  async function generateNewWebsite() {
    try {
      const response = await fetch("http://localhost:8080/api/context"); // Replace with your API URL
      const data = await response.json();
      console.log("Generated Website Context:", data.concept);
      setWebsiteContext(data.concept);
    } catch (error) {
      console.error("Error fetching website context:", error);
    }
  }

  return (
    <WebsiteContext.Provider value={{ websiteContext, generateNewWebsite }}>
      {children}
    </WebsiteContext.Provider>
  );
}
