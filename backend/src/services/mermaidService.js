/*
|--------------------------------------------------------------------------
| Mermaid Helpers
|--------------------------------------------------------------------------
*/


const sanitizeId = (

    value

) => {

    return String(

        value

    ).replace(

        /[^a-zA-Z0-9_]/g,

        "_"

    );

};


const sanitizeLabel = (

    value

) => {

    return String(

        value

    )

        .replace(

            /"/g,

            "'"

        )

        .replace(

            /\n/g,

            " "

        );

};


/*
|--------------------------------------------------------------------------
| Get Node Label
|--------------------------------------------------------------------------
*/


const getNodeLabel = (

    node

) => {


    if (

        !node

    ) {

        return "Unknown";

    }


    if (

        node.type === "file"

    ) {

        return (

            node.path ||

            node.name ||

            node.id

        );

    }


    return (

        node.name ||

        node.id

    );

};


/*
|--------------------------------------------------------------------------
| Ignore Tooling Files From Architecture
|--------------------------------------------------------------------------
*/


const isArchitectureFile = (

    node

) => {


    if (

        !node ||

        node.type !== "file"

    ) {

        return false;

    }


    const filePath =

        (

            node.path ||

            node.name ||

            ""

        ).toLowerCase();


    const excludedPatterns = [

        "eslint.config",

        "vite.config",

        "webpack.config",

        "babel.config",

        "tailwind.config",

        "postcss.config",

        "package.json",

        "package-lock.json",

        "yarn.lock",

        "pnpm-lock",

        "tsconfig",

        ".gitignore"

    ];


    return (

        !excludedPatterns.some(

            pattern =>

                filePath.includes(

                    pattern

                )

        )

    );

};


/*
|--------------------------------------------------------------------------
| Repository Diagram
|--------------------------------------------------------------------------
|
| Shows internal file-to-file imports.
|
*/


const generateRepositoryDiagram = (

    repositoryGraph

) => {


    const lines = [

        "graph TD"

    ];


    const nodeLookup =

        new Map(

            repositoryGraph.nodes.map(

                node => [

                    node.id,

                    node

                ]

            )

        );


    const addedNodes =

        new Set();


    const importEdges =

        repositoryGraph.edges.filter(

            edge =>

                edge.type ===
                "imports"

        );


    if (

        importEdges.length === 0

    ) {


        lines.push(

            'empty["No internal repository relationships detected"]'

        );


        return lines.join(

            "\n"

        );

    }


    for (

        const edge

        of importEdges

    ) {


        const sourceNode =

            nodeLookup.get(

                edge.from

            );


        const targetNode =

            nodeLookup.get(

                edge.to

            );


        if (

            !sourceNode ||

            !targetNode

        ) {

            continue;

        }


        const fromId =

            sanitizeId(

                edge.from

            );


        const toId =

            sanitizeId(

                edge.to

            );


        if (

            !addedNodes.has(

                fromId

            )

        ) {


            lines.push(

                `${fromId}["${sanitizeLabel(

                    getNodeLabel(

                        sourceNode

                    )

                )}"]`

            );


            addedNodes.add(

                fromId

            );

        }


        if (

            !addedNodes.has(

                toId

            )

        ) {


            lines.push(

                `${toId}["${sanitizeLabel(

                    getNodeLabel(

                        targetNode

                    )

                )}"]`

            );


            addedNodes.add(

                toId

            );

        }


        lines.push(

            `${fromId} --> ${toId}`

        );

    }


    return lines.join(

        "\n"

    );

};


/*
|--------------------------------------------------------------------------
| Function Call Diagram
|--------------------------------------------------------------------------
*/


const generateFunctionDiagram = (

    repositoryGraph

) => {


    const lines = [

        "graph TD"

    ];


    const nodeLookup =

        new Map(

            repositoryGraph.nodes.map(

                node => [

                    node.id,

                    node

                ]

            )

        );


    const addedNodes =

        new Set();


    const callEdges =

        repositoryGraph.edges.filter(

            edge =>

                edge.type ===
                "calls"

        );


    if (

        callEdges.length === 0

    ) {


        lines.push(

            'empty["No function call relationships detected"]'

        );


        return lines.join(

            "\n"

        );

    }


    for (

        const edge

        of callEdges

    ) {


        const sourceNode =

            nodeLookup.get(

                edge.from

            );


        const targetNode =

            nodeLookup.get(

                edge.to

            );


        const fromId =

            sanitizeId(

                edge.from

            );


        const toId =

            sanitizeId(

                edge.to

            );


        if (

            !addedNodes.has(

                fromId

            )

        ) {


            lines.push(

                `${fromId}["${sanitizeLabel(

                    getNodeLabel(

                        sourceNode || {

                            id:

                                edge.from

                        }

                    )

                )}"]`

            );


            addedNodes.add(

                fromId

            );

        }


        if (

            !addedNodes.has(

                toId

            )

        ) {


            lines.push(

                `${toId}["${sanitizeLabel(

                    getNodeLabel(

                        targetNode || {

                            id:

                                edge.to

                        }

                    )

                )}"]`

            );


            addedNodes.add(

                toId

            );

        }


        lines.push(

            `${fromId} --> ${toId}`

        );

    }


    return lines.join(

        "\n"

    );

};


/*
|--------------------------------------------------------------------------
| Execution Diagram
|--------------------------------------------------------------------------
*/


const generateExecutionDiagram = (

    executionTree

) => {


    const lines = [

        "graph TD"

    ];


    if (

        !executionTree ||

        !executionTree.id

    ) {


        lines.push(

            'empty["No execution flow detected"]'

        );


        return lines.join(

            "\n"

        );

    }


    const addedNodes =

        new Set();


    const walk = (

        node

    ) => {


        if (

            !node ||

            !node.id

        ) {

            return;

        }


        const parentId =

            sanitizeId(

                node.id

            );


        if (

            !addedNodes.has(

                parentId

            )

        ) {


            lines.push(

                `${parentId}["${sanitizeLabel(

                    node.id

                )}"]`

            );


            addedNodes.add(

                parentId

            );

        }


        if (

            !node.children

        ) {

            return;

        }


        for (

            const child

            of node.children

        ) {


            const childId =

                sanitizeId(

                    child.id

                );


            if (

                !addedNodes.has(

                    childId

                )

            ) {


                lines.push(

                    `${childId}["${sanitizeLabel(

                        child.id

                    )}"]`

                );


                addedNodes.add(

                    childId

                );

            }


            lines.push(

                `${parentId} --> ${childId}`

            );


            if (

                !child.recursive

            ) {

                walk(

                    child

                );

            }

        }

    };


    walk(

        executionTree

    );


    return lines.join(

        "\n"

    );

};


/*
|--------------------------------------------------------------------------
| Architecture Diagram
|--------------------------------------------------------------------------
|
| Shows high-level internal source-file relationships.
| Tooling/config files are excluded.
|
*/


const generateArchitectureDiagram = (

    repositoryGraph

) => {


    const lines = [

        "graph TD"

    ];


    const nodeLookup =

        new Map(

            repositoryGraph.nodes.map(

                node => [

                    node.id,

                    node

                ]

            )

        );


    const architectureEdges =

        repositoryGraph.edges.filter(

            edge => {


                if (

                    edge.type !==
                    "imports"

                ) {

                    return false;

                }


                const sourceNode =

                    nodeLookup.get(

                        edge.from

                    );


                const targetNode =

                    nodeLookup.get(

                        edge.to

                    );


                return (

                    isArchitectureFile(

                        sourceNode

                    ) &&

                    isArchitectureFile(

                        targetNode

                    )

                );

            }

        );


    if (

        architectureEdges.length === 0

    ) {


        lines.push(

            'empty["No internal architecture relationships detected"]'

        );


        return lines.join(

            "\n"

        );

    }


    const addedNodes =

        new Set();


    for (

        const edge

        of architectureEdges

    ) {


        const sourceNode =

            nodeLookup.get(

                edge.from

            );


        const targetNode =

            nodeLookup.get(

                edge.to

            );


        const fromId =

            sanitizeId(

                edge.from

            );


        const toId =

            sanitizeId(

                edge.to

            );


        if (

            !addedNodes.has(

                fromId

            )

        ) {


            lines.push(

                `${fromId}["${sanitizeLabel(

                    getNodeLabel(

                        sourceNode

                    )

                )}"]`

            );


            addedNodes.add(

                fromId

            );

        }


        if (

            !addedNodes.has(

                toId

            )

        ) {


            lines.push(

                `${toId}["${sanitizeLabel(

                    getNodeLabel(

                        targetNode

                    )

                )}"]`

            );


            addedNodes.add(

                toId

            );

        }


        lines.push(

            `${fromId} --> ${toId}`

        );

    }


    return lines.join(

        "\n"

    );

};


module.exports = {

    generateRepositoryDiagram,

    generateFunctionDiagram,

    generateExecutionDiagram,

    generateArchitectureDiagram

};