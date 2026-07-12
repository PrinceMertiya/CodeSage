const detectArchitecture = (
    project,
    files,
    repositoryGraph
) => {

    const frameworks =
        project?.frameworks || [];

    const projectType =
        project?.projectType || "";

    const normalizedFrameworks =
        frameworks.map(
            framework =>
                String(framework)
                    .toLowerCase()
        );


    /*
    |--------------------------------------------------------------------------
    | React
    |--------------------------------------------------------------------------
    */

    if (
        normalizedFrameworks.includes(
            "react"
        ) ||
        projectType
            .toLowerCase()
            .includes("react")
    ) {

        const hasComponents =
            files.some(file =>
                file.relativePath
                    ?.replace(/\\/g, "/")
                    .includes(
                        "/components/"
                    )
            );

        const hasPages =
            files.some(file =>
                file.relativePath
                    ?.replace(/\\/g, "/")
                    .includes(
                        "/pages/"
                    )
            );


        if (
            hasComponents &&
            hasPages
        ) {

            return "Component-Based Layered Frontend Architecture";

        }


        return "Component-Based Frontend Architecture";

    }


    /*
    |--------------------------------------------------------------------------
    | Express / Node.js
    |--------------------------------------------------------------------------
    */

    if (
        normalizedFrameworks.includes(
            "express"
        ) ||
        projectType
            .toLowerCase()
            .includes("express")
    ) {

        const paths =
            files.map(file =>
                file.relativePath
                    ?.replace(
                        /\\/g,
                        "/"
                    )
                    .toLowerCase()
            );


        const hasControllers =
            paths.some(path =>
                path?.includes(
                    "/controllers/"
                )
            );

        const hasServices =
            paths.some(path =>
                path?.includes(
                    "/services/"
                )
            );

        const hasRoutes =
            paths.some(path =>
                path?.includes(
                    "/routes/"
                )
            );


        if (
            hasControllers &&
            hasServices &&
            hasRoutes
        ) {

            return "Layered Service-Oriented Backend Architecture";

        }


        return "Modular Backend Architecture";

    }


    /*
    |--------------------------------------------------------------------------
    | Next.js
    |--------------------------------------------------------------------------
    */

    if (
        normalizedFrameworks.includes(
            "next.js"
        ) ||
        normalizedFrameworks.includes(
            "next"
        )
    ) {

        return "Full-Stack Component-Based Web Architecture";

    }


    /*
    |--------------------------------------------------------------------------
    | Flask
    |--------------------------------------------------------------------------
    */

    if (
        normalizedFrameworks.includes(
            "flask"
        )
    ) {

        return "Modular Flask Web Application Architecture";

    }


    /*
    |--------------------------------------------------------------------------
    | Django
    |--------------------------------------------------------------------------
    */

    if (
        normalizedFrameworks.includes(
            "django"
        )
    ) {

        return "Model-View-Template Architecture";

    }


    /*
    |--------------------------------------------------------------------------
    | Generic Graph-Based Detection
    |--------------------------------------------------------------------------
    */

    const importEdges =
        repositoryGraph.edges.filter(
            edge =>
                edge.type ===
                "imports"
        ).length;


    if (
        importEdges > 0
    ) {

        return "Modular Dependency-Based Architecture";

    }


    return "Unknown";

};


module.exports = {

    detectArchitecture

};