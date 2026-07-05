const {
    buildFunctionMetadata
} = require("./functionMetadataService");

const generateSemanticChunks = (
    files,
    repositoryGraph,
    executionFlow,
    repositorySummary
) => {

    const chunks = [];

    // ==========================================
    // Repository Summary
    // ==========================================

    chunks.push({

        id: "repository-summary",

        type: "repository-summary",

        title: repositorySummary.projectName,

        file: null,

        language: null,

        metadata: {

            projectType:
                repositorySummary.projectType,

            frameworks:
                repositorySummary.frameworks,

            architecture:
                repositorySummary.architecture,

            health:
                repositorySummary.health

        },

        content:
            JSON.stringify(
                repositorySummary,
                null,
                2
            )

    });

    // ==========================================
    // Function Chunks
    // ==========================================

    for (const file of files) {

        if (!file.structure) continue;

        const normalizedPath =
            file.relativePath.replace(/\\/g, "/");

        for (const func of file.structure.functions || []) {

            chunks.push({

                id:
                    `function:${normalizedPath}:${func.name}`,

                type: "function",

                title: func.name,

                file: normalizedPath,

                language: file.language,

                metadata:
                    buildFunctionMetadata(
                        func,
                        file
                    ),

                content: func.content

            });

        }

    }

    // ==========================================
    // Class Chunks
    // ==========================================

    for (const file of files) {

        if (!file.structure) continue;

        const normalizedPath =
            file.relativePath.replace(/\\/g, "/");

        for (const cls of file.structure.classes || []) {

            chunks.push({

                id:
                    `class:${normalizedPath}:${cls.name}`,

                type: "class",

                title: cls.name,

                file: normalizedPath,

                language: file.language,

                metadata: {

                    methods:
                        cls.methods || []

                },

                content: cls.content

            });

        }

    }

    // ==========================================
    // Execution Flow
    // ==========================================

    chunks.push({

        id: "execution-flow",

        type: "execution-flow",

        title: "Execution Flow",

        file: null,

        language: null,

        metadata: {},

        content:
            JSON.stringify(
                executionFlow,
                null,
                2
            )

    });

    // ==========================================
    // Repository Graph
    // ==========================================

    chunks.push({

        id: "architecture",

        type: "architecture",

        title: "Repository Graph",

        file: null,

        language: null,

        metadata: {

            nodes:
                repositoryGraph.nodes.length,

            edges:
                repositoryGraph.edges.length

        },

        content:
            JSON.stringify(
                repositoryGraph,
                null,
                2
            )

    });

    return chunks;

};

module.exports = {

    generateSemanticChunks

};