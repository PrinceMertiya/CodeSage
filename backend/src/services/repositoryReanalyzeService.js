const { getRepository } = require("./repositoryStorageService");
const { deleteRepository } = require("../ai/vectorStoreService");
const {
    repositoryAnalysisPipeline
} = require("../pipeline/repositoryAnalysisPipeline");

const reanalyzeRepository = async (repositoryId) => {

    const repository =
        await getRepository(repositoryId);

    if (!repository) {
        throw new Error("Repository not found");
    }

    // Delete old vectors
    await deleteRepository(repositoryId);

    // Reanalyze
    return await repositoryAnalysisPipeline(

        repository.repositoryUrl,

        {
            forceReanalyze: true,
            existingRepositoryId: repository.id
        }

    );

};

module.exports = {

    reanalyzeRepository

};