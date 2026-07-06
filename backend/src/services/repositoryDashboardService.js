const prisma = require("../config/database");

const getDashboard = async (repositoryId) => {

    return await prisma.repository.findUnique({

        where: {

            id: repositoryId

        },

        include: {

            chats: {

                orderBy: {

                    createdAt: "desc"

                },

                take: 10

            }

        }

    });

};

module.exports = {

    getDashboard

};