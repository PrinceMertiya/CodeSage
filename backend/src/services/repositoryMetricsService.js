const path = require("path");

const generateRepositoryMetrics = (
    files,
    repositoryGraph,
    deadCode = [],
    circularDependencies = []
) => {

    const metrics = {

        totalFiles: files.length,

        totalFolders: 0,

        totalLines: 0,

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


    // ==========================================
    // Files / Folders / Lines / Languages
    // ==========================================

    const folders = new Set();

    for (const file of files) {

        // -----------------------------
        // Language Count
        // -----------------------------

        const language =
            file.language || "Unknown";

        metrics.languages[language] =
            (metrics.languages[language] || 0) + 1;


        // -----------------------------
        // Line Count
        // -----------------------------

        if (
            typeof file.lines === "number"
        ) {

            metrics.totalLines +=
                file.lines;

        }
        else if (
            typeof file.content === "string"
        ) {

            metrics.totalLines +=
                file.content.length > 0
                    ? file.content.split(/\r?\n/).length
                    : 0;

        }


        // -----------------------------
        // Folder Count
        // -----------------------------

        const relativePath =
            (
                file.relativePath ||
                file.path ||
                ""
            ).replace(/\\/g, "/");

        const directory =
            path.posix.dirname(
                relativePath
            );

        if (
            directory &&
            directory !== "."
        ) {

            const parts =
                directory.split("/");

            let currentPath = "";

            for (const part of parts) {

                currentPath =
                    currentPath
                        ? `${currentPath}/${part}`
                        : part;

                folders.add(
                    currentPath
                );

            }

        }


        // -----------------------------
        // Functions
        // -----------------------------

        if (!file.structure) {

            continue;

        }

        metrics.totalFunctions +=
            (
                file.structure.functions ||
                []
            ).length;


        // Arrow functions are also functions
        metrics.totalFunctions +=
            (
                file.structure.arrowFunctions ||
                []
            ).length;


        // -----------------------------
        // Classes
        // -----------------------------

        metrics.totalClasses +=
            (
                file.structure.classes ||
                []
            ).length;


        // -----------------------------
        // Methods
        // -----------------------------

        for (
            const cls of
            file.structure.classes || []
        ) {

            metrics.totalMethods +=
                (
                    cls.methods ||
                    []
                ).length;

        }

    }


    metrics.totalFolders =
        folders.size;


    // ==========================================
    // Graph Statistics
    // ==========================================

    for (
        const edge of
        repositoryGraph.edges || []
    ) {

        // Internal file imports
        if (
            edge.type === "imports"
        ) {

            metrics.imports++;

            metrics.internalLibraries++;

        }


        // External dependencies
        if (
            edge.type === "external"
        ) {

            metrics.imports++;

        }


        // Function calls
        if (
            edge.type === "calls"
        ) {

            metrics.callEdges++;

        }


        // Entry relationships
        if (
            edge.type === "entry"
        ) {

            metrics.entryPoints++;

        }

    }


    // ==========================================
    // External Libraries
    // ==========================================

    for (
        const node of
        repositoryGraph.nodes || []
    ) {

        if (
            node.type === "library"
        ) {

            metrics.externalLibraries++;

        }

    }


    return metrics;

};


module.exports = {

    generateRepositoryMetrics

};