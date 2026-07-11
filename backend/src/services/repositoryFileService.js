const prisma =
    require("../config/database");


/*
|--------------------------------------------------------------------------
| PostgreSQL Text Sanitizer
|--------------------------------------------------------------------------
|
| PostgreSQL TEXT fields cannot contain the null character: \u0000
|
*/

const sanitizeText = (value) => {

    if (typeof value !== "string") {
        return value;
    }

    return value.replace(/\u0000/g, "");

};


/*
|--------------------------------------------------------------------------
| Save Repository Files
|--------------------------------------------------------------------------
*/

const saveRepositoryFiles = async (
    repositoryId,
    files
) => {

    if (!repositoryId) {

        throw new Error(
            "Repository ID is required to save files"
        );

    }


    if (!Array.isArray(files)) {

        throw new Error(
            "Files must be an array"
        );

    }


    if (files.length === 0) {

        return {
            count: 0
        };

    }


    const fileData =
        files.map((file) => ({

            repositoryId,

            name:
                sanitizeText(file.name),

            relativePath:
                sanitizeText(
                    file.relativePath
                ).replace(/\\/g, "/"),

            extension:
                file.extension
                    ? sanitizeText(file.extension)
                    : null,

            language:
                file.language
                    ? sanitizeText(file.language)
                    : null,

            size:
                file.size || 0,

            lines:
                file.lines || 0,

            content:
                sanitizeText(
                    file.content || ""
                ),

            structure:
                file.structure || null

        }));


    return await prisma.$transaction(
        async (tx) => {

            /*
             * Remove previous files when
             * re-analyzing a repository.
             */

            await tx.repositoryFile.deleteMany({

                where: {
                    repositoryId
                }

            });


            /*
             * Save latest repository files.
             */

            return await tx.repositoryFile.createMany({

                data: fileData

            });

        }
    );

};


/*
|--------------------------------------------------------------------------
| Get Repository Files
|--------------------------------------------------------------------------
*/

const getRepositoryFiles = async (
    repositoryId
) => {

    return await prisma.repositoryFile.findMany({

        where: {
            repositoryId
        },

        select: {

            id: true,

            name: true,

            relativePath: true,

            extension: true,

            language: true,

            size: true,

            lines: true

        },

        orderBy: {
            relativePath: "asc"
        }

    });

};


/*
|--------------------------------------------------------------------------
| Get Single Repository File
|--------------------------------------------------------------------------
*/

const getRepositoryFile = async (
    repositoryId,
    relativePath
) => {

    const normalizedPath =
        relativePath.replace(
            /\\/g,
            "/"
        );


    return await prisma.repositoryFile.findUnique({

        where: {

            repositoryId_relativePath: {

                repositoryId,

                relativePath:
                    normalizedPath

            }

        }

    });

};


module.exports = {

    saveRepositoryFiles,

    getRepositoryFiles,

    getRepositoryFile

};