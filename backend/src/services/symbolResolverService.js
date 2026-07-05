const path = require("path");

const resolveSymbol = (
    currentFile,
    symbol,
    files,
    functionLookup
) => {

    // -----------------------------
    // 1. Direct lookup
    // -----------------------------

    if (functionLookup[symbol]) {

        return functionLookup[symbol];

    }

    // -----------------------------
    // 2. Resolve through imports
    // -----------------------------

    if (!currentFile.structure?.imports) {

        return null;

    }

    for (const imported of currentFile.structure.imports) {

        let importPath;

        if (currentFile.language === "Python") {

            importPath =
                imported.replace(/\./g, "/") + ".py";

        }
        else {

            const currentDir =
                path.dirname(currentFile.relativePath);

            importPath = path
                .normalize(
                    path.join(currentDir, imported)
                )
                .replace(/\\/g, "/");

            if (!importPath.endsWith(".js")) {

                importPath += ".js";

            }

        }

        const targetFile = files.find(file =>
            file.relativePath
                .replace(/\\/g, "/")
                .endsWith(importPath)
        );

        if (!targetFile) {

            continue;

        }

        const targetFunction =
            (targetFile.structure?.functions || [])
                .find(func => func.name === symbol);

        if (targetFunction) {

            return {

                file: targetFile,

                function: targetFunction

            };

        }

    }

    return null;

};

module.exports = {

    resolveSymbol

};