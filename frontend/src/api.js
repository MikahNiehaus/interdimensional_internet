import axios from "axios";

const API_URL = "/api/generate"; // Vite will proxy this to the backend

export const fetchGeneratedHtml = async (prompt) => {
  try {
    const response = await axios.post(API_URL, { prompt });
    return response.data.html;
  } catch (error) {
    console.error("❌ API Fetch Error:", error.message);
    return "<h2>Error fetching data. Please try again.</h2>";
  }
};
