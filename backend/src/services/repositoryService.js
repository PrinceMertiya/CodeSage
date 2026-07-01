const simpleGit = require("simple-git");
const path = require("path");

const git = simpleGit();

const cloneRepository = async (repositoryUrl) => {

    const repoName = repositoryUrl
        .split("/")
        .pop()
        .replace(".git", "");

    const destination = path.join(
        __dirname,
        "../../workspace",
        repoName
    );

    console.log("Cloning Repository...");
    console.log("Repository:", repoName);

    await git.clone(repositoryUrl, destination);

    console.log("Clone Completed!");

    return destination;
};

module.exports = {
    cloneRepository
};