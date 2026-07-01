const fs = require("fs/promises");
const path = require("path");

const readFiles = async (files) => {

    const result = [];

    for (const file of files) {

        const content = await fs.readFile(file, "utf8");

        result.push({

            name: path.basename(file),

            path: file,

            extension: path.extname(file),

            content

        });

    }

    return result;

};

module.exports = {
    readFiles
};