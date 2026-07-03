const {

    ignoredFolders,

    ignoredFiles,

    configFiles

} = require("../utils/chunkRules");

const generateChunks = (files) => {

    const chunks = [];

    for (const file of files) {

        let generatedSpecialChunk = false;

        const normalizedPath = file.relativePath.replace(/\\/g, "/");

        // Ignore folders
        const shouldIgnoreFolder = ignoredFolders.some(folder =>
            normalizedPath.startsWith(folder)
        );

        if (shouldIgnoreFolder) {
            continue;
        }

        // Ignore files
        if (ignoredFiles.includes(file.name)) {
            continue;
        }

        // Configuration files
        if (configFiles.includes(file.name)) {

            chunks.push({

                id: `chunk_${chunks.length + 1}`,

                file: file.relativePath,

                language: file.language,

                type: "config",

                name: file.name,

                content: file.content,

                metadata: {

                    lines: file.lines,

                    size: file.size

                }

            });

            continue;

        }

        // ==========================
        // Function Chunks
        // ==========================

        if (
            file.structure &&
            file.structure.functions &&
            file.structure.functions.length > 0
        ) {

            for (const func of file.structure.functions) {

                console.log("Generating function chunk:", func.name);

                generatedSpecialChunk = true;

                chunks.push({

                    id: `chunk_${chunks.length + 1}`,

                    file: file.relativePath,

                    language: file.language,

                    type: "function",

                    name: func.name,

                    structure: func,

                    metadata: {

                        lines: file.lines,

                        size: file.size

                    }

                });

            }

        }

        // ==========================
        // Class Chunks
        // ==========================

        if (
            file.structure &&
            file.structure.classes &&
            file.structure.classes.length > 0
        ) {

            for (const cls of file.structure.classes) {

                console.log("Generating class chunk:", cls.name);

                generatedSpecialChunk = true;

                chunks.push({

                    id: `chunk_${chunks.length + 1}`,

                    file: file.relativePath,

                    language: file.language,

                    type: "class",

                    name: cls.name,

                    methods: cls.methods,

                    structure: cls,

                    metadata: {

                        lines: file.lines,

                        size: file.size

                    }

                });

            }

        }

        // ==========================
        // Arrow Function Chunks
        // ==========================

        if (
            file.structure &&
            file.structure.arrowFunctions &&
            file.structure.arrowFunctions.length > 0
        ) {

            for (const func of file.structure.arrowFunctions) {

                console.log("Generating arrow function chunk:", func.name);

                generatedSpecialChunk = true;

                chunks.push({

                    id: `chunk_${chunks.length + 1}`,

                    file: file.relativePath,

                    language: file.language,

                    type: "arrow-function",

                    name: func.name,

                    structure: func,

                    metadata: {

                        lines: file.lines,

                        size: file.size

                    }

                });

            }

        }

        // ==========================
        // File Chunk (Fallback)
        // ==========================

        if (!generatedSpecialChunk) {

            chunks.push({

                id: `chunk_${chunks.length + 1}`,

                file: file.relativePath,

                language: file.language,

                type: "file",

                name: file.name,

                content: file.content,

                structure: file.structure,

                metadata: {

                    lines: file.lines,

                    size: file.size

                }

            });

        }

    }

    return chunks;

};

module.exports = {
    generateChunks
};