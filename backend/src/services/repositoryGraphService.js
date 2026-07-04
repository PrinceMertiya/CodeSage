const path = require("path");

const { buildFunctionLookup } = require("./functionLookupService");

const { buildCallGraph } = require("./callGraphService");

const buildRepositoryGraph = (files) => {

    const graph = {
        nodes: [],
        edges: []
    };

    const functionLookup = buildFunctionLookup(files);
    const fileLookup = {};

    // ==========================================
    // Create File + Function + Class Nodes
    // ==========================================

    for (const file of files) {

        const normalizedPath = file.relativePath.replace(/\\/g, "/");

        fileLookup[normalizedPath] = file;

        // -------------------------
        // File Node
        // -------------------------

        graph.nodes.push({

            id: file.id,

            type: "file",

            name: file.name,

            path: normalizedPath,

            language: file.language

        });

        // -------------------------
        // Function Nodes
        // -------------------------

        if (file.structure?.functions) {

            for (const func of file.structure.functions) {

                graph.nodes.push({

                    // id: func.id,
                    id: `${normalizedPath}:${func.name}`,

                    type: "function",

                    name: func.name,

                    file: normalizedPath,

                    startLine: func.startLine,

                    endLine: func.endLine

                });

                graph.edges.push({

                    from: file.id,

                    to: `${normalizedPath}:${func.name}`,

                    type: "contains"

                });

            }

        }

        // -------------------------
        // Arrow Function Nodes
        // -------------------------

        if (file.structure?.arrowFunctions) {

            for (const func of file.structure.arrowFunctions) {

                graph.nodes.push({

                    // id: func.id,

                    id: `${normalizedPath}:${func.name}`,

                    type: "arrow-function",

                    name: func.name,

                    file: normalizedPath,

                    startLine: func.startLine,

                    endLine: func.endLine

                });

                graph.edges.push({

                    from: file.id,

                    to: `${normalizedPath}:${func.name}`,

                    type: "contains"

                });

            }

        }

        // -------------------------
        // Class Nodes
        // -------------------------

        if (file.structure?.classes) {



            for (const cls of file.structure.classes) {


                const classId = `${normalizedPath}:${cls.name}`;

                graph.nodes.push({

                    // id: cls.id,

                    id: `${normalizedPath}:${cls.name}`,

                    type: "class",

                    name: cls.name,

                    file: normalizedPath,

                    startLine: cls.startLine,

                    endLine: cls.endLine

                });

                graph.edges.push({

                    from: file.id,

                    // to: cls.id,



                    to: classId,

                    type: "contains"

                });

                // -------------------------
                // Method Nodes
                // -------------------------

                if (cls.methods) {

                    for (const method of cls.methods) {

                        // const methodId = `${cls.id}_${method}`;

                        const classId = `${normalizedPath}:${cls.name}`;

                        const methodId = `${classId}:${method}`;

                        graph.nodes.push({

                            id: methodId,

                            type: "method",

                            name: method,

                            class: cls.name

                        });

                        graph.edges.push({

                            from: classId,

                            to: methodId,

                            type: "has-method"

                        });

                    }

                }

            }

        }

    }

    // ==========================================
    // entry Level Call Relationships
    // ==========================================

    for (const file of files) {

        if (!file.structure?.topLevelCalls) continue;

        const fromId = file.id;

        for (const call of file.structure.topLevelCalls) {

            const target = functionLookup[call];

            if (!target) continue;

            const toId =
                `${target.file.relativePath.replace(/\\/g, "/")}:${target.function.name}`;

            graph.edges.push({

                from: fromId,

                to: toId,

                type: "entry"

            });

        }

    }

    // ==========================================
    // Import Relationships
    // ==========================================

    for (const file of files) {

        if (!file.structure?.imports) continue;

        const sourcePath = file.relativePath.replace(/\\/g, "/");

        const sourceId = file.id;

        for (const imported of file.structure.imports) {

            let targetPath = null;

            // Python imports

            if (file.language === "Python") {

                targetPath =
                    imported.replace(/\./g, "/") + ".py";

            }

            // JavaScript imports

            else if (file.language === "JavaScript") {

                const sourceDir = path.dirname(sourcePath);

                targetPath = path
                    .normalize(
                        path.join(sourceDir, imported)
                    )
                    .replace(/\\/g, "/");

                if (!targetPath.endsWith(".js")) {

                    targetPath += ".js";

                }

            }

            // Internal File

            const targetFile = Object.values(fileLookup).find(f =>
                f.relativePath.replace(/\\/g, "/").endsWith(targetPath)
            );

            if (targetFile) {

                graph.edges.push({

                    from: sourceId,

                    to: targetFile.id,

                    type: "imports"

                });

            }

            // External Library

            else {

                const externalId = `lib_${imported}`;

                const exists = graph.nodes.find(
                    node => node.id === externalId
                );

                if (!exists) {

                    graph.nodes.push({

                        id: externalId,

                        type: "library",

                        name: imported

                    });

                }

                graph.edges.push({

                    from: sourceId,

                    to: externalId,

                    type: "external"

                });

            }

        }

    }

    buildCallGraph(
        graph,
        files,
        functionLookup
    );

    return graph;

};

module.exports = {

    buildRepositoryGraph

};