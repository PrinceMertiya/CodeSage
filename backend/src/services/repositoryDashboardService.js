const prisma = require("../config/database");

const getDashboard = async (repositoryId) => {

    const repository =
        await prisma.repository.findUnique({

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

    if (!repository) {

        throw new Error(
            "Repository not found"
        );

    }

    return {

        repository,

        summary:
            repository.summary,

        metrics:
            repository.metrics,

        executionFlow:
            repository.executionFlow,

        repositoryGraph:
            repository.repositoryGraph,

        diagrams: {

            repository:
                repository.repositoryDiagram,

            function:
                repository.functionDiagram,

            execution:
                repository.executionDiagram,

            architecture:
                repository.architectureDiagram

        },

        recentChats:
            repository.chats

    };

};

module.exports = {

    getDashboard

};