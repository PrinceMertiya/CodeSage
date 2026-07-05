const path = require("path");

const generateRepositorySummary = (
    repositoryPath,
    files,
    metrics,
    entryPoint,
    deadCode,
    circularDependencies
) => {

    const summary = {

        projectName: path.basename(repositoryPath),

        projectType: "Unknown",

        languages: Object.keys(metrics.languages),

        entryPoint,

        architecture: "Unknown",

        frameworks: [],

        components: [],

        health: "★★★★★"

    };

    // ==========================================
    // Detect Frameworks
    // ==========================================

    const imports = new Set();

    for (const file of files) {

        if (!file.structure?.imports) continue;

        file.structure.imports.forEach(i => imports.add(i));

    }

    if ([...imports].some(i => i.includes("streamlit"))) {

        summary.frameworks.push("Streamlit");
        summary.projectType = "Python Web Application";

    }

    if ([...imports].some(i => i.includes("flask"))) {

        summary.frameworks.push("Flask");
        summary.projectType = "Python REST API";

    }

    if ([...imports].some(i => i.includes("fastapi"))) {

        summary.frameworks.push("FastAPI");
        summary.projectType = "Python REST API";

    }

    if ([...imports].some(i => i.includes("express"))) {

        summary.frameworks.push("Express");
        summary.projectType = "Node.js Backend";

    }

    if ([...imports].some(i => i.includes("react"))) {

        summary.frameworks.push("React");
        summary.projectType = "React Application";

    }

    // ==========================================
    // Detect Architecture
    // ==========================================

    const folders = new Set();

    files.forEach(file => {

        const parts = file.relativePath.split(/[\\/]/);

        if (parts.length > 1) {

            folders.add(parts[0]);

        }

    });

    if (folders.has("controllers") &&
        folders.has("services")) {

        summary.architecture = "Layered";

    }
    else if (folders.has("utils")) {

        summary.architecture = "Modular";

    }

    // ==========================================
    // Components
    // ==========================================

    folders.forEach(folder => {

        summary.components.push(folder);

    });

    // ==========================================
    // Repository Health
    // ==========================================

    let score = 5;

    score -= deadCode.length;

    score -= circularDependencies.length;

    if (score < 1) score = 1;

    summary.health =
        "★★★★★".substring(0, score) +
        "☆☆☆☆☆".substring(score, 5);

    return summary;

};

module.exports = {

    generateRepositorySummary

};