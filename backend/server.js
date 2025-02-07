import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = process.env.PORT || 8080;

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://interdimensional-internet.pages.dev"
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Interdimensional Internet API",
      version: "1.0.0",
      description: "API for generating surreal website concepts and filling website components using AI.",
    },
  },
  apis: ["./server.js"], // Swagger will read docs from this file
};

// Initialize Swagger Docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/context:
 *   get:
 *     summary: Generate a surreal website concept
 *     description: Returns a short, unique, and absurdly professional website concept.
 *     responses:
 *       200:
 *         description: Successfully generated a website concept.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 concept:
 *                   type: string
 *                   example: "A website where time travelers review historical events like Yelp."
 *       500:
 *         description: Internal server error.
 */
app.get("/api/context", async (req, res) => {
  console.log("🔗 Received request at /api/context");
  const conceptPrompt = `
  ### **Task:**
  Generate a **unique and surreal-yet-professional website concept** following these strict rules.
  
  ---
  
  ### **Concept Guidelines:**
  1. name: must be the header of the website
  2. **Concept**: The website must be for an unusual, impossible, or absurd service that still sounds professional.
  3. **Business Model**: Explain how this fictional company would make money.
  
  ---
  
  ### **Rules:**
  - The concept must be **completely original** and **different on every request**.
  - Keep the description **concise yet detailed** (one sentince max).
  - Ensure the **website concept feels functional and viable**, even if it is absurd or imposibe.
  - DO NOT include any greetings, explanations, or unnecessary text—**only the concept**.
  - must be funny
  ---
  
  ### **Output Format (Text Response)**
  {
    name, X, concept X, business_model X
  }
  `;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: conceptPrompt}],
        max_tokens: 100,
        temperature: 1.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("🤖 OpenAI API Response Received");

    let aiResponse = response.data.choices[0]?.message?.content.trim() || "No concept generated.";

    console.log("📤 Sending Website Concept to Client:", aiResponse);
    res.json({ concept: aiResponse });
  } catch (error) {
    console.error("❌ AI Error:", error.message);
    res.status(500).json({
      error: "AI request failed. Please try again.",
      details: error.response?.data || {}
    });
  }
});

/**
 * @swagger
 * /api/fill:
 *   post:
 *     summary: Generate AI-filled content for a website component
 *     description: Takes a website context, a component name, and a token limit to generate precise AI-generated content.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               context:
 *                 type: string
 *                 example: "A time-travel agency website"
 *               tokens:
 *                 type: integer
 *                 example: 100
 *               component:
 *                 type: string
 *                 example: "About Us"
 *     responses:
 *       200:
 *         description: Successfully generated AI content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 component:
 *                   type: string
 *                   example: "About Us"
 *                 content:
 *                   type: string
 *                   example: "At ChronoJourneys, we specialize in seamless vacations through time..."
 *       400:
 *         description: Bad request, missing parameters
 *       500:
 *         description: Internal server error
 */
app.post("/api/fill", async (req, res) => {
  console.log("🔗 Received request at /api/fill");

  const { context, tokens, component } = req.body;

  if (!context || !tokens || !component) {
    return res.status(400).json({ error: "Missing required parameters: context, tokens, or component" });
  }

  const fillPrompt = `You are an AI expert web developer with the creativity and humer of the creators of Rick and Morty, dont mention Rick and morty though. Based on the concept '${context}', generate funny output for the '${component}' section, making it unique, clear, and fitting the theme.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "system", content: fillPrompt }],
        max_tokens: parseInt(tokens)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("🤖 AI Response Received for /api/fill");

    let aiResponse = response.data.choices[0]?.message?.content.trim() || "No content generated.";

    console.log("📤 Sending AI-generated content to client:", aiResponse);
    res.json({ component: component, content: aiResponse });
  } catch (error) {
    console.error("❌ AI Error:", error.message);
    res.status(500).json({
      error: "AI request failed. Please try again.",
      details: error.response?.data || {}
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
