const parseFunctionCalls = (content, language) => {

    let callRegex;

    if (language === "Python") {

        callRegex = /([a-zA-Z_][a-zA-Z0-9_\.]*)\s*\(/g;

    }
    else if (language === "JavaScript") {

        callRegex = /([a-zA-Z_$][a-zA-Z0-9_$\.]*)\s*\(/g;

    }
    else {

        return [];

    }

    const ignored = new Set([

        "if",
        "for",
        "while",
        "return",
        "def",
        "class",
        "function",
        "import"

    ]);

    const calls = [];

    let match;

    while ((match = callRegex.exec(content)) !== null) {

        const fullName = match[1];

        const before = content.substring(
            Math.max(0, match.index - 20),
            match.index
        );

        // Ignore function definitions
        if (
            /\bdef\s+$/.test(before) ||
            /\basync\s+def\s+$/.test(before) ||
            /\bfunction\s+$/.test(before) ||
            /\bclass\s+$/.test(before)
        ) {
            continue;
        }

        const parts = fullName.split(".");

        if (parts.length === 1) {

            if (!ignored.has(parts[0])) {

                calls.push({

                    name: parts[0],

                    object: null

                });

            }

        }
        else {

            calls.push({

                object: parts.slice(0, -1).join("."),

                name: parts[parts.length - 1]

            });

        }

    }

    return calls;

};

module.exports = {

    parseFunctionCalls

};