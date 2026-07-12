const path = require("path");


const detectEntryPoint = (files) => {

    const priorityEntryFiles = [

        // Node / JavaScript
        "server.js",
        "app.js",
        "index.js",
        "main.js",

        // React / JSX
        "main.jsx",
        "index.jsx",
        "App.jsx",

        // TypeScript
        "main.ts",
        "index.ts",
        "server.ts",
        "app.ts",

        // React / TSX
        "main.tsx",
        "index.tsx",
        "App.tsx",

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

        // C / C++
        "main.cpp",
        "main.c"

    ];


    // ==========================================
    // 1. Priority Entry File Match
    // ==========================================

    for (const entryName of priorityEntryFiles) {

        const file = files.find((currentFile) => {

            const filename =
                path.basename(
                    currentFile.relativePath
                );

            return filename === entryName;

        });


        if (file) {

            return file.id;

        }

    }


    // ==========================================
    // 2. File With Top-Level Calls
    // ==========================================

    const fileWithTopLevelCalls =
        files.find(

            (file) =>

                file.structure
                    ?.topLevelCalls
                    ?.length > 0

        );


    if (fileWithTopLevelCalls) {

        return fileWithTopLevelCalls.id;

    }


    // ==========================================
    // 3. File With Outgoing Imports
    // ==========================================

    const fileWithImports =
        files.find(

            (file) =>

                file.structure
                    ?.imports
                    ?.length > 0

        );


    if (fileWithImports) {

        return fileWithImports.id;

    }


    // ==========================================
    // 4. Largest Source File
    // ==========================================

    let largest = null;


    for (const file of files) {

        if (
            !largest ||
            (
                file.content?.length || 0
            ) >
            (
                largest.content?.length || 0
            )
        ) {

            largest = file;

        }

    }


    return largest?.id ?? null;

};


module.exports = {

    detectEntryPoint

};