const analyzeRepository = async (req, res) => {

    try {

        const analysis =
            await repositoryAnalysisPipeline(
                req.body.repositoryUrl
            );

        return res.json({

            success: true,

            ...analysis

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};