const parseJavaScript = (content) => {

    const result = {

        imports: [],
        classes: [],
        functions: [],
        arrowFunctions: [],
        exports: []

    };

    const requireRegex = /require\(["'`](.*?)["'`]\)/g;
    const importRegex = /import.*?from\s+["'`](.*?)["'`]/g;

    const functionRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    const classRegex = /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

    const methodRegex =
        /^\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*\{/gm;

    const arrowFunctionRegex =
        /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g;

    let match;

    while ((match = requireRegex.exec(content)) !== null) {
        result.imports.push(match[1]);
    }

    while ((match = importRegex.exec(content)) !== null) {
        result.imports.push(match[1]);
    }

    while ((match = classRegex.exec(content)) !== null) {

       result.classes.push({
    name: match[1],
    methods: []
       });

    }


    while ((match = functionRegex.exec(content)) !== null) {

        result.functions.push(match[1]);

    }
    while ((match = arrowFunctionRegex.exec(content)) !== null) {

        result.arrowFunctions.push(match[1]);

    }

    return result;

};

module.exports = {
    parseJavaScript
};