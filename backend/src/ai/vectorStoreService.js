const { QdrantClient } = require("@qdrant/js-client-rest");
const config = require("../config/vectorConfig");

const client = new QdrantClient({
    url: config.qdrant.url
});

// Create collection if it doesn't exist
const createCollection = async (vectorSize) => {

    try {

        const collections =
            await client.getCollections();

        const exists =
            collections.collections.some(
                c => c.name === config.qdrant.collection
            );

        if (exists) {
            console.log("✅ Collection already exists");
            return;
        }

        await client.createCollection(
            config.qdrant.collection,
            {
                vectors: {
                    size: vectorSize,
                    distance: "Cosine"
                }
            }
        );

        console.log("✅ Collection created");

    } catch (error) {

        console.error(error);

        throw error;

    }

};

// Store vectors
const upsertChunks = async (
    repositoryId,
    embeddedChunks
) => {

    const points =
        embeddedChunks.map(chunk => ({

            id: chunk.id,

            vector: chunk.embedding,

            payload: {

                repositoryId,

                originalId: chunk.originalId,

                type: chunk.type,

                title: chunk.title,

                file: chunk.file,

                metadata: chunk.metadata,

                content: chunk.content

            }

        }));

    await client.upsert(
        config.qdrant.collection,
        {
            wait: true,
            points
        }
    );

    console.log(
        `✅ Stored ${points.length} vectors`
    );

};

// Vector Search
const searchSimilar = async (
    repositoryId,
    embedding,
    limit = 5
) => {

    return await client.search(
        config.qdrant.collection,
        {

            vector: embedding,

            limit,

            filter: {

                must: [

                    {

                        key: "repositoryId",

                        match: {

                            value: repositoryId

                        }

                    }

                ]

            }

        }
    );

};

// Delete Repository
const deleteRepository = async (
    repositoryId
) => {

    await client.delete(
        config.qdrant.collection,
        {

            filter: {

                must: [

                    {

                        key: "repositoryId",

                        match: {

                            value: repositoryId

                        }

                    }

                ]

            }

        }
    );

};

module.exports = {

    createCollection,

    upsertChunks,

    searchSimilar,

    deleteRepository

};