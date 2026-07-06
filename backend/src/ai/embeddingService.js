const { getProvider } = require("./providers/providerFactory");
const {
    createCollection,
    upsertChunks
} = require("./vectorStoreService");

// console.log(
//     "EMBEDDING:",
//     process.env.GEMINI_API_KEY
// );

const buildEmbeddingText = (chunk) => {

    return `
Type: ${chunk.type}

Title: ${chunk.title}

File: ${chunk.file || ""}

Metadata:
${JSON.stringify(chunk.metadata, null, 2)}

Content:
${chunk.content}
`;

};


const generateEmbeddings = async (repositoryId, semanticChunks) => {

    const provider = getProvider();

    const embeddedChunks = [];



    for (const chunk of semanticChunks) {

        try {

            const embedding =
                await provider.generateEmbedding(
                    buildEmbeddingText(chunk)
                );

            embeddedChunks.push({

                ...chunk,

                embedding,

                embeddingModel: "text-embedding-004",

                embeddedAt: new Date().toISOString()

            });

        } catch (error) {

            console.error(
                `Embedding failed for ${chunk.id}`,
                error.message
            );

        }

    }

    if (embeddedChunks.length > 0) {

        console.log(
            "Embedding Dimension:",
            embeddedChunks[0].embedding.length
        );

    }

    if (embeddedChunks.length > 0) {

    await createCollection(

        embeddedChunks[0].embedding.length

    );

    await upsertChunks(

        repositoryId,

        embeddedChunks

    );

}

    return embeddedChunks;

};

module.exports = {

    generateEmbeddings

};