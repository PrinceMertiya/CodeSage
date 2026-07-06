const {
    retrieveContext
} = require("./retrievalService");

const {
    buildContext
} = require("./contextBuilderService");

const {
    buildPrompt
} = require("./promptBuilderService");

const {
    getProvider
} = require("./providers/providerFactory");

const askRepository = async (
    repositoryId,
    repositorySummary,
    executionFlow,
    question
) => {

    const retrieval =
        await retrieveContext(
            repositoryId,
            question
        );

    z

    const prompt =
        buildPrompt(
            context,
            question
        );

    const provider =
        getProvider();

    const answer =
        await provider.chat([
            {
                role: "user",
                content: prompt
            }
        ]);

    return answer;

};

module.exports = {
    askRepository
};