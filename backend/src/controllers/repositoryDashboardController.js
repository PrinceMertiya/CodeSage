const {

    getDashboard

} = require("../services/repositoryDashboardService");

const dashboard = async (req, res) => {

    try {

        const repository =
            await getDashboard(
                req.params.id
            );

        if (!repository) {

            return res.status(404).json({

                success: false,

                message: "Repository not found"

            });

        }

        return res.json({

            success: true,

            repository

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    dashboard

};