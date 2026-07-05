module.exports = {

    provider: "gemini",

    models: {

        gemini: {

            embedding: "text-embedding-004",

            chat: "gemini-2.5-pro"

        },

        openai: {

            embedding: "text-embedding-3-small",

            chat: "gpt-5"

        }

    }

};