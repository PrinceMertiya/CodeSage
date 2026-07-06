const {
    repositoryAnalysisPipeline
} = require("../pipeline/repositoryAnalysisPipeline");

const analyzeRepository = async (req, res) => {

    const { repositoryUrl } = req.body;

    if (!repositoryUrl) {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required"
        });
    }

    if (!repositoryUrl.startsWith("https://github.com/")) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid GitHub repository URL"
        });
    }

    try {

        const analysis =
            await repositoryAnalysisPipeline(repositoryUrl);

        return res.status(200).json({
            success: true,
            message: "Repository analyzed successfully",
            ...analysis
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
    analyzeRepository
};