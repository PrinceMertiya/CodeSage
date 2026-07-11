const {

    getRepositories,

    getRepositoryById,

    deleteRepositoryById,

    reanalyzeRepository,

    getRepositoryChats,

    getRepositoryTree,

    getRepositoryFileContent

} = require("../services/repositoryCrudService");


const getAllRepositories = async (
    req,
    res,
    next
) => {

    try {

        const repositories =
            await getRepositories(
                req.user.id
            );


        return res.json({

            success: true,

            repositories

        });

    } catch (error) {

        next(error);

    }

};


const getRepository = async (
    req,
    res,
    next
) => {

    try {

        const repository =
            await getRepositoryById(

                req.params.id,

                req.user.id

            );


        if (!repository) {

            return res.status(404).json({

                success: false,

                message:
                    "Repository not found"

            });

        }


        return res.json({

            success: true,

            repository

        });

    } catch (error) {

        next(error);

    }

};


const deleteRepository = async (
    req,
    res,
    next
) => {

    try {

        await deleteRepositoryById(

            req.params.id,

            req.user.id

        );


        return res.json({

            success: true,

            message:
                "Repository deleted successfully"

        });

    } catch (error) {

        next(error);

    }

};


const reanalyze = async (
    req,
    res,
    next
) => {

    try {

        const repository =
            await reanalyzeRepository(

                req.params.id,

                req.user.id

            );


        return res.json({

            success: true,

            repository

        });

    } catch (error) {

        next(error);

    }

};


const getChats = async (
    req,
    res,
    next
) => {

    try {

        const history =
            await getRepositoryChats(

                req.params.id,

                req.user.id

            );


        return res.json({

            success: true,

            history

        });

    } catch (error) {

        next(error);

    }

};


/*
|--------------------------------------------------------------------------
| Repository Tree
|--------------------------------------------------------------------------
*/

const getTree = async (
    req,
    res,
    next
) => {

    try {

        const tree =
            await getRepositoryTree(

                req.params.id,

                req.user.id

            );


        return res.json({

            success: true,

            tree

        });

    } catch (error) {

        next(error);

    }

};


/*
|--------------------------------------------------------------------------
| Repository File
|--------------------------------------------------------------------------
*/

const getFile = async (
    req,
    res,
    next
) => {

    try {

        const file =
            await getRepositoryFileContent(

                req.params.id,

                req.user.id,

                req.query.path

            );


        return res.json({

            success: true,

            file

        });

    } catch (error) {

        next(error);

    }

};


module.exports = {

    getAllRepositories,

    getRepository,

    deleteRepository,

    reanalyze,

    getChats,

    getTree,

    getFile

};