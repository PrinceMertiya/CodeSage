const path = require("path");

const buildRepositoryGraph = (files) => {

    const graph = {

        nodes: [],
        edges: []

    };

    const fileLookup = {};

    // ==========================
    // Create Nodes
    // ==========================

    for (const file of files) {

        const normalizedPath = file.relativePath.replace(/\\/g, "/");

        fileLookup[normalizedPath] = file;

        graph.nodes.push({

            id: file.id,

            name: file.name,

            path: normalizedPath,

            language: file.language

        });

    }

    // ==========================
    // Create Import Relationships
    // ==========================

    for (const file of files) {

        if (!file.structure || !file.structure.imports) {
            continue;
        }

        const sourcePath = file.relativePath.replace(/\\/g, "/");

        for (const imported of file.structure.imports) {

            let targetPath = null;

            // ==========================
            // Python
            // utils.parser
            // -> utils/parser.py
            // ==========================

            if (file.language === "Python") {

                targetPath =
                    imported.replace(/\./g, "/") + ".py";

            }

            // ==========================
            // JavaScript
            // ./utils/db
            // ../services/auth
            // ==========================

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

            // ==========================
            // Internal Import
            // ==========================

            const target = Object.keys(fileLookup).find(filePath =>
                filePath.endsWith(targetPath)
            );

            if (target) {

                graph.edges.push({

                    from: sourcePath,

                    to: target,

                    type: "imports"

                });

            }

            // ==========================
            // External Library
            // ==========================

            else {

                graph.edges.push({

                    from: sourcePath,

                    to: imported,

                    type: "external"

                });

            }

        }

    }

    return graph;

};

module.exports = {

    buildRepositoryGraph

};