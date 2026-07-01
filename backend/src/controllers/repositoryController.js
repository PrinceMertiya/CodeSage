const { cloneRepository } = require("../services/repositoryService");

const analyzeRepository = async (req, res) => {

    const { repositoryUrl } = req.body;

    if (!repositoryUrl.startsWith("https://github.com/")) {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required"
        });
    }

    try {

        const path = await cloneRepository(repositoryUrl);

        res.status(200).json({
            success: true,
            message: "Repository cloned successfully",
            path
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    analyzeRepository
};

