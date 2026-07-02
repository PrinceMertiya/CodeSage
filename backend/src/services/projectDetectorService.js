const { parseRequirements } = require("./pythonDependencyParser");

const detectProject = (files) => {

    const project = {

        primaryLanguage: null,
        framework: [],
        database: [],
        packageManager: null,
        libraries: [],
        projectType: "Unknown"

    };

    for (const file of files) {

        if (file.language === "Python") {
            project.primaryLanguage = "Python";
        }

        if (file.name === "package.json") {
            project.packageManager = "npm";
        }

        if (file.name === "requirements.txt") {

            project.packageManager = "pip";

            const pythonProject = parseRequirements(file.content);

            project.framework.push(...pythonProject.framework);
            project.database.push(...pythonProject.database);
            project.libraries.push(...pythonProject.ai);
            project.libraries.push(...pythonProject.visualization);
            project.libraries.push(...pythonProject.pdf);
        }

        if (file.name === "pom.xml") {
            project.packageManager = "Maven";
        }

        if (file.name === "go.mod") {
            project.packageManager = "Go Modules";
        }

        if (file.name === "Cargo.toml") {
            project.packageManager = "Cargo";
        }
    }

    return project;
};

module.exports = {
    detectProject
};