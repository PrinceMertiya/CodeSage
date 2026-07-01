const fs = require('fs/promises');
const path = require('path');

const ignoredFolders =[
    ".git",
    "node_modules",
    "dist",
    "build",
    ".next",
    "coverage"
];

const scanRepository = async (repositoryPath) => {

    const results = [];

    await scanFolder(repositoryPath, results);

    return results;
};

const scanFolder = async (currentPath, results) => {

    const items = await fs.readdir(currentPath);

    for(const item of items ){

        if(ignoredFolders.includes(item)) {
            continue;
        }

        const fullPath = path.join(currentPath, item);

        const stats = await fs.stat(fullPath);

        if (stats.isFile()) {

            results.push(fullPath);

        } else if (stats.isDirectory()) {

            await scanFolder(fullPath, results);

        }

    }
};

module.exports = {
    scanRepository
}; 
