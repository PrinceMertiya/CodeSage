const prisma = require("../config/database");


const saveChatHistory = async (
    repositoryId,
    question,
    answer,
    sources = []
) => {

    return await prisma.chatHistory.create({

        data: {

            repositoryId,

            question,

            answer,

            sources

        }

    });

};


const getChatHistory = async (
    repositoryId
) => {

    return await prisma.chatHistory.findMany({

        where: {

            repositoryId

        },

        orderBy: {

            createdAt: "desc"

        }

    });

};


module.exports = {

    saveChatHistory,

    getChatHistory

};