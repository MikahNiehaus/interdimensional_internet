import axios from "axios";

// Hardcoded backend URLs
const LOCAL_BACKEND = "http://localhost:8080"; // Local backend for development
const PRODUCTION_BACKEND = "https://interdimensionalinternet-production.up.railway.app";

// Automatically select the backend based on environment
const API_URL =
  process.env.NODE_ENV === "development" ? LOCAL_BACKEND : PRODUCTION_BACKEND;

export const fetchGeneratedHtml = async (prompt) => {
  try {
    console.log(`🔍 Fetching from: ${API_URL}/api/generate`);

    const response = await axios.post(`${API_URL}/api/generate`, { prompt });
    return response.data.html;
  } catch (error) {
    console.error("❌ API Fetch Error:", error.message);
    return "<h2>Error fetching data. Please try again.</h2>";
  }
};
