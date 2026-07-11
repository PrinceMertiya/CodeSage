const {
    retrieveContext
} = require("./retrievalService");

const {
    buildContext
} = require("./contextBuilderService");

const {
    buildPrompt
} = require("./promptBuilderService");

const { ApiError } = require("../utils/ApiError");


const {
    getProvider
} = require("./providers/providerFactory");

const {
    getRepository
} = require("../services/repositoryStorageService");

const {

    saveChatHistory

} = require("../analysis/chatHistoryService");

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

    throw new ApiError(

        404,
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

const sources =
    retrievedChunks.map(chunk => ({

        file: chunk.payload.file,

        title: chunk.payload.title,

        type: chunk.payload.type

    }));

await saveChatHistory(

    repositoryId,

    question,

    answer

);

return {

    answer,

    sources

};
}
module.exports = {
    askRepository
};