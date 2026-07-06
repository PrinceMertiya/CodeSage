const buildContext = (
    repositorySummary,
    executionFlow,
    retrievedChunks
) => {

    let context = "";

    context +=
`Repository Summary

${JSON.stringify(repositorySummary,null,2)}

`;

    context +=
`Execution Flow

${JSON.stringify(executionFlow,null,2)}

`;

    context +=
"Relevant Semantic Chunks\n\n";

    for(const chunk of retrievedChunks){

        context +=
`File: ${chunk.payload.file}

Type: ${chunk.payload.type}

Title: ${chunk.payload.title}

${chunk.payload.content}

-----------------------------------

`;

    }

    return context;

};

module.exports = {
    buildContext
};