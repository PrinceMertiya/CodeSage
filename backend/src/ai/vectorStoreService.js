const { QdrantClient } = require("@qdrant/js-client-rest");

const config = require("../config/vectorConfig");

const client = new QdrantClient({

    url: config.qdrant.url

});

const createCollection = async () => {

    try {

        await client.createCollection(

            config.qdrant.collection,

            {

                vectors: {

                    size: 768,

                    distance: "Cosine"

                }

            }

        );

    } catch (error) {

        console.log("Collection already exists");

    }

};

const upsertChunks = async (
    repositoryId,
    embeddedChunks
) => {

    const points = embeddedChunks.map(chunk => ({

        id: chunk.id,

        vector: chunk.embedding,

        payload: {

            repositoryId,

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

};

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
module.exports = {

    createCollection,

    upsertChunks,

    searchSimilar

};