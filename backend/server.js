import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173", // Local frontend (for development)
  "https://interdimensional-internet.pages.dev" // Cloudflare Pages URL
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["POST"],
  credentials: true
}));

app.use(express.json());

app.post("/api/generate", async (req, res) => {
    console.log("🔗 Backend received request...");

    const prompt = `
Generate a fully interactive single-page HTML, simple CSS, and JavaScript file that creates a **completely unique, fully functional website** on every execution.

### **Core Requirements:**
1. **Structured and Professional UI:**
   - The website must have a **clean, readable, and navigable layout** with intuitive menus, links, and sections.
   - Use balanced colors, legible fonts, and an organized layout—avoid chaotic designs or visual clutter.
   - The design must remain visually coherent and functional, regardless of user interactions.

2. **Pre-Populated, Unique Content:**
   - The website must look as if it has existed for a while, with **pre-filled data** that makes it feel like a complete website.
   - Include content relevant to the theme (e.g., company details, user reviews, blog posts, or other populated sections).
   - Do not include empty fields or placeholders; all sections should have meaningful data already populated.

3. **Dynamic and Distinct Website Generation:**
   - Each generated website must have a **unique concept, style, and set of features**.
   - **Avoid repetition of features across websites.** For example:
     - If one website includes a "post comments" feature, the next website must not have anything similar.
     - New features could include company bios, interactive widgets, product catalogs, team member profiles, services offered, etc.
   - Ensure the generated features and layouts are **original and logically consistent** within the website's theme.

4. **Logical Absurdity with Serious Execution:**
   - The website’s content and purpose should be bizarre yet coherent, written as if it takes itself seriously.
   - Examples for reference (**DO NOT reuse or modify these**):
     - A mission statement promoting strange but clearly articulated goals.
     - User testimonials with humorous contradictions or surreal scenarios.

5. **404 Error Twist:**
   - Clicking any external or broken link must trigger a custom 404 message, such as:
     **"This page does not exist in your universe. Please consult a local time-traveler for assistance."**

6. **Complete Standalone Functionality:**
   - The website must work fully with **only HTML, CSS, and JavaScript**—no external dependencies or frameworks.
   - Ensure the code is self-contained and stable, so it **does not break** under any circumstances, regardless of user actions or modifications.

### **Rules:**
1. **Only reply with code.** No explanations, comments, or additional text are allowed.
2. **Ensure every website has a unique concept, style, and features.**
3. **Do NOT reuse or modify any examples provided in this prompt.**
4. **Pre-fill all website content—no placeholders or empty fields.**
5. **Every interaction or feature must remain confined to a single page.**
6. **The code must be unbreakable—no matter how the website is used or altered.**
7. **Under no circumstances are you allowed to include anything other than code.**

### **Output Format:**
- Provide the code for a complete, fully functional website using HTML, CSS, and JavaScript only.
- Do not include comments, explanations, or additional text—strictly code only.
`;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "system", content: prompt }],
                max_tokens: 4000,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        let aiResponse = response.data.choices[0]?.message?.content || "";

        // Extract only the HTML part from the response
        const match = aiResponse.match(/<html[\s\S]*<\/html>/i);
        aiResponse = match ? match[0] : "<h2>This universe has disconnected. Please try again.</h2>";

        console.log("🤖 AI Response Parsed:", aiResponse);
        res.json({ html: aiResponse });
    } catch (error) {
        console.error("❌ AI Error:", error.message);
        res.status(500).json({ error: "AI request failed. Please try again." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
