const GeminiProvider = require("./GeminiProvider");
const OpenAIProvider = require("./OpenAIProvider");

// const config = require("../../config/aiConfig");

const config = require("../../config/aiConfig");

const getProvider = () => {

    switch (config.provider) {

        case "gemini":

            return new GeminiProvider();

        case "openai":

            return new OpenAIProvider();

        default:

            throw new Error(
                "Unsupported AI provider"
            );

    }

};

module.exports = {

    getProvider

};