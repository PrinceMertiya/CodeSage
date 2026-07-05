const AIProvider = require("./AIProvider");

class OpenAIProvider extends AIProvider {

    async generateEmbedding(text) {

        throw new Error("Not implemented");

    }

    async chat(messages) {

        throw new Error("Not implemented");

    }

}

module.exports = OpenAIProvider;