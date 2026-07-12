const {
    parseJavaScript
} = require("./jsParser");

const {
    parsePython
} = require("./pythonParser");


const detectStructure = (
    language,
    content
) => {

    switch (language) {

        /*
        |--------------------------------------------------------------------------
        | JavaScript / React / TypeScript
        |--------------------------------------------------------------------------
        */

        case "JavaScript":
        case "React":
        case "TypeScript":
        case "React TypeScript":

            return parseJavaScript(
                content
            );


        /*
        |--------------------------------------------------------------------------
        | Python
        |--------------------------------------------------------------------------
        */

        case "Python":

            return parsePython(
                content
            );


        /*
        |--------------------------------------------------------------------------
        | Unsupported Languages
        |--------------------------------------------------------------------------
        */

        default:

            return {

                imports: [],

                classes: [],

                functions: [],

                arrowFunctions: [],

                exports: [],

                topLevelCalls: []

            };

    }

};


module.exports = {

    detectStructure

};