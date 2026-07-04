const { parseFunctionCalls } = require("../parsers/callParser");

const parseTopLevelCalls = (content, language) => {

    const lines = content.split("\n");

    const topLevelLines = [];

    let insideBlock = false;
    let blockIndent = 0;

    for (const line of lines) {

        const trimmed = line.trim();

        // Keep blank lines
        if (trimmed === "") {
            if (!insideBlock) {
                topLevelLines.push(line);
            }
            continue;
        }

        const indent = line.match(/^\s*/)[0].length;

        // Detect function/class definition
        if (
            /^\s*(?:async\s+)?def\s+/.test(line) ||
            /^\s*class\s+/.test(line)
        ) {
            insideBlock = true;
            blockIndent = indent;
            continue;
        }

        // Leaving a function/class block
        if (
            insideBlock &&
            indent <= blockIndent &&
            !/^\s/.test(line)
        ) {
            insideBlock = false;
        }

        if (!insideBlock) {
            topLevelLines.push(line);
        }
    }

    return [
        ...new Set(
            parseFunctionCalls(
                topLevelLines.join("\n"),
                language
            )
        )
    ];

};

module.exports = {
    parseTopLevelCalls
};