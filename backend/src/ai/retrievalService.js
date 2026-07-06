const { getProvider } = require("./providers/providerFactory");

const {
    searchSimilar
} = require("./vectorStoreService");

const retrieveContext = async (
    repositoryId,
    question
) => {

    const provider = getProvider();

    const embedding =
        await provider.generateEmbedding(question);

    const results =
        await searchSimilar(
            repositoryId,
            embedding,
            8
        );

    return results;

};

module.exports = {
    retrieveContext
};