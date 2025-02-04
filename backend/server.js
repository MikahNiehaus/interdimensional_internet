
 

import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;

// Debugging Log - Server Start
console.log("🚀 Starting Backend...");

// Improved CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://interdimensional-internet.pages.dev"
];
const prompt = `
Create a **fully functional, single-page HTML website** with **unique content and interactivity**.

### **Requirements:**
1. **Clean, Navigable UI**:
   - Use a structured layout with menus, links, and sections.
   - Apply **balanced colors, legible fonts, and intuitive design**.

2. **Unique, Pre-Filled Content**:
   - The site should appear as if it has existed for a while.
   - Include **company details, user reviews, blog posts, or product descriptions**.
   - **No placeholders or empty fields**—all sections must contain meaningful data.

3. **Distinct Website Each Time**:
   - **Every request must produce a completely different website**.
   - Each version should have a **unique theme, purpose, and functionality**.

4. **Absurd Yet Serious Execution**:
   - The site’s content should be surreal but coherent.
   - Example themes (**DO NOT reuse these**):  
     - A **travel agency for time travelers**.  
     - A **company offering impossible services**.  

5. **Standalone Code**:
   - The entire website must be built using **only HTML, CSS, and JavaScript**.
   - **No external libraries, APIs, or frameworks**.

### **Rules:**
- **Return only the code**—no explanations or comments.
- **Ensure content is pre-populated** (no blank fields).
- **Confine all interactions to a single page**.
- **The website should always be functional** regardless of user interaction.

### **Output Format:**
- Provide a **fully functional** HTML document with embedded CSS and JavaScript.
- **No comments or additional text**—only valid code.
`;
console.log("🛠️ Allowed Origins:", allowedOrigins);

app.use((req, res, next) => {
  console.log(`📢 Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🔎 Checking Origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("🚨 Blocked CORS Request from:", origin);
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.use(express.json());

// Debugging Log - Middleware Initialized
console.log("✅ Express middleware initialized");

// API Endpoint to generate HTML
app.post("/api/generate", async (req, res) => {
  console.log("🔗 Backend received request at /api/generate");
  console.log("📩 Request Body:", req.body);
  
  console.log("📝 Sending Prompt to OpenAI API:", prompt);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 4096
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("🤖 OpenAI API Response Received");
    let aiResponse = response.data.choices[0]?.message?.content || "";

    // Extract only the HTML part from the response
    const match = aiResponse.match(/<html[\s\S]*<\/html>/i);
    aiResponse = match
      ? match[0]
      : "<h2>This universe has disconnected. Please try again.</h2>";

    console.log("📤 Sending HTML response to client");
    res.json({ html: aiResponse });
  } catch (error) {
    console.error("❌ AI Error:", error.message);
    console.error("💡 Error Details:", error.response?.data || error);
    res.status(500).json({
      error: "AI request failed. Please try again.",
      details: error.response?.data || {}
    });
  }
});

// Catch-all 404 handler
app.use((req, res) => {
  console.warn("🚨 404 Not Found:", req.method, req.url);
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
