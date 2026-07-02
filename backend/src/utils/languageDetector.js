const extensionMap = {

    ".js": "JavaScript",

    ".jsx": "React",

    ".ts": "TypeScript",

    ".tsx": "React TypeScript",

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

    return extensionMap[extension] || "Unknown";

};

module.exports = {
    detectLanguage
};