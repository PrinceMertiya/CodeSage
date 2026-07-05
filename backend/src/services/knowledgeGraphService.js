const buildKnowledgeGraph = (
    repositorySummary,
    repositoryMetrics,
    semanticChunks,
    repositoryGraph
) => {

    const knowledgeGraph = {
        nodes: [],
        edges: []
    };

    // ==========================================
    // Repository Node
    // ==========================================

    knowledgeGraph.nodes.push({

        id: "repository",

        type: "repository",

        name: repositorySummary.projectName

    });

    // ==========================================
    // Summary Node
    // ==========================================

    knowledgeGraph.nodes.push({

        id: "summary",

        type: "summary",

        data: repositorySummary

    });

    knowledgeGraph.edges.push({

        from: "repository",

        to: "summary",

        type: "contains"

    });

    // ==========================================
    // Metrics Node
    // ==========================================

    knowledgeGraph.nodes.push({

        id: "metrics",

        type: "metrics",

        data: repositoryMetrics

    });

    knowledgeGraph.edges.push({

        from: "repository",

        to: "metrics",

        type: "contains"

    });

    // ==========================================
    // Semantic Chunks
    // ==========================================

    for (const chunk of semanticChunks) {

        knowledgeGraph.nodes.push({

            id: chunk.id,

            type: chunk.type,

            title: chunk.title

        });

        knowledgeGraph.edges.push({

            from: "repository",

            to: chunk.id,

            type: "contains"

        });

    }

    // ==========================================
    // Repository Graph
    // ==========================================

    knowledgeGraph.nodes.push(

        ...repositoryGraph.nodes

    );

    knowledgeGraph.edges.push(

        ...repositoryGraph.edges

    );

    return knowledgeGraph;

};

module.exports = {

    buildKnowledgeGraph

};