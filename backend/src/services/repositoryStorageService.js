const prisma =
    require("../config/database");


const saveRepository = async ({
    userId,
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

            userId,

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


const getRepository = async (
    repositoryId,
    userId
) => {

    return await prisma.repository.findFirst({

        where: {

            id: repositoryId,

            userId

        }

    });

};


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


const updateRepository = async (
    repositoryId,
    userId,
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

    /*
     * Verify repository ownership before updating.
     */
    const existingRepository =
        await prisma.repository.findFirst({

            where: {

                id: repositoryId,

                userId

            }

        });


    if (!existingRepository) {

        throw new Error(
            "Repository not found or access denied"
        );

    }


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