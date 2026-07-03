const parseJavaScript = (content) => {

    console.log("JS Parser Executed");

    const result = {

        imports: [],
        classes: [],
        functions: [],
        arrowFunctions: [],
        exports: []

    };

    // ==========================
    // Regular Expressions
    // ==========================

    const requireRegex = /require\(["'`](.*?)["'`]\)/g;

    const importRegex = /import.*?from\s+["'`](.*?)["'`]/g;

    const functionRegex =
        /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;

    const arrowFunctionRegex =
        /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g;

    const classRegex =
        /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\{/g;

    const methodRegex =
        /^\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*\{/gm;

    // CommonJS
    const moduleExportRegex =
        /module\.exports\s*=\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

    const exportsRegex =
        /exports\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

    // ES Modules
    const exportDefaultRegex =
        /export\s+default\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

    const exportNamedRegex =
        /export\s*\{\s*([^}]*)\s*\}/g;

    let match;

    // ==========================
    // Imports
    // ==========================

    while ((match = moduleExportRegex.exec(content)) !== null) {

    result.exports.push(match[1]);

}
while ((match = exportsRegex.exec(content)) !== null) {

    result.exports.push(match[1]);

}
while ((match = exportDefaultRegex.exec(content)) !== null) {

    result.exports.push(match[1]);

}
while ((match = exportNamedRegex.exec(content)) !== null) {

    const exportsList = match[1]
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);

    result.exports.push(...exportsList);

}

    while ((match = requireRegex.exec(content)) !== null) {

        result.imports.push(match[1]);

    }

    while ((match = importRegex.exec(content)) !== null) {

        result.imports.push(match[1]);

    }

    // ==========================
    // Normal Functions
    // ==========================

    while ((match = functionRegex.exec(content)) !== null) {

        result.functions.push(match[1]);

    }

    // ==========================
    // Arrow Functions
    // ==========================

    while ((match = arrowFunctionRegex.exec(content)) !== null) {

        result.arrowFunctions.push(match[1]);

    }

    // ==========================
    // Classes & Methods
    // ==========================

    while ((match = classRegex.exec(content)) !== null) {

        const className = match[1];

        const startIndex = classRegex.lastIndex - 1;

        let braceCount = 1;

        let currentIndex = startIndex + 1;

        while (
            currentIndex < content.length &&
            braceCount > 0
        ) {

            if (content[currentIndex] === "{") {

                braceCount++;

            }

            else if (content[currentIndex] === "}") {

                braceCount--;

            }

            currentIndex++;

        }

        const classBody = content.substring(
            startIndex,
            currentIndex
        );

        const methods = [];

        let methodMatch;

        while (
            (methodMatch = methodRegex.exec(classBody)) !== null
        ) {

            methods.push(methodMatch[1]);

        }

        result.classes.push({

            name: className,

            methods

        });

    }

    result.imports = [...new Set(result.imports)];

    result.functions = [...new Set(result.functions)];

    result.arrowFunctions = [...new Set(result.arrowFunctions)];

    result.exports = [...new Set(result.exports)];

    return result;

};

module.exports = {
    parseJavaScript
};