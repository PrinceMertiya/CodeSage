const buildPrompt = (
    context,
    question
) => {

    return `
You are CodeSage,
an AI software architect.

Use ONLY the provided context.

Context:

${context}

Question:

${question}
`;

};

module.exports = {
    buildPrompt
};