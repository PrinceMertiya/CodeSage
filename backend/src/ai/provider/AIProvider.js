class AIProvider {

    async generateEmbedding(text) {

        throw new Error(
            "generateEmbedding() not implemented"
        );

    }

    async chat(messages) {

        throw new Error(
            "chat() not implemented"
        );

    }

}

module.exports = AIProvider;