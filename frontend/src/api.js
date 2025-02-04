import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// 🔹 Fetch AI-Generated Text for Sections
export const fetchAIText = async (section, context) => {
  const prompt = `
  Using the following context: "${context}", generate engaging content for the **${section}** section of a website.
  - The content should feel **real and professional**.
  - It should match the **theme and style** of the website.
  - Do **not** include HTML or CSS, only raw text.
  `;

  return makeApiCall(prompt);
};

// 🔹 Fetch AI-Generated CSS for Better UI
export const fetchAICSS = async (context) => {
  const prompt = `
  Generate high-quality CSS styling for a professional, well-structured website with the following theme: "${context}".
  - The design should be **clean, readable, and visually appealing**.
  - Ensure good contrast, typography, and spacing.
  - Provide **only raw CSS** with no explanations or comments.
  `;

  return makeApiCall(prompt);
};

// 🔹 Fetch AI Context (for all AI calls)
export const fetchAIContext = async () => {
  const prompt = `
  Generate a **unique website concept** with a strong theme and personality.
  - The concept should be engaging, professional, and consistent.
  - Describe the **theme, purpose, and target audience**.
  - Provide this as a **one-line summary** to be used as context for all AI-generated content.
  `;

  return makeApiCall(prompt);
};

// 🔹 General Function to Call AI
const makeApiCall = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0]?.message?.content || "Error fetching AI content.";
  } catch (error) {
    console.error("❌ AI Error:", error.message);
    return "Error fetching AI content.";
  }
};
