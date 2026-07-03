const getLineNumber = (content, index) => {

    return content
        .substring(0, index)
        .split("\n")
        .length;

};

const extractContent = (
    content,
    startLine,
    endLine
) => {

    return content
        .split("\n")
        .slice(startLine - 1, endLine)
        .join("\n");

};

module.exports = {

    getLineNumber,

    extractContent

};