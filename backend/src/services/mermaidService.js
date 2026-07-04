// =======================================
// Repository Diagram
// =======================================

const generateRepositoryDiagram = (repositoryGraph) => {

    const lines = [];

    lines.push("graph TD");

    for (const edge of repositoryGraph.edges) {

        if (edge.type !== "imports") continue;

        const from = edge.from.replace(/[^a-zA-Z0-9]/g, "_");
        const to = edge.to.replace(/[^a-zA-Z0-9]/g, "_");

        lines.push(`${from} --> ${to}`);

    }

    return lines.join("\n");

};

// =======================================
// Function Call Diagram
// =======================================

const generateFunctionDiagram = (repositoryGraph) => {

    const lines = [];

    lines.push("graph TD");

    for (const edge of repositoryGraph.edges) {

        if (edge.type !== "calls") continue;

        const from = edge.from.replace(/[^a-zA-Z0-9]/g, "_");
        const to = edge.to.replace(/[^a-zA-Z0-9]/g, "_");

        lines.push(`${from} --> ${to}`);

    }

    return lines.join("\n");

};

// =======================================
// Execution Diagram
// =======================================

const generateExecutionDiagram = (executionTree) => {

    const lines = [];

    lines.push("graph TD");

    const dfs = (node) => {

        if (!node.children) return;

        const parent =
            node.id.replace(/[^a-zA-Z0-9]/g, "_");

        for (const child of node.children) {

            const childId =
                child.id.replace(/[^a-zA-Z0-9]/g, "_");

            lines.push(`${parent} --> ${childId}`);

            dfs(child);

        }

    };

    dfs(executionTree);

    return lines.join("\n");

};

// =======================================
// Architecture Diagram
// =======================================

const generateArchitectureDiagram = (repositoryGraph) => {

    const lines = [];

    lines.push("graph LR");

    for (const edge of repositoryGraph.edges) {

        if (
            edge.type !== "imports" &&
            edge.type !== "external"
        ) continue;

        const from =
            edge.from.replace(/[^a-zA-Z0-9]/g, "_");

        const to =
            edge.to.replace(/[^a-zA-Z0-9]/g, "_");

        lines.push(`${from} --> ${to}`);

    }

    return lines.join("\n");

};

module.exports = {

    generateRepositoryDiagram,

    generateFunctionDiagram,

    generateExecutionDiagram,

    generateArchitectureDiagram

};