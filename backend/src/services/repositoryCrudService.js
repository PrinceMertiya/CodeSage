const prisma = require("../config/database");

const { deleteRepository } = require("../ai/vectorStoreService");



const getRepositories = async () => {

    return await prisma.repository.findMany({

        orderBy: {
            createdAt: "desc"
        },

        select: {

            id: true,

            projectName: true,

            projectType: true,

            repositoryUrl: true,

            createdAt: true,

            updatedAt: true

        }

    });

};

const getRepositoryById = async (repositoryId) => {

    return await prisma.repository.findUnique({

        where: {

            id: repositoryId

        }

    });

};


const deleteRepositoryById = async (repositoryId) => {

    // Check repository exists
    const repository =
        await prisma.repository.findUnique({

            where: {
                id: repositoryId
            }

        });

    if (!repository) {

        throw new Error("Repository not found");

    }

    // Delete vectors from Qdrant
    // await deleteRepository(repositoryId);

    // Delete from PostgreSQL
    await prisma.repository.delete({

        where: {
            id: repositoryId
        }

    });

    return {

        success: true

    };

};

module.exports = {

    getRepositories,

    getRepositoryById,

    deleteRepositoryById

};