const analyzeRepository = (req, res) => {

    const { repositoryUrl } = req.body;

    if (!repositoryUrl.startsWith("https://github.com/")) {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required."
        });
    }

    res.status(200).json({
        success: true,
        message: "Repository received",
        data: {
            repositoryUrl
        }
    });

};

module.exports = {
    analyzeRepository
};