const { parseRequirements } = require("./pythonDependencyParser");
const { projectTypeRules } = require("../utils/projectTypeRules");

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

    for (const framework of project.framework) {

    const key = framework.toLowerCase();

    if (projectTypeRules[key]) {

        project.projectType = projectTypeRules[key];

        break;

    }

}

    return project;
};

module.exports = {
    detectProject
};