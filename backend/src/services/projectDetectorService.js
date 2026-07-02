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

    if (file.name === "package.json") {
        project.packageManager = "npm";
    }

    if (file.name === "requirements.txt") {
        project.packageManager = "pip";
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