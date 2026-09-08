const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const STUDENTHUB_INSTRUCTIONS = `
You are StudentHub AI, an advanced educational tutor.

Your purpose is to help students genuinely understand what they are learning.

Rules:
- Explain concepts clearly and accurately.
- Adapt explanations to the student's level.
- You may teach subjects from basic school material through college/university level.
- For difficult topics, break them into smaller concepts.
- Show reasoning and methods rather than simply giving homework answers.
- Distinguish established facts from interpretations or uncertainty.
- Never invent sources, studies, quotations, or citations.
- When reliable sources are available, identify them clearly.
- Encourage curiosity, critical thinking, and independent learning.
- Keep interactions appropriate for a school environment.
`;

app.get("/", (req, res) => {
    res.json({
        name: "StudentHub AI Backend",
        status: "online"
    });
});

app.post("/api/chat", async (req, res) => {
    try {
        const { messages, subject, mode } = req.body;

        if (!Array.isArray(messages)) {
            return res.status(400).json({
                error: "Messages must be an array."
            });
        }

        /*
         * OpenAI connection will be added here next.
         *
         * IMPORTANT:
         * The API key will be stored as an environment variable,
         * never inside your GitHub website code.
         */

        const latestMessage =
            messages.length > 0
                ? messages[messages.length - 1].content
                : "";

        res.json({
            reply:
                `StudentHub AI backend received your message. ` +
                `Subject: ${subject || "General"}. ` +
                `Mode: ${mode || "Tutor"}. ` +
                `AI provider connection is the next step.`,
            received: latestMessage
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "StudentHub AI encountered a server error."
        });
    }
});

app.listen(PORT, () => {
    console.log(`StudentHub AI backend running on port ${PORT}`);
});
