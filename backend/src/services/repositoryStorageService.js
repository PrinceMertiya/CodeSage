const prisma = require("../config/database");

const saveRepository = async ({
    repositoryUrl,
    repositorySummary,
    repositoryMetrics,
    executionFlow
}) => {

    return await prisma.repository.create({
        data: {
            repositoryUrl,
            projectName: repositorySummary.projectName,
            projectType: repositorySummary.projectType,
            architecture: repositorySummary.architecture,
            frameworks: repositorySummary.frameworks,
            metrics: repositoryMetrics,
            summary: repositorySummary,
            executionFlow
        }
    });

};

module.exports = {
    saveRepository
};