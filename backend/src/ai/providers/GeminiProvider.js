const { GoogleGenAI } = require("@google/genai");
const AIProvider = require("./AIProvider");
const config = require("../../config/aiConfig");

class GeminiProvider extends AIProvider {

    constructor() {
        super();

        this.ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });
    }

    async generateEmbedding(text) {

        const response =
            await this.ai.models.embedContent({

                model: config.models.gemini.embedding,

                contents: text

            });

        return response.embeddings[0].values;

    }

    async chat(messages) {

        const prompt = messages
            .map(m => `${m.role}: ${m.content}`)
            .join("\n");

        const response =
            await this.ai.models.generateContent({

                model: config.models.gemini.chat,

                contents: prompt

            });

        return response.text;

    }

}

module.exports = GeminiProvider;