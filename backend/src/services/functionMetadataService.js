const buildFunctionMetadata = (func, file) => {

    const metadata = {

        name: func.name,

        language: file.language,

        file: file.relativePath.replace(/\\/g, "/"),

        startLine: func.startLine,

        endLine: func.endLine,

        totalLines:
            func.endLine - func.startLine + 1,

        parameters: [],

        returns: null,

        internalCalls: [],

        externalCalls: [],

        complexity: 1

    };

    // -----------------------------
    // Parameters
    // -----------------------------

    const parameterMatch =
        func.content.match(/\(([\s\S]*?)\)/);

    if (parameterMatch) {

        metadata.parameters =
            parameterMatch[1]
                .split(",")
                .map(p => p.trim())
                .filter(Boolean);

    }

    // -----------------------------
    // Return Statement
    // -----------------------------

    const returnMatch =
        func.content.match(/return\s+(.+)/);

    if (returnMatch) {

        metadata.returns =
            returnMatch[1].trim();

    }

    // -----------------------------
    // Calls
    // -----------------------------

    for (const call of func.calls || []) {

        if (typeof call === "string") {

            metadata.internalCalls.push(call);

        }

        else if (call.object) {

            metadata.externalCalls.push(

                `${call.object}.${call.name}`

            );

        }

        else {

            metadata.internalCalls.push(call.name);

        }

    }

    // -----------------------------
    // Basic Cyclomatic Complexity
    // -----------------------------

    const complexityRegex =
        /\b(if|elif|else|for|while|catch|case|&&|\|\|)\b/g;

    const matches =
        func.content.match(complexityRegex);

    metadata.complexity +=
        matches ? matches.length : 0;

    return metadata;

};

module.exports = {

    buildFunctionMetadata

};