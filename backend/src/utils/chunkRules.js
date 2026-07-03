const ignoredFolders = [

    ".git",

    ".github",

    ".vscode",

    ".devcontainer",

    "node_modules",

    "__pycache__"

];

const ignoredFiles = [

    ".gitignore",

    ".editorconfig",

    "LICENSE",

    "LICENSE.md"

];

const configFiles = [

    "package.json",

    "package-lock.json",

    "requirements.txt",

    "pom.xml",

    "go.mod",

    "Cargo.toml",

    "README.md"

];

module.exports = {

    ignoredFolders,

    ignoredFiles,

    configFiles

};