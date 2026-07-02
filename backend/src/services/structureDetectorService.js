const { parseJavaScript } = require("./jsParser");

const detectStructure = (language, content) => {

    console.log("Language:", language);

    switch (language) {

        case "JavaScript":

            console.log("Calling JS Parser...");

            return parseJavaScript(content);

        default:

            console.log("Unknown language");

            return null;

    }

};

module.exports = {
    detectStructure
};