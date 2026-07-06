const { GoogleGenerativeAI } = require("@google/generative-ai");
const AIProvider = require("./AIProvider");
const config = require("../../config/aiConfig");

class GeminiProvider extends AIProvider {

    constructor() {
        super();

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing");
        }

        this.genAI = new GoogleGenerativeAI(
            process.env.GEMINI_API_KEY
        );
    }

    async generateEmbedding(text) {

        const model = this.genAI.getGenerativeModel({
            model: config.models.gemini.embedding
        });

        const result = await model.embedContent(text);

        return result.embedding.values;

    }

    async chat(messages) {

        const model = this.genAI.getGenerativeModel({
            model: config.models.gemini.chat
        });

        const prompt = messages
            .map(m => `${m.role}: ${m.content}`)
            .join("\n");

        const result = await model.generateContent(prompt);

        return result.response.text();

    }

}

module.exports = GeminiProvider;