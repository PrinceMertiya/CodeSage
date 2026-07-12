const buildExecutionTree = (
    repositoryGraph,
    startNode
) => {

    if (!startNode) {

        return {
            id: "unknown-entry-point",
            children: []
        };

    }


    const adjacency = {};


    // ==========================================
    // Build Execution Adjacency
    // ==========================================

    for (
        const edge
        of repositoryGraph.edges
    ) {

        /*
         * Execution can move through:
         *
         * imports:
         * file → imported file
         *
         * calls:
         * file/function → function
         */

        if (
            edge.type !== "calls" &&
            edge.type !== "imports"
        ) {

            continue;

        }


        if (
            !adjacency[edge.from]
        ) {

            adjacency[edge.from] = [];

        }


        /*
         * Avoid duplicate edges.
         */

        if (
            !adjacency[
                edge.from
            ].includes(
                edge.to
            )
        ) {

            adjacency[
                edge.from
            ].push(
                edge.to
            );

        }

    }


    // ==========================================
    // Build Tree
    // ==========================================

    const walk = (
        node,
        currentPath = new Set()
    ) => {

        /*
         * Detect recursion / circular path.
         */

        if (
            currentPath.has(node)
        ) {

            return {

                id:
                    node,

                recursive:
                    true,

                children:
                    []

            };

        }


        const nextPath =
            new Set(currentPath);


        nextPath.add(node);


        const children =
            adjacency[node] ?? [];


        return {

            id:
                node,

            children:
                children.map(

                    (child) =>

                        walk(
                            child,
                            nextPath
                        )

                )

        };

    };


    return walk(startNode);

};


module.exports = {

    buildExecutionTree

};