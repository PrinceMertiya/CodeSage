const AIProvider = require("./AIProvider");

class GeminiProvider extends AIProvider {

    async generateEmbedding(text) {

        throw new Error("Not implemented");

    }

    async chat(messages) {

        throw new Error("Not implemented");

    }

}

module.exports = GeminiProvider;