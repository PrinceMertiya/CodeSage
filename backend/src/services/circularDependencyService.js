const detectCircularDependencies = (repositoryGraph) => {

    const graph = {};

    // ==========================
    // Build adjacency list
    // ==========================

    for (const edge of repositoryGraph.edges) {

        if (edge.type !== "imports") continue;

        if (!graph[edge.from]) {

            graph[edge.from] = [];

        }

        graph[edge.from].push(edge.to);

    }

    const visited = new Set();

    const recursionStack = new Set();

    const cycles = [];

    const dfs = (node, path = []) => {

        if (recursionStack.has(node)) {

            const index = path.indexOf(node);

            if (index !== -1) {

                cycles.push([
                    ...path.slice(index),
                    node
                ]);

            }

            return;

        }

        if (visited.has(node)) return;

        visited.add(node);

        recursionStack.add(node);

        const neighbours = graph[node] || [];

        for (const next of neighbours) {

            dfs(
                next,
                [...path, node]
            );

        }

        recursionStack.delete(node);

    };

    for (const node of Object.keys(graph)) {

        dfs(node);

    }

    return cycles;

};

module.exports = {

    detectCircularDependencies

};