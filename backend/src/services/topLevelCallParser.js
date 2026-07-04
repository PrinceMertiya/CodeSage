const { parseFunctionCalls } = require("../parsers/callParser");

const parseTopLevelCalls = (content, language) => {

    const lines = content.split("\n");

    const topLevelLines = [];

    let skipIndent = null;

    for (const line of lines) {

        const indent = line.match(/^\s*/)[0].length;
        const trimmed = line.trim();

        // Skip blank lines
        if (trimmed === "") {
            continue;
        }

        // Leaving a function/class block
        if (skipIndent !== null && indent <= skipIndent) {
            skipIndent = null;
        }

        // Ignore everything inside functions/classes
        if (skipIndent !== null) {
            continue;
        }

        // Function definition
        if (
            /^def\s/.test(trimmed) ||
            /^async\s+def\s/.test(trimmed)
        ) {
            skipIndent = indent;
            continue;
        }

        // Class definition
        if (/^class\s/.test(trimmed)) {
            skipIndent = indent;
            continue;
        }

        // Only keep real top-level statements
        if (indent === 0) {
            topLevelLines.push(line);
        }

    }

    const topLevelContent =
        topLevelLines.join("\n");

        console.log("========== TOP LEVEL ==========");
console.log(topLevelContent);
console.log("===============================");

    return parseFunctionCalls(
        topLevelContent,
        language
    );

};

module.exports = {

    parseTopLevelCalls

};