const extensionMap = {

    ".js": "JavaScript",

    ".jsx": "JavaScript",

    ".mjs": "JavaScript",

    ".cjs": "JavaScript",

    ".ts": "TypeScript",

    ".tsx": "TypeScript",

    ".py": "Python",

    ".java": "Java",

    ".cpp": "C++",

    ".c": "C",

    ".cs": "C#",

    ".go": "Go",

    ".php": "PHP",

    ".json": "JSON",

    ".md": "Markdown",

    ".html": "HTML",

    ".css": "CSS"

};


const detectLanguage = (extension) => {

    if (!extension) {

        return "Unknown";

    }


    return (

        extensionMap[
            extension.toLowerCase()
        ] ||

        "Unknown"

    );

};


module.exports = {

    detectLanguage

};