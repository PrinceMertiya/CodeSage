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

    const ignored = new Set([

        // Python keywords
        "if",
        "for",
        "while",
        "return",
        "def",
        "class",
        "import",

        // Common built-ins
        "print",
        "open",
        "len",
        "set",
        "list",
        "dict",
        "tuple",
        "str",
        "int",
        "float",
        "round",
        "range",
        "enumerate",
        "zip",

        // Common string methods
        "split",
        "join",
        "strip",
        "lower",
        "upper",
        "append",
        "extend",
        "insert",
        "remove",
        "pop"

    ]);

    const calls = [];

    let match;

    while ((match = callRegex.exec(content)) !== null) {

        const name = match[1];

        // Ignore function definitions
        const before = content.substring(
            Math.max(0, match.index - 20),
            match.index
        );

        if (
            /\bdef\s+$/.test(before) ||
            /\basync\s+def\s+$/.test(before) ||
            /\bfunction\s+$/.test(before) ||
            /\bclass\s+$/.test(before)
        ) {
            continue;
        }

        // Ignore object.method()
        if (
            match.index > 0 &&
            content[match.index - 1] === "."
        ) {
            continue;
        }

        // Ignore built-ins
        if (ignored.has(name)) {
            continue;
        }

        calls.push(name);

    }

    return [...new Set(calls)];

};

module.exports = {
    parseFunctionCalls
};