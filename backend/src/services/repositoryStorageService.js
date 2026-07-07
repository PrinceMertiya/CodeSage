const prisma = require("../config/database");

const saveRepository = async ({
    repositoryUrl,
    project,
    repositorySummary,
    repositoryMetrics,
    executionFlow,
    repositoryGraph,
    repositoryDiagram,
    functionDiagram,
    executionDiagram,
    architectureDiagram
}) => {

    return await prisma.repository.create({

        data: {

            repositoryUrl,

            projectName:
                repositorySummary.projectName,

            projectType:
                repositorySummary.projectType,

            architecture:
                repositorySummary.architecture,

            frameworks:
                repositorySummary.frameworks,

            summary:
                repositorySummary,

            metrics:
                repositoryMetrics,

            executionFlow,

            project,

            repositoryGraph,

            repositoryDiagram,

            functionDiagram,

            executionDiagram,

            architectureDiagram

        }

    });

};

const getRepository = async (repositoryId) => {

    return await prisma.repository.findUnique({

        where: {

            id: repositoryId

        }

    });

};

const findRepositoryByUrl = async (repositoryUrl) => {

    return await prisma.repository.findUnique({

        where: {
            repositoryUrl
        }

    });

};

const updateRepository = async (

    repositoryId,

    {

        repositoryUrl,

        project,

        repositorySummary,

        repositoryMetrics,

        executionFlow,

        repositoryGraph,

        repositoryDiagram,

        functionDiagram,

        executionDiagram,

        architectureDiagram

    }

) => {

    return await prisma.repository.update({

        where: {

            id: repositoryId

        },

        data: {

            repositoryUrl,

            projectName:
                repositorySummary.projectName,

            projectType:
                repositorySummary.projectType,

            architecture:
                repositorySummary.architecture,

            frameworks:
                repositorySummary.frameworks,

            summary:
                repositorySummary,

            metrics:
                repositoryMetrics,

            executionFlow,

            project,

            repositoryGraph,

            repositoryDiagram,

            functionDiagram,

            executionDiagram,

            architectureDiagram

        }

    });

};

module.exports = {

    saveRepository,

    getRepository,

    findRepositoryByUrl,

    updateRepository

};