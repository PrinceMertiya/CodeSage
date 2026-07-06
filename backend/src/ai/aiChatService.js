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

const {
    getRepository
} = require("../services/repositoryStorageService");

const askRepository = async (
    repositoryId,
    // repositorySummary,
    // executionFlow,
    question
) => {

   

    const repository =
    await getRepository(
        repositoryId
    );

if (!repository) {

    throw new Error(
        "Repository not found"
    );

}

const retrievedChunks =
    await retrieveContext(

        repositoryId,

        question

    );

    const context =
    buildContext(

        repository.summary,

        repository.executionFlow,

        retrievedChunks

    );

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