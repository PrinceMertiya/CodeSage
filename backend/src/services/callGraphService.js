const buildCallGraph = (
    graph,
    files,
    functionLookup
) => {

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

                const target = functionLookup[call];

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

};

module.exports = {

    buildCallGraph

};