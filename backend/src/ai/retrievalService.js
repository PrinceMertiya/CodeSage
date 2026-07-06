const { getProvider } = require("./providerFactory");

// This will later call vectorStoreService
const retrieveContext = async (
    repositoryId,
    question
) => {

    const provider = getProvider();

    // Generate embedding for the user's question
    const embedding =
        await provider.generateEmbedding(question);

    // TODO:
    // Search Qdrant using this embedding

    return {
        question,
        embedding
    };

};

module.exports = {
    retrieveContext
};