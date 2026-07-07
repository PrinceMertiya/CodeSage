const {
    reanalyzeRepository
} = require("../services/repositoryReanalyzeService");

const reanalyze = async (req, res) => {

    try {

        const result =
            await reanalyzeRepository(req.params.id);

        res.json({

            success: true,

            repository: result

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    reanalyze

};