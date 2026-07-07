const {
    getDashboard
} = require("../services/repositoryDashboardService");

const dashboard = async (req, res) => {

    try {

        const data =
            await getDashboard(
                req.params.id
            );

        return res.json({

            success: true,

            ...data

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

    dashboard

};