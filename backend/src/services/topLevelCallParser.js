// const { parseFunctionCalls } = require("../parsers/callParser");

// const parseTopLevelCalls = (content, language) => {

//     const lines = content.split("\n");

//     const topLevelLines = [];

//     let inFunction = false;
//     let inClass = false;

//     let inImport = false;

//     let inFunctionSignature = false;


//     let bodyIndent = 0;

//     for (const line of lines) {

//         const trimmed = line.trim();

//         if (trimmed === "") {
//             continue;
//         }

//         const indent = line.match(/^\s*/)[0].length;

//         // ------------------------------
//         // Leaving multiline import
//         // ------------------------------

//         if (inImport && trimmed === ")") {

//             inImport = false;

//             continue;

//         }

//         // ------------------------------
//         // Multiline import
//         // ------------------------------

//         if (
//             trimmed.startsWith("from ") &&
//             trimmed.includes("(")
//         ) {

//             inImport = true;

//             continue;

//         }

//         // Leaving function/class
//         if ((inFunction || inClass) && indent < bodyIndent) {
//             inFunction = false;
//             inClass = false;
//         }

//         // Skip everything inside a function/class
//         if (inFunction || inClass) {
//             continue;
//         }


//         // ------------------------------
//         // Function definition
//         // ------------------------------

//         if (
//             /^def\s/.test(trimmed) ||
//             /^async\s+def\s/.test(trimmed)
//         ) {

//             // Multiline signature
//             if (!trimmed.endsWith(":")) {

//                 inFunctionSignature = true;

//                 continue;

//             }

//             // Single-line function

//             inFunction = true;

//             bodyIndent = indent + 4;

//             continue;
//         }

//         // Class definition
//         if (/^class\s/.test(trimmed)) {
//             inClass = true;
//             bodyIndent = indent + 4;
//             continue;
//         }

//         // Skip multiline imports

//         if (inImport) {

//             continue;

//         }

//         // ------------------------------
//     // Multiline function signature
//     // ------------------------------

//     if (inFunctionSignature) {

//         if (trimmed.endsWith(":")) {

//             inFunctionSignature = false;

//             inFunction = true;

//             bodyIndent = indent + 4;

//         }

//         continue;
//     }

//         // Everything else belongs to top-level execution
//         topLevelLines.push(line);




//     }




//     const topLevelContent = topLevelLines.join("\n");

//     console.log("========== TOP LEVEL ==========");
//     console.log(topLevelContent);
//     console.log("===============================");

//     return parseFunctionCalls(
//         topLevelContent,
//         language
//     );

// };

// module.exports = {
//     parseTopLevelCalls
// };



const { parseFunctionCalls } = require("../parsers/callParser");

const State = {

    NORMAL: "NORMAL",

    IMPORT: "IMPORT",

    FUNCTION_SIGNATURE: "FUNCTION_SIGNATURE",

    FUNCTION_BODY: "FUNCTION_BODY",

    CLASS_BODY: "CLASS_BODY"

};

const parseTopLevelCalls = (content, language) => {

    const lines = content.split("\n");

    const topLevel = [];

    let state = State.NORMAL;

    let bodyIndent = 0;

    for (const line of lines) {

        const trimmed = line.trim();

        const indent = line.match(/^\s*/)[0].length;

        if (trimmed === "") {
            continue;
        }

        switch (state) {

            case State.NORMAL:

                // Multiline import
                if (
                    trimmed.startsWith("from ") &&
                    trimmed.includes("(")
                ) {

                    state = State.IMPORT;

                    break;

                }

                // Decorator
                if (trimmed.startsWith("@")) {

                    topLevel.push(line);

                    break;

                }

                // Function
                if (
                    /^async\s+def\s/.test(trimmed) ||
                    /^def\s/.test(trimmed)
                ) {

                    if (trimmed.endsWith(":")) {

                        state = State.FUNCTION_BODY;

                        bodyIndent = indent + 4;

                    }
                    else {

                        state = State.FUNCTION_SIGNATURE;

                    }

                    break;

                }

                // Class
                if (/^class\s/.test(trimmed)) {

                    state = State.CLASS_BODY;

                    bodyIndent = indent + 4;

                    break;

                }

                // Everything else is executable top-level code

                topLevel.push(line);

                break;

            case State.IMPORT:

                // Stay inside the multiline import
                if (trimmed === ")") {

                    state = State.NORMAL;

                }

                break;
            case State.FUNCTION_SIGNATURE:

                // Waiting for the function signature to end
                if (trimmed.endsWith(":")) {

                    state = State.FUNCTION_BODY;

                    bodyIndent = indent + 4;

                }

                break;

            case State.FUNCTION_BODY:

                // Leave the function body when indentation returns
                if (indent < bodyIndent) {

                    state = State.NORMAL;

                    // Reprocess this line in NORMAL state
                    if (trimmed !== "") {

                        if (
                            trimmed.startsWith("from ") &&
                            trimmed.includes("(")
                        ) {

                            state = State.IMPORT;
                            break;

                        }

                        if (
                            /^async\s+def\s/.test(trimmed) ||
                            /^def\s/.test(trimmed)
                        ) {

                            if (trimmed.endsWith(":")) {

                                state = State.FUNCTION_BODY;

                                bodyIndent = indent + 4;

                            } else {

                                state = State.FUNCTION_SIGNATURE;

                            }

                            break;

                        }

                        if (/^class\s/.test(trimmed)) {

                            state = State.CLASS_BODY;

                            bodyIndent = indent + 4;

                            break;

                        }

                        topLevel.push(line);

                    }

                }

                break;

            case State.CLASS_BODY:

                // Leave the class body
                if (indent < bodyIndent) {

                    state = State.NORMAL;

                    topLevel.push(line);

                }

                break;

        }

    }

    return parseFunctionCalls(
        topLevel.join("\n"),
        language
    );

};

module.exports = {

    parseTopLevelCalls

};