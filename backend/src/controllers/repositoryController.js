const {
    repositoryAnalysisPipeline
} = require("../pipeline/repositoryAnalysisPipeline");


const analyzeRepository = async (
    req,
    res,
    next
) => {

    try {

        const {
            repositoryUrl
        } = req.body;


        if (!repositoryUrl) {

            return res.status(400).json({
                success: false,
                message:
                    "Repository URL is required"
            });

        }


        if (
            !repositoryUrl.startsWith(
                "https://github.com/"
            )
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please provide a valid GitHub repository URL"
            });

        }


        const analysis =
            await repositoryAnalysisPipeline(
                repositoryUrl,
                {
                    userId: req.user.id
                }
            );


        return res.status(200).json({

            success: true,

            message:
                analysis.alreadyAnalyzed
                    ? "Repository already analyzed"
                    : "Repository analyzed successfully",

            ...analysis

        });

    } catch (error) {

        next(error);

    }

};


module.exports = {
    analyzeRepository
};