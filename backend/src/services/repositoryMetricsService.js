const generateRepositoryMetrics = (
    files,
    repositoryGraph,
    deadCode,
    circularDependencies
) => {

    const metrics = {

        totalFiles: files.length,

        languages: {},

        totalFunctions: 0,

        totalClasses: 0,

        totalMethods: 0,

        internalLibraries: 0,

        externalLibraries: 0,

        imports: 0,

        callEdges: 0,

        deadFunctions: deadCode.length,

        circularDependencies:
            circularDependencies.length,

        entryPoints: 0

    };

    // -----------------------------
    // Languages
    // -----------------------------

    for (const file of files) {

        metrics.languages[file.language] =
            (metrics.languages[file.language] || 0) + 1;

    }

    // -----------------------------
    // Functions / Classes
    // -----------------------------

    for (const file of files) {

        if (!file.structure) continue;

        metrics.totalFunctions +=
            (file.structure.functions || []).length;

        metrics.totalClasses +=
            (file.structure.classes || []).length;

        for (const cls of file.structure.classes || []) {

            metrics.totalMethods +=
                (cls.methods || []).length;

        }

    }

    // -----------------------------
    // Graph Statistics
    // -----------------------------

    for (const edge of repositoryGraph.edges) {

        if (edge.type === "imports") {

            metrics.imports++;

        }

        if (edge.type === "calls") {

            metrics.callEdges++;

        }

    }

    for (const node of repositoryGraph.nodes) {

        if (node.type === "library") {

            metrics.externalLibraries++;

        }

    }

    return metrics;

};

module.exports = {

    generateRepositoryMetrics

};