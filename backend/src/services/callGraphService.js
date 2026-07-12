const {
    resolveSymbol
} = require("./symbolResolverService");


const buildCallGraph = (
    graph,
    files,
    functionLookup
) => {

    /*
    |--------------------------------------------------------------------------
    | Existing Edge Lookup
    |--------------------------------------------------------------------------
    */

    const edgeKeys =
        new Set(

            (graph.edges || []).map(

                (edge) =>

                    `${edge.from}|${edge.to}|${edge.type}`

            )

        );


    /*
    |--------------------------------------------------------------------------
    | Add Unique Call Edge
    |--------------------------------------------------------------------------
    */

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

            type: "calls"

        });

    };


    /*
    |--------------------------------------------------------------------------
    | Convert Resolved Symbol To Graph Node ID
    |--------------------------------------------------------------------------
    */

    const getTargetId = (
        target
    ) => {

        /*
         * resolveSymbol() should normally return:
         *
         * {
         *     file,
         *     function
         * }
         *
         * Never assume that shape is valid.
         */

        if (
            !target ||
            !target.file ||
            !target.function
        ) {

            return null;

        }


        if (
            typeof target.file.relativePath
                !== "string" ||
            !target.file.relativePath
        ) {

            return null;

        }


        if (
            typeof target.function.name
                !== "string" ||
            !target.function.name
        ) {

            return null;

        }


        const targetPath =
            target.file.relativePath
                .replace(
                    /\\/g,
                    "/"
                );


        return (
            `${targetPath}:${target.function.name}`
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Function → Function Calls
    |--------------------------------------------------------------------------
    */

    for (
        const file
        of files
    ) {

        if (
            !file ||
            !file.structure ||
            typeof file.relativePath
                !== "string"
        ) {

            continue;

        }


        const normalizedPath =
            file.relativePath
                .replace(
                    /\\/g,
                    "/"
                );


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
                !func ||
                !func.name ||
                !Array.isArray(
                    func.calls
                )
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
                    !call ||
                    !call.name
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


                const toId =
                    getTargetId(
                        target
                    );


                if (
                    !toId
                ) {

                    continue;

                }


                addCallEdge(

                    fromId,

                    toId

                );

            }

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Top-Level Calls
    |--------------------------------------------------------------------------
    */

    for (
        const file
        of files
    ) {

        if (
            !file ||
            !file.id ||
            !Array.isArray(
                file.structure
                    ?.topLevelCalls
            )
        ) {

            continue;

        }


        for (
            const call
            of file.structure
                .topLevelCalls
        ) {

            if (
                !call ||
                !call.name
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


            const toId =
                getTargetId(
                    target
                );


            if (
                !toId
            ) {

                continue;

            }


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