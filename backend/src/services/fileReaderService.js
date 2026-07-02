const fs = require("fs/promises");
const path = require("path");

const { parseJavaScript } = require("./jsParser");
const { detectLanguage } = require("../utils/languageDetector");
const { detectStructure } = require("./structureDetectorService");

const readFiles = async (files, repositoryRoot) => {

    const results = [];

    for (const file of files) {

        const language = detectLanguage(
            path.extname(file)
        );

        let content;

        try {

            content = await fs.readFile(
                file,
                "utf8"
            );

        } catch {

            content = await fs.readFile(
                file,
                "utf16le"
            );

        }

//         let structure = null;

//         if (language === "JavaScript") {

//         //     structure = parseJavaScript(content);
//         const structure = detectStructure(
//     language,
//     content
// );
let structure = null;

if (language === "JavaScript") {

        structure = detectStructure(
        language,
        content
    );

}

        

        
        console.log({
    name: path.basename(file),
    language,
    structure
});


        results.push({

            id: `file_${results.length + 1}`,

            name: path.basename(file),

            relativePath: path.relative(
                repositoryRoot,
                file
            ),

            extension: path.extname(file),

            language,

            size: Buffer.byteLength(content),

            lines: content.split("\n").length,

            content,

            structure

        });

    }

    return results;

};

module.exports = {
    readFiles
};