const parseJavaScript = (content) => {

    const result = {

        imports: [],
        classes: [],
        functions: [],
        exports: []

    };

    const requireRegex = /require\(["'`](.*?)["'`]\)/g;
    const importRegex = /import.*?from\s+["'`](.*?)["'`]/g;

    const functionRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;

    let match;

    while ((match = requireRegex.exec(content)) !== null) {
        result.imports.push(match[1]);
    }

    while ((match = importRegex.exec(content)) !== null) {
        result.imports.push(match[1]);
    }

    while ((match = functionRegex.exec(content)) !== null) {

    result.functions.push(match[1]);

}

    return result;

};

module.exports = {
    parseJavaScript
};