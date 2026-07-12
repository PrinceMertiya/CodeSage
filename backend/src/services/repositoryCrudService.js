const prisma = require("../config/database");

const {
    deleteRepository
} = require("../ai/vectorStoreService");

const {
    repositoryAnalysisPipeline
} = require("../pipeline/repositoryAnalysisPipeline");

const {
    getChatHistory
} = require("../analysis/chatHistoryService");

const {
    getRepositoryFiles,
    getRepositoryFile
} = require("./repositoryFileService");

const ApiError = require("../utils/ApiError");


/*
|--------------------------------------------------------------------------
| Get All Repositories For User
|--------------------------------------------------------------------------
*/

const getRepositories = async (userId) => {

    return await prisma.repository.findMany({

        where: {
            userId
        },

        orderBy: {
            createdAt: "desc"
        },

        select: {

            id: true,

            projectName: true,

            projectType: true,

            repositoryUrl: true,

            architecture: true,

            frameworks: true,

            metrics: true,

            createdAt: true,

            updatedAt: true

        }

    });

};


/*
|--------------------------------------------------------------------------
| Get Repository By ID
|--------------------------------------------------------------------------
*/

const getRepositoryById = async (
    repositoryId,
    userId
) => {

    return await prisma.repository.findFirst({

        where: {

            id: repositoryId,

            userId

        }

    });

};


/*
|--------------------------------------------------------------------------
| Delete Repository
|--------------------------------------------------------------------------
*/

const deleteRepositoryById = async (
    repositoryId,
    userId
) => {

    const repository =
        await getRepositoryById(
            repositoryId,
            userId
        );


    if (!repository) {

        throw new ApiError(
            404,
            "Repository not found"
        );

    }


    /*
     * Delete vectors from Qdrant.
     */
    await deleteRepository(repositoryId);


    /*
     * RepositoryFile and ChatHistory rows
     * are deleted automatically because
     * Prisma relations use onDelete: Cascade.
     */
    await prisma.repository.delete({

        where: {
            id: repositoryId
        }

    });


    return {
        success: true
    };

};


/*
|--------------------------------------------------------------------------
| Reanalyze Repository
|--------------------------------------------------------------------------
*/

const reanalyzeRepository = async (
    repositoryId,
    userId
) => {

    const repository =
        await getRepositoryById(
            repositoryId,
            userId
        );


    if (!repository) {

        throw new ApiError(
            404,
            "Repository not found"
        );

    }


    /*
     * Remove previous vectors.
     */
    await deleteRepository(repositoryId);


    /*
     * Run the analysis again.
     */
    return await repositoryAnalysisPipeline(

        repository.repositoryUrl,

        {
            userId,

            forceReanalyze: true,

            existingRepositoryId:
                repository.id
        }

    );

};


/*
|--------------------------------------------------------------------------
| Get Repository Chat History
|--------------------------------------------------------------------------
*/

const getRepositoryChats = async (
    repositoryId,
    userId
) => {

    const repository =
        await getRepositoryById(
            repositoryId,
            userId
        );


    if (!repository) {

        throw new ApiError(
            404,
            "Repository not found"
        );

    }


    return await getChatHistory(
        repositoryId
    );

};


/*
|--------------------------------------------------------------------------
| Get Repository File Tree
|--------------------------------------------------------------------------
*/

const getRepositoryTree = async (
    repositoryId,
    userId
) => {

    const repository =
        await getRepositoryById(
            repositoryId,
            userId
        );


    if (!repository) {

        throw new ApiError(
            404,
            "Repository not found"
        );

    }


    const files =
        await getRepositoryFiles(
            repositoryId
        );


    return buildFileTree(files);

};


/*
|--------------------------------------------------------------------------
| Get Repository File Content
|--------------------------------------------------------------------------
*/

const getRepositoryFileContent = async (
    repositoryId,
    userId,
    relativePath
) => {

    const repository =
        await getRepositoryById(
            repositoryId,
            userId
        );


    if (!repository) {

        throw new ApiError(
            404,
            "Repository not found"
        );

    }


    if (
        !relativePath ||
        typeof relativePath !== "string"
    ) {

        throw new ApiError(
            400,
            "File path is required"
        );

    }


    const normalizedPath =
        relativePath.replace(
            /\\/g,
            "/"
        );


    const file =
        await getRepositoryFile(
            repositoryId,
            normalizedPath
        );


    if (!file) {

        throw new ApiError(
            404,
            "Repository file not found"
        );

    }


    return file;

};


/*
|--------------------------------------------------------------------------
| Build Nested File Tree
|--------------------------------------------------------------------------
*/

const buildFileTree = (files) => {

    const root = [];


    for (const file of files) {

        const normalizedPath =
            file.relativePath.replace(
                /\\/g,
                "/"
            );


        const parts =
            normalizedPath
                .split("/")
                .filter(Boolean);


        let currentLevel = root;

        let currentPath = "";


        parts.forEach(
            (
                part,
                index
            ) => {

                currentPath =
                    currentPath
                        ? `${currentPath}/${part}`
                        : part;


                const isFile =
                    index ===
                    parts.length - 1;


                let existingNode =
                    currentLevel.find(
                        (node) =>
                            node.name === part
                    );


                if (!existingNode) {

                    existingNode = {

                        id:
                            isFile
                                ? file.id
                                : `folder:${currentPath}`,

                        name:
                            part,

                        path:
                            currentPath,

                        type:
                            isFile
                                ? "file"
                                : "folder"

                    };


                    if (isFile) {

                        existingNode.extension =
                            file.extension;

                        existingNode.language =
                            file.language;

                        existingNode.size =
                            file.size;

                        existingNode.lines =
                            file.lines;

                    } else {

                        existingNode.children =
                            [];

                    }


                    currentLevel.push(
                        existingNode
                    );

                }


                if (
                    !isFile &&
                    existingNode.children
                ) {

                    currentLevel =
                        existingNode.children;

                }

            }
        );

    }


    sortFileTree(root);


    return root;

};


/*
|--------------------------------------------------------------------------
| Sort Tree: Folders First, Then Alphabetically
|--------------------------------------------------------------------------
*/

const sortFileTree = (nodes) => {

    nodes.sort(
        (a, b) => {

            if (a.type !== b.type) {

                return a.type === "folder"
                    ? -1
                    : 1;

            }


            return a.name.localeCompare(
                b.name
            );

        }
    );


    for (const node of nodes) {

        if (node.children) {

            sortFileTree(
                node.children
            );

        }

    }

};


module.exports = {

    getRepositories,

    getRepositoryById,

    deleteRepositoryById,

    reanalyzeRepository,

    getRepositoryChats,

    getRepositoryTree,

    getRepositoryFileContent

};