const fs = require("fs/promises");
const path = require("path");
const { detectLanguage } = require("../utils/languageDetector");

const readFiles = async (files, repositoryRoot) => {

    const results = [];

    for (const file of files) {

        try {
            content = await fs.readFile(file, "utf8");
        } catch {
            content = await fs.readFile(file, "utf16le");
        }

        results.push({

            id: `file_${results.length + 1}`,

            name: path.basename(file),

            relativePath: path.relative(repositoryRoot, file),

            extension: path.extname(file),

            language: detectLanguage(path.extname(file)),

            size: Buffer.byteLength(content),

            lines: content.split("\n").length,

            content

        });

    }

    return results;

};

module.exports = {
    readFiles
};