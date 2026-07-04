const path = require("path");

const detectEntryPoint = (files) => {

    const commonEntryFiles = [

        // JavaScript
        "index.js",
        "app.js",
        "server.js",
        "main.js",

        // TypeScript
        "index.ts",
        "main.ts",

        // Python
        "app.py",
        "main.py",
        "manage.py",
        "__main__.py",
        "wsgi.py",

        // Java
        "Main.java",

        // C#
        "Program.cs",

        // C/C++
        "main.cpp",
        "main.c"

    ];

    // --------------------------
    // 1. Exact filename match
    // --------------------------

    for (const file of files) {

        const filename = path.basename(file.relativePath);

        if (commonEntryFiles.includes(filename)) {

            return file.id;

        }

    }

    // --------------------------
    // 2. Python top-level calls
    // --------------------------

    for (const file of files) {

        if (
            file.language === "Python" &&
            file.structure?.topLevelCalls?.length > 0
        ) {

            return file.id;

        }

    }

    // --------------------------
    // 3. JavaScript exports/routes
    // --------------------------

    for (const file of files) {

        if (
            file.language === "JavaScript" &&
            (
                file.structure?.exports?.length ||
                file.structure?.topLevelCalls?.length
            )
        ) {

            return file.id;

        }

    }

    // --------------------------
    // 4. Largest source file
    // --------------------------

    let largest = null;

    for (const file of files) {

        if (!largest) {

            largest = file;

            continue;

        }

        if ((file.content?.length || 0) >
            (largest.content?.length || 0)) {

            largest = file;

        }

    }

    return largest?.id || null;

};

module.exports = {

    detectEntryPoint

};