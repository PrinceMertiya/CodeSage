const generateExecutionFlow = (repositoryGraph) => {

    const adjacency = {};

    // Build adjacency list using call edges
    for (const edge of repositoryGraph.edges) {

        if (edge.type !== "calls") continue;

        if (!adjacency[edge.from]) {

            adjacency[edge.from] = [];

        }

        adjacency[edge.from].push(edge.to);

    }

    const flows = [];

    const visited = new Set();

    const dfs = (node, path = []) => {

        if (visited.has(node)) {

            flows.push([...path, node]);

            return;

        }

        visited.add(node);

        const neighbours = adjacency[node] || [];

        if (neighbours.length === 0) {

            flows.push([...path, node]);

        }

        else {

            for (const next of neighbours) {

                dfs(next, [...path, node]);

            }

        }

        visited.delete(node);

    };

    // Start execution from every file node
    for (const node of repositoryGraph.nodes) {

        if (node.type !== "file") continue;

        dfs(node.id);

    }

    return flows;

};

module.exports = {

    generateExecutionFlow

};