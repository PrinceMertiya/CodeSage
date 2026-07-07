const {

    getRepositories,

    getRepositoryById,

    deleteRepositoryById,

    reanalyzeRepository,

    getRepositoryChats

} = require("../services/repositoryCrudService");

const getAllRepositories = async (req, res,next) => {

    try {

        const repositories =
            await getRepositories();

        return res.json({

            success: true,

            repositories

        });

    } catch (error) {

        // console.error(error);

        // return res.status(500).json({

        //     success: false,

        //     message: error.message

        // });

        next(error);

    }

};

const getRepository = async (req, res , next) => {

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

        // console.error(error);

        // return res.status(500).json({

        //     success: false,

        //     message: error.message

        // });

        next(error);

    }

};
const deleteRepository = async (req, res, next) => {

    try {

        await deleteRepositoryById(

            req.params.id

        );

        return res.json({

            success: true,

            message: "Repository deleted successfully"

        });

    } catch (error) {

        // console.error(error);

        // return res.status(500).json({

        //     success: false,

        //     message: error.message

        // });

        next(error);

    }

};

const reanalyze = async (req, res ,next) => {

    try {

        const repository =
            await reanalyzeRepository(req.params.id);

        return res.json({

            success: true,

            repository

        });

    } catch (error) {

        // console.error(error);

        // return res.status(500).json({

        //     success: false,

        //     message: error.message

        // });

        next(error);

    }

};

const getChats = async (req, res, next) => {

    try {

        const history =
            await getRepositoryChats(
                req.params.id
            );

        return res.json({

            success: true,

            history

        });

    } catch (error) {

        // console.error(error);

        // return res.status(500).json({

        //     success: false,

        //     message: error.message

        // });

        next(error);

    }

};

module.exports = {

    getAllRepositories,

    getRepository,

    deleteRepository,
    
    reanalyze,

    getChats

};