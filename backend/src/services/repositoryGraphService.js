const path = require("path");


const {

    buildFunctionLookup

} = require("./functionLookupService");


const {

    buildCallGraph

} = require("./callGraphService");


/*
|--------------------------------------------------------------------------
| Normalize Path
|--------------------------------------------------------------------------
*/

const normalizePath = (

    filePath

) => {

    return filePath

        .replace(/\\/g, "/")

        .replace(/^\.\//, "");

};


/*
|--------------------------------------------------------------------------
| Resolve Internal Import
|--------------------------------------------------------------------------
*/

const resolveInternalImport = (

    sourcePath,

    importedPath,

    fileLookup

) => {


    /*
    |--------------------------------------------------------------------------
    | Only relative imports are internal
    |--------------------------------------------------------------------------
    */


    if (

        !importedPath.startsWith(".")

    ) {

        return null;

    }


    const sourceDirectory =

        path.posix.dirname(

            sourcePath

        );


    const basePath =

        normalizePath(

            path.posix.normalize(

                path.posix.join(

                    sourceDirectory,

                    importedPath

                )

            )

        );


    /*
    |--------------------------------------------------------------------------
    | Possible File Extensions
    |--------------------------------------------------------------------------
    */


    const candidates = [

        basePath,

        `${basePath}.js`,

        `${basePath}.jsx`,

        `${basePath}.ts`,

        `${basePath}.tsx`,

        `${basePath}.json`,

        `${basePath}/index.js`,

        `${basePath}/index.jsx`,

        `${basePath}/index.ts`,

        `${basePath}/index.tsx`

    ];


    for (

        const candidate

        of candidates

    ) {


        if (

            fileLookup[
                candidate
            ]

        ) {

            return (

                fileLookup[
                    candidate
                ]

            );

        }

    }


    return null;

};


/*
|--------------------------------------------------------------------------
| Build Repository Graph
|--------------------------------------------------------------------------
*/

const buildRepositoryGraph = (

    files

) => {


    const graph = {

        nodes: [],

        edges: []

    };


    const functionLookup =

        buildFunctionLookup(

            files

        );


    const fileLookup = {};


    /*
    |--------------------------------------------------------------------------
    | Create File Lookup
    |--------------------------------------------------------------------------
    */


    for (

        const file

        of files

    ) {


        const normalizedPath =

            normalizePath(

                file.relativePath

            );


        fileLookup[
            normalizedPath
        ] = file;

    }


    /*
    |--------------------------------------------------------------------------
    | Create File / Function / Class Nodes
    |--------------------------------------------------------------------------
    */


    for (

        const file

        of files

    ) {


        const normalizedPath =

            normalizePath(

                file.relativePath

            );


        /*
        |--------------------------------------------------------------------------
        | File Node
        |--------------------------------------------------------------------------
        */


        graph.nodes.push({

            id:

                file.id,

            type:

                "file",

            name:

                file.name,

            path:

                normalizedPath,

            language:

                file.language

        });


        /*
        |--------------------------------------------------------------------------
        | Normal Function Nodes
        |--------------------------------------------------------------------------
        */


        if (

            file.structure?.functions

        ) {


            for (

                const func

                of file.structure.functions

            ) {


                const functionId =

                    `${normalizedPath}:${func.name}`;


                graph.nodes.push({

                    id:

                        functionId,

                    type:

                        "function",

                    name:

                        func.name,

                    file:

                        normalizedPath,

                    startLine:

                        func.startLine,

                    endLine:

                        func.endLine

                });


                graph.edges.push({

                    from:

                        file.id,

                    to:

                        functionId,

                    type:

                        "contains"

                });

            }

        }


        /*
        |--------------------------------------------------------------------------
        | Arrow Function Nodes
        |--------------------------------------------------------------------------
        */


        if (

            file.structure?.arrowFunctions

        ) {


            for (

                const func

                of file.structure.arrowFunctions

            ) {


                const functionId =

                    `${normalizedPath}:${func.name}`;


                graph.nodes.push({

                    id:

                        functionId,

                    type:

                        "arrow-function",

                    name:

                        func.name,

                    file:

                        normalizedPath,

                    startLine:

                        func.startLine,

                    endLine:

                        func.endLine

                });


                graph.edges.push({

                    from:

                        file.id,

                    to:

                        functionId,

                    type:

                        "contains"

                });

            }

        }


        /*
        |--------------------------------------------------------------------------
        | Class Nodes
        |--------------------------------------------------------------------------
        */


        if (

            file.structure?.classes

        ) {


            for (

                const cls

                of file.structure.classes

            ) {


                const classId =

                    `${normalizedPath}:${cls.name}`;


                graph.nodes.push({

                    id:

                        classId,

                    type:

                        "class",

                    name:

                        cls.name,

                    file:

                        normalizedPath,

                    startLine:

                        cls.startLine,

                    endLine:

                        cls.endLine

                });


                graph.edges.push({

                    from:

                        file.id,

                    to:

                        classId,

                    type:

                        "contains"

                });


                /*
                |--------------------------------------------------------------------------
                | Class Method Nodes
                |--------------------------------------------------------------------------
                */


                if (

                    cls.methods

                ) {


                    for (

                        const method

                        of cls.methods

                    ) {


                        const methodId =

                            `${classId}:${method}`;


                        graph.nodes.push({

                            id:

                                methodId,

                            type:

                                "method",

                            name:

                                method,

                            class:

                                cls.name,

                            file:

                                normalizedPath

                        });


                        graph.edges.push({

                            from:

                                classId,

                            to:

                                methodId,

                            type:

                                "has-method"

                        });

                    }

                }

            }

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Import Relationships
    |--------------------------------------------------------------------------
    */


    for (

        const file

        of files

    ) {


        if (

            !file.structure?.imports

        ) {

            continue;

        }


        const sourcePath =

            normalizePath(

                file.relativePath

            );


        const sourceId =

            file.id;


        for (

            const imported

            of file.structure.imports

        ) {


            /*
            |--------------------------------------------------------------------------
            | Try Internal Import
            |--------------------------------------------------------------------------
            */


            const targetFile =

                resolveInternalImport(

                    sourcePath,

                    imported,

                    fileLookup

                );


            if (

                targetFile

            ) {


                graph.edges.push({

                    from:

                        sourceId,

                    to:

                        targetFile.id,

                    type:

                        "imports"

                });


                continue;

            }


            /*
            |--------------------------------------------------------------------------
            | Relative Import Not Resolved
            |--------------------------------------------------------------------------
            |
            | Do not mark broken relative imports as external libraries.
            |
            */


            if (

                imported.startsWith(".")

            ) {

                continue;

            }


            /*
            |--------------------------------------------------------------------------
            | External Library
            |--------------------------------------------------------------------------
            */


            const externalId =

                `lib_${imported}`;


            const exists =

                graph.nodes.some(

                    node =>

                        node.id ===
                        externalId

                );


            if (

                !exists

            ) {


                graph.nodes.push({

                    id:

                        externalId,

                    type:

                        "library",

                    name:

                        imported

                });

            }


            graph.edges.push({

                from:

                    sourceId,

                to:

                    externalId,

                type:

                    "external"

            });

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Build Function Call Graph
    |--------------------------------------------------------------------------
    */


    buildCallGraph(

        graph,

        files,

        functionLookup

    );


    return graph;

};


module.exports = {

    buildRepositoryGraph

};