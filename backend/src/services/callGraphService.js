const {
    resolveSymbol
} = require("./symbolResolverService");

const buildCallGraph = (
    graph,
    files,
    functionLookup
) => {

    // ==========================================
    // Function → Function Calls
    // ==========================================

    for (const file of files) {

        if (!file.structure) continue;

        const normalizedPath =
            file.relativePath.replace(/\\/g, "/");

        const allFunctions = [

            ...(file.structure.functions || []),

            ...(file.structure.arrowFunctions || [])

        ];

        for (const func of allFunctions) {

            if (!func.calls) continue;

            const fromId =
                `${normalizedPath}:${func.name}`;

            for (const call of func.calls) {

                // Ignore object calls
                if (call.object) continue;

                const target = resolveSymbol(

                    file,

                    call.name,

                    files,

                    functionLookup

                );

                if (!target) continue;

                const targetPath =
                    target.file.relativePath.replace(/\\/g, "/");

                const toId =
                    `${targetPath}:${target.function.name}`;

                graph.edges.push({

                    from: fromId,

                    to: toId,

                    type: "calls"

                });

            }

        }

    }

    // ==========================================
    // Top Level Calls
    // ==========================================

    for (const file of files) {

        if (!file.structure?.topLevelCalls) continue;

        for (const call of file.structure.topLevelCalls) {

            if (call.object) continue;

            const target = resolveSymbol(

                file,

                call.name,

                files,

                functionLookup

            );

            if (!target) continue;

            const toId =
                `${target.file.relativePath.replace(/\\/g, "/")}:${target.function.name}`;

            graph.edges.push({

                from: file.id,

                to: toId,

                type: "calls"

            });

        }

    }

};

module.exports = {

    buildCallGraph

};