const { parseFunctionCalls } = require("../parsers/callParser");

console.log(
    parseFunctionCalls(
        `
        load_model();
        calculate_similarity();
        helper();
        `,
        "Python"
    )
);