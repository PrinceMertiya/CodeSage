const { cloneRepository } = require("../services/repositoryService");
const { scanRepository } = require("../services/scannerService");
const { readFiles } = require("../services/fileReaderService");

const analyzeRepository = async (req, res) => {
    const { repositoryUrl } = req.body;

    // Check if URL is provided
    if (!repositoryUrl) {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required"
        });
    }

    // Validate GitHub URL
    if (!repositoryUrl.startsWith("https://github.com/")) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid GitHub repository URL"
        });
    }

    try {
        // Clone repository
        const repositoryPath = await cloneRepository(repositoryUrl);

        // Scan repository for files
        const files = await scanRepository(repositoryPath);

        // Read file contents
        const fileContents = await readFiles(files);

        return res.status(200).json({
            success: true,
            message: "Repository analyzed successfully",
            repositoryPath,
            totalFiles: fileContents.length,
            files: fileContents
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

module.exports = {
    analyzeRepository
};

