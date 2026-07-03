const { parseJavaScript } = require("./jsParser");
const { parsePython } = require("./pythonParser");

const detectStructure = (language, content) => {

    console.log("Language:", language);

    switch (language) {

        case "JavaScript":

            console.log("Calling JS Parser...");

            return parseJavaScript(content);

        case "Python":

            console.log("Calling Python Parser...");

            const result = parsePython(content);

            console.dir(result, { depth: null });

            return result;


        default:

            console.log("Unknown language");

            return null;

    }

};

module.exports = {
    detectStructure
};