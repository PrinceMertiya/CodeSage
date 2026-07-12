const {
    resolveSymbol
} = require("./symbolResolverService");


const buildCallGraph = (
    graph,
    files,
    functionLookup
) => {

    const edgeKeys =
        new Set(

            graph.edges.map(

                (edge) =>

                    `${edge.from}|${edge.to}|${edge.type}`

            )

        );


    const addCallEdge = (
        from,
        to
    ) => {

        if (
            !from ||
            !to ||
            from === to
        ) {

            return;

        }


        const key =
            `${from}|${to}|calls`;


        if (
            edgeKeys.has(key)
        ) {

            return;

        }


        edgeKeys.add(key);


        graph.edges.push({

            from,

            to,

            type:
                "calls"

        });

    };


    // ==========================================
    // Function → Function Calls
    // ==========================================

    for (const file of files) {

        if (
            !file.structure
        ) {

            continue;

        }


        const normalizedPath =
            file.relativePath
                .replace(/\\/g, "/");


        const allFunctions = [

            ...(
                file.structure.functions ||
                []
            ),

            ...(
                file.structure.arrowFunctions ||
                []
            )

        ];


        for (
            const func
            of allFunctions
        ) {

            if (
                !func.name ||
                !func.calls
            ) {

                continue;

            }


            const fromId =
                `${normalizedPath}:${func.name}`;


            for (
                const call
                of func.calls
            ) {

                if (
                    !call?.name
                ) {

                    continue;

                }


                /*
                 * First try resolving the function
                 * by its actual called symbol.
                 *
                 * For object calls, this may still
                 * resolve if the method/function
                 * exists in our repository lookup.
                 */

                const target =
                    resolveSymbol(

                        file,

                        call.name,

                        files,

                        functionLookup

                    );


                if (
                    !target
                ) {

                    continue;

                }


                const targetPath =
                    target.file
                        .relativePath
                        .replace(
                            /\\/g,
                            "/"
                        );


                const toId =
                    `${targetPath}:${target.function.name}`;


                addCallEdge(

                    fromId,

                    toId

                );

            }

        }

    }


    // ==========================================
    // Top-Level Calls
    // ==========================================

    for (const file of files) {

        if (
            !file.structure
                ?.topLevelCalls
                ?.length
        ) {

            continue;

        }


        for (
            const call
            of file.structure.topLevelCalls
        ) {

            if (
                !call?.name
            ) {

                continue;

            }


            const target =
                resolveSymbol(

                    file,

                    call.name,

                    files,

                    functionLookup

                );


            if (
                !target
            ) {

                continue;

            }


            const targetPath =
                target.file
                    .relativePath
                    .replace(
                        /\\/g,
                        "/"
                    );


            const toId =
                `${targetPath}:${target.function.name}`;


            addCallEdge(

                file.id,

                toId

            );

        }

    }

};


module.exports = {

    buildCallGraph

};