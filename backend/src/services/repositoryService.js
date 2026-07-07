const simpleGit = require("simple-git");
const path = require("path");

const git = simpleGit();

const fs = require("fs");
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

    // await git.clone(repositoryUrl, destination);

    if (fs.existsSync(destination)) {

    console.log("Removing old repository...");

    fs.rmSync(destination, {

        recursive: true,

        force: true

    });

}

await git.clone(

    repositoryUrl,

    destination

);

    console.log("Clone Completed!");

    return destination;
};

module.exports = {
    cloneRepository
};