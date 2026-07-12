const path = require("path");


const normalizePath = (filePath) => {

    return filePath
        .replace(/\\/g, "/")
        .replace(/^\.\//, "");

};


const getAllFunctions = (file) => {

    return [

        ...(file.structure?.functions || []),

        ...(file.structure?.arrowFunctions || [])

    ];

};


/*
|--------------------------------------------------------------------------
| Resolve Imported File
|--------------------------------------------------------------------------
*/

const resolveImportedFile = (

    currentFile,

    imported,

    files

) => {


    /*
    |--------------------------------------------------------------------------
    | External packages cannot resolve to repository files
    |--------------------------------------------------------------------------
    */

    if (

        !imported.startsWith(".")

    ) {

        return null;

    }


    const currentPath =

        normalizePath(

            currentFile.relativePath

        );


    const currentDirectory =

        path.posix.dirname(

            currentPath

        );


    const basePath =

        normalizePath(

            path.posix.normalize(

                path.posix.join(

                    currentDirectory,

                    imported

                )

            )

        );


    const candidates = [

        basePath,

        `${basePath}.js`,

        `${basePath}.jsx`,

        `${basePath}.ts`,

        `${basePath}.tsx`,

        `${basePath}/index.js`,

        `${basePath}/index.jsx`,

        `${basePath}/index.ts`,

        `${basePath}/index.tsx`

    ];


    return (

        files.find(

            file => {

                const filePath =

                    normalizePath(

                        file.relativePath

                    );


                return candidates.includes(

                    filePath

                );

            }

        ) || null

    );

};


/*
|--------------------------------------------------------------------------
| Resolve Symbol
|--------------------------------------------------------------------------
*/

const resolveSymbol = (

    currentFile,

    symbol,

    files,

    functionLookup

) => {


    /*
    |--------------------------------------------------------------------------
    | 1. Same File
    |--------------------------------------------------------------------------
    |
    | Prefer functions from the current file.
    |
    */

    const localFunction =

        getAllFunctions(

            currentFile

        ).find(

            func =>

                func.name === symbol

        );


    if (

        localFunction

    ) {

        return {

            file:

                currentFile,

            function:

                localFunction

        };

    }


    /*
    |--------------------------------------------------------------------------
    | 2. Imported Files
    |--------------------------------------------------------------------------
    */

    for (

        const imported

        of currentFile.structure?.imports || []

    ) {


        const targetFile =

            resolveImportedFile(

                currentFile,

                imported,

                files

            );


        if (

            !targetFile

        ) {

            continue;

        }


        const targetFunction =

            getAllFunctions(

                targetFile

            ).find(

                func =>

                    func.name === symbol

            );


        if (

            targetFunction

        ) {

            return {

                file:

                    targetFile,

                function:

                    targetFunction

            };

        }

    }


    /*
    |--------------------------------------------------------------------------
    | 3. Global Fallback
    |--------------------------------------------------------------------------
    */

    const candidates =

        functionLookup[
            symbol
        ];


    if (

        Array.isArray(

            candidates

        ) &&

        candidates.length === 1

    ) {

        return candidates[0];

    }


    /*
    |--------------------------------------------------------------------------
    | Backward Compatibility
    |--------------------------------------------------------------------------
    */

    if (

        candidates &&

        !Array.isArray(

            candidates

        )

    ) {

        return candidates;

    }


    return null;

};


module.exports = {

    resolveSymbol

};