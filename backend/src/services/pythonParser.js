const parsePython = (content) => {

    const { parseTopLevelCalls } = require("./topLevelCallParser");

    const result = {

        imports: [],
        classes: [],
        functions: [],
        topLevelCalls: []

    };

    //     const {

    //     getLineNumber,

    //     extractContent

    // } = require("./parserUtils");

    const {
        getLineNumber,
        extractContent
    } = require("./parserUtils");





    const importRegex =
        /^import\s+(.+)$/gm;

    const fromImportRegex =
        /^from\s+([a-zA-Z0-9_\.]+)\s+import/gm;

    // const classRegex =
    //     /^class\s+([a-zA-Z_][a-zA-Z0-9_]*)/gm;

    const classRegex =
        /^class\s+([a-zA-Z_][a-zA-Z0-9_]*)[^\n]*:/gm;

    // const functionRegex =
    //     /^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm;

    const functionRegex =
        /^(?:async\s+)?def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm;

    const { parseFunctionCalls } = require("../parsers/callParser");

    let match;

    // import streamlit
    while ((match = importRegex.exec(content)) !== null) {

        const modules = match[1]
            .split(",")
            .map(item => item.trim());

        // result.imports.push(...modules);

        result.imports.push(
            match[1].split(" as ")[0].trim()
        );

    }

    // from utils import helper
    while ((match = fromImportRegex.exec(content)) !== null) {

        result.imports.push(match[1]);

    }


    const lines = content.split("\n");

    let currentClass = null;

    for (let i = 0; i < lines.length; i++) {

        const line = lines[i];

        // Leaving the class
        if (
            currentClass &&
            line.trim() !== "" &&
            /^\S/.test(line)
        ) {
            currentClass = null;
        }

        const classMatch = line.match(
            /^class\s+([a-zA-Z_][a-zA-Z0-9_]*)[^\n]*:/
        );

        if (classMatch) {

            const classIndent = line.match(/^\s*/)[0].length;

            let endLine = i + 1;

            for (let j = i + 1; j < lines.length; j++) {

                const nextLine = lines[j];

                if (nextLine.trim() === "") {
                    continue;
                }

                const indent = nextLine.match(/^\s*/)[0].length;

                if (indent <= classIndent) {

                    endLine = j;

                    break;

                }

                endLine = j + 1;
            }

            currentClass = {

    name: classMatch[1],

    startLine: i + 1,

    endLine,

    content: extractContent(
        content,
        i + 1,
        endLine
    ),

    methods: []

};

            result.classes.push(currentClass);

            continue;
        }

        const methodMatch = line.match(
            /^\s{4}(?:async\s+)?def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/
        );

        if (methodMatch && currentClass) {

            currentClass.methods.push(methodMatch[1]);

        }

    }


    while ((match = functionRegex.exec(content)) !== null) {

    const startLine = getLineNumber(
        content,
        match.index
    );

    const functionName = match[1];

    const isMethod = result.classes.some(cls =>
        cls.methods.includes(functionName)
    );

    // ---------------------------------
    // Find where the function signature ends
    // ---------------------------------

    let signatureEnd = startLine - 1;

    while (
        signatureEnd < lines.length &&
        !lines[signatureEnd].trim().endsWith(":")
    ) {
        signatureEnd++;
    }

    // const bodyIndent =
    //     signatureEnd + 1 < lines.length
    //         ? lines[signatureEnd + 1].match(/^\s*/)[0].length
    //         : 0;

    let bodyIndent = null;

for (let i = signatureEnd + 1; i < lines.length; i++) {

    if (lines[i].trim() === "") continue;

    bodyIndent =
        lines[i].match(/^\s*/)[0].length;

    break;

}

if (bodyIndent === null) {

    bodyIndent = 0;

}

    let endLine = lines.length;

    // ---------------------------------
    // Find end of function body
    // ---------------------------------

    for (let i = signatureEnd + 1; i < lines.length; i++) {

        const line = lines[i];

        if (line.trim() === "") {
            continue;
        }

        const indent =
            line.match(/^\s*/)[0].length;

        if (indent < bodyIndent) {

            endLine = i;
            break;

        }

    }

    if (!isMethod) {

        const functionContent =
            extractContent(
                content,
                startLine,
                endLine
            );

        result.functions.push({

            name: functionName,

            startLine,

            endLine,

            content: functionContent,

            calls: parseFunctionCalls(
                functionContent,
                "Python"
            )

        });

    }




    }

    result.imports = [...new Set(result.imports)];
    // result.functions = [...new Set(result.functions)];

    result.topLevelCalls =
    parseTopLevelCalls(content, "Python");

    return result;

};

module.exports = {
    parsePython
};