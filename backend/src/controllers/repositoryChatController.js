const {
    askRepository
} = require("../ai/aiChatService");

const repositoryChat = async (req, res) => {

    try {

        const {

            repositoryId,
            // repositorySummary,
            // executionFlow,
            question

        } = req.body;

        if (!repositoryId || !question) {

            return res.status(400).json({

                success: false,
                message: "repositoryId and question are required"

            });

        }

        const result =
            await askRepository(

                repositoryId,
                repositorySummary,
                executionFlow,
                question

            );

        return res.json({

            success: true,
            ...result

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    repositoryChat

};