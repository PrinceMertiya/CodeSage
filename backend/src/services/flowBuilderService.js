const buildExecutionTree = (repositoryGraph, startNode) => {

    const adjacency = {};

    for (const edge of repositoryGraph.edges) {

        if (edge.type !== "calls") continue;

        if (!adjacency[edge.from]) {

            adjacency[edge.from] = [];

        }

        adjacency[edge.from].push(edge.to);

    }

    const visited = new Set();

    const walk = (node) => {

        if (visited.has(node)) {

            return {
                id: node,
                recursive: true
            };

        }

        visited.add(node);

        return {

            id: node,

            children:
                (adjacency[node] || []).map(walk)

        };

    };

    return walk(startNode);

};

module.exports = {

    buildExecutionTree

};