const prisma = require("../config/database");


const findRepositoryByUrl = async (
    repositoryUrl,
    userId
) => {

    return await prisma.repository.findUnique({

        where: {

            userId_repositoryUrl: {

                userId,

                repositoryUrl

            }

        }

    });

};


const saveRepository = async (data) => {

    const {

        userId,

        repositoryUrl,

        project,

        architecture,

        repositorySummary,

        repositoryMetrics,

        executionFlow,

        repositoryGraph,

        repositoryDiagram,

        functionDiagram,

        executionDiagram,

        architectureDiagram

    } = data;


    return await prisma.repository.create({

        data: {

            userId,

            repositoryUrl,

            projectName:
                project?.projectName ||
                project?.name ||
                "Unknown Project",

            projectType:
                project?.projectType ||
                project?.type ||
                null,

            architecture:
                architecture ||
                null,

            frameworks:
                project?.frameworks ||
                [],

            project:
                project ||
                null,

            summary:
                repositorySummary ||
                null,

            metrics:
                repositoryMetrics ||
                null,

            executionFlow:
                executionFlow ||
                null,

            repositoryGraph:
                repositoryGraph ||
                null,

            repositoryDiagram:
                repositoryDiagram ||
                null,

            functionDiagram:
                functionDiagram ||
                null,

            executionDiagram:
                executionDiagram ||
                null,

            architectureDiagram:
                architectureDiagram ||
                null

        }

    });

};


const updateRepository = async (
    repositoryId,
    userId,
    data
) => {

    return await prisma.repository.update({

        where: {

            id:
                repositoryId

        },

        data: {

            repositoryUrl:
                data.repositoryUrl,

            projectName:
                data.project?.projectName ||
                data.project?.name ||
                "Unknown Project",

            projectType:
                data.project?.projectType ||
                data.project?.type ||
                null,

            architecture:
                data.architecture ||
                null,

            frameworks:
                data.project?.frameworks ||
                [],

            project:
                data.project ||
                null,

            summary:
                data.repositorySummary ||
                null,

            metrics:
                data.repositoryMetrics ||
                null,

            executionFlow:
                data.executionFlow ||
                null,

            repositoryGraph:
                data.repositoryGraph ||
                null,

            repositoryDiagram:
                data.repositoryDiagram ||
                null,

            functionDiagram:
                data.functionDiagram ||
                null,

            executionDiagram:
                data.executionDiagram ||
                null,

            architectureDiagram:
                data.architectureDiagram ||
                null

        }

    });

};


const getRepository = async (
    repositoryId
) => {

    return await prisma.repository.findUnique({

        where: {

            id:
                repositoryId

        }

    });

};


module.exports = {

    saveRepository,

    updateRepository,

    findRepositoryByUrl,

    getRepository

};