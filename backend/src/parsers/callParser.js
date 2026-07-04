const parseFunctionCalls = (content, language) => {

    let callRegex;

    if (language === "Python") {

        callRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;

    }
    else if (language === "JavaScript") {

        callRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;

    }
    else {

        return [];

    }

    const calls = [];

    let match;

    while ((match = callRegex.exec(content)) !== null) {

        const name = match[1];

        const before = content.substring(
            Math.max(0, match.index - 10),
            match.index
        );

        // Ignore declarations

        if (
            before.includes("def ") ||
            before.includes("function ") ||
            before.includes("class ")
        ) {
            continue;
        }

        calls.push(name);

    }

    return [...new Set(calls)];

};

module.exports = {
    parseFunctionCalls
};