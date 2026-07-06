const prisma = require("../config/database");

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

module.exports = {

    getRepositories,

    getRepositoryById

};