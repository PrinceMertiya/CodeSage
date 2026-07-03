const getLineNumber = (content, index) => {

    return content
        .substring(0, index)
        .split("\n")
        .length;

};

module.exports = {
    getLineNumber
};