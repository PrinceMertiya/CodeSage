const {

    getRepositories,

    getRepositoryById

} = require("../services/repositoryCrudService");

const getAllRepositories = async (req, res) => {

    try {

        const repositories =
            await getRepositories();

        return res.json({

            success: true,

            repositories

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getRepository = async (req, res) => {

    try {

        const repository =
            await getRepositoryById(
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

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getAllRepositories,

    getRepository

};