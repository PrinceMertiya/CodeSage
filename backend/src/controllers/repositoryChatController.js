const {
    askRepository
} = require("../ai/aiChatService");

const repositoryChat = async (req, res, next) => {

    try {

        const {

            repositoryId,

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

                question

            );

        return res.json({

            success: true,

            ...result

        });

    } catch (error) {

        // console.error(error);

        // return res.status(500).json({

        //     success: false,

        //     message: error.message

        // });

        next(error);

    }

};

module.exports = {

    repositoryChat

};