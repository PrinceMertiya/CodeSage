const {

    getLineNumber,

    extractContent

} = require("./parserUtils");


const {

    parseTopLevelCalls

} = require("./topLevelCallParser");


const {

    parseFunctionCalls

} = require("../parsers/callParser");


/*
|--------------------------------------------------------------------------
| Find Matching Closing Brace
|--------------------------------------------------------------------------
*/

const findClosingBrace = (

    content,

    openingBraceIndex

) => {


    if (

        openingBraceIndex === -1

    ) {

        return -1;

    }


    let braceCount = 1;

    let currentIndex =

        openingBraceIndex + 1;


    while (

        currentIndex < content.length &&

        braceCount > 0

    ) {


        if (

            content[currentIndex] === "{"

        ) {

            braceCount++;

        }


        else if (

            content[currentIndex] === "}"

        ) {

            braceCount--;

        }


        currentIndex++;

    }


    return currentIndex;

};


/*
|--------------------------------------------------------------------------
| JavaScript / JSX / TypeScript / TSX Parser
|--------------------------------------------------------------------------
*/

const parseJavaScript = (content) => {


    const result = {

        imports: [],

        classes: [],

        functions: [],

        arrowFunctions: [],

        exports: [],

        topLevelCalls: []

    };


    /*
    |--------------------------------------------------------------------------
    | Regular Expressions
    |--------------------------------------------------------------------------
    */


    // CommonJS require()
    const requireRegex =

        /require\s*\(\s*["'`](.*?)["'`]\s*\)/g;


    // ES Module:
    // import React from "react"
    // import { useState } from "react"
    const importFromRegex =

        /import[\s\S]*?\sfrom\s+["'`](.*?)["'`]/g;


    // Side effect:
    // import "./index.css"
    const sideEffectImportRegex =

        /import\s+["'`](.*?)["'`]/g;


    // Normal functions
    const functionRegex =

        /(?:export\s+)?(?:default\s+)?(?:async\s+)?function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)/g;


    // Arrow functions
    //
    // const test = () => {}
    // const test = async () => {}
    // const test = value => {}
    //
    const arrowFunctionRegex =

        /(?:export\s+)?(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)[^=]*=\s*(?:async\s*)?(?:\([^)]*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=>/g;


    // Classes
    const classRegex =

        /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)[^{]*\{/g;


    // Class methods
    const methodRegex =

        /^\s*(?:async\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*\{/gm;


    // CommonJS exports
    const moduleExportRegex =

        /module\.exports\s*=\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g;


    const exportsRegex =

        /exports\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g;


    // ES Module exports
    const exportDefaultRegex =

        /export\s+default\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;


    const exportNamedRegex =

        /export\s*\{\s*([^}]*)\s*\}/g;


    let match;


    /*
    |--------------------------------------------------------------------------
    | CommonJS Exports
    |--------------------------------------------------------------------------
    */


    while (

        (
            match =
                moduleExportRegex.exec(
                    content
                )
        ) !== null

    ) {

        result.exports.push(

            match[1]

        );

    }


    while (

        (
            match =
                exportsRegex.exec(
                    content
                )
        ) !== null

    ) {

        result.exports.push(

            match[1]

        );

    }


    /*
    |--------------------------------------------------------------------------
    | ES Module Exports
    |--------------------------------------------------------------------------
    */


    while (

        (
            match =
                exportDefaultRegex.exec(
                    content
                )
        ) !== null

    ) {

        result.exports.push(

            match[1]

        );

    }


    while (

        (
            match =
                exportNamedRegex.exec(
                    content
                )
        ) !== null

    ) {


        const exportsList =

            match[1]

                .split(",")

                .map(

                    item =>

                        item
                            .trim()
                            .split(/\s+as\s+/)[0]
                            .trim()

                )

                .filter(Boolean);


        result.exports.push(

            ...exportsList

        );

    }


    /*
    |--------------------------------------------------------------------------
    | require() Imports
    |--------------------------------------------------------------------------
    */


    while (

        (
            match =
                requireRegex.exec(
                    content
                )
        ) !== null

    ) {

        result.imports.push(

            match[1]

        );

    }


    /*
    |--------------------------------------------------------------------------
    | ES Module Imports
    |--------------------------------------------------------------------------
    */


    while (

        (
            match =
                importFromRegex.exec(
                    content
                )
        ) !== null

    ) {

        result.imports.push(

            match[1]

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Side Effect Imports
    |--------------------------------------------------------------------------
    */


    while (

        (
            match =
                sideEffectImportRegex.exec(
                    content
                )
        ) !== null

    ) {

        result.imports.push(

            match[1]

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Normal Functions
    |--------------------------------------------------------------------------
    */


    while (

        (
            match =
                functionRegex.exec(
                    content
                )
        ) !== null

    ) {


        const functionName =

            match[1];


        const openingBraceIndex =

            content.indexOf(

                "{",

                functionRegex.lastIndex

            );


        if (

            openingBraceIndex === -1

        ) {

            continue;

        }


        const closingBraceIndex =

            findClosingBrace(

                content,

                openingBraceIndex

            );


        if (

            closingBraceIndex === -1

        ) {

            continue;

        }


        const startLine =

            getLineNumber(

                content,

                match.index

            );


        const endLine =

            getLineNumber(

                content,

                closingBraceIndex

            );


        const functionContent =

            extractContent(

                content,

                startLine,

                endLine

            );


        result.functions.push({

            name:

                functionName,

            startLine,

            endLine,

            content:

                functionContent,

            calls:

                parseFunctionCalls(

                    functionContent,

                    "JavaScript"

                )

        });

    }


    /*
    |--------------------------------------------------------------------------
    | Arrow Functions
    |--------------------------------------------------------------------------
    */


    while (

        (
            match =
                arrowFunctionRegex.exec(
                    content
                )
        ) !== null

    ) {


        const functionName =

            match[1];


        const openingBraceIndex =

            content.indexOf(

                "{",

                arrowFunctionRegex.lastIndex

            );


        /*
        |--------------------------------------------------------------------------
        | Arrow Function With Block Body
        |--------------------------------------------------------------------------
        |
        | const test = () => {
        |     ...
        | }
        |
        */


        if (

            openingBraceIndex !== -1

        ) {


            const closingBraceIndex =

                findClosingBrace(

                    content,

                    openingBraceIndex

                );


            if (

                closingBraceIndex !== -1

            ) {


                const startLine =

                    getLineNumber(

                        content,

                        match.index

                    );


                const endLine =

                    getLineNumber(

                        content,

                        closingBraceIndex

                    );


                const functionContent =

                    extractContent(

                        content,

                        startLine,

                        endLine

                    );


                result.arrowFunctions.push({

                    name:

                        functionName,

                    startLine,

                    endLine,

                    content:

                        functionContent,

                    calls:

                        parseFunctionCalls(

                            functionContent,

                            "JavaScript"

                        )

                });

            }

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Classes
    |--------------------------------------------------------------------------
    */


    while (

        (
            match =
                classRegex.exec(
                    content
                )
        ) !== null

    ) {


        const className =

            match[1];


        const openingBraceIndex =

            classRegex.lastIndex - 1;


        const closingBraceIndex =

            findClosingBrace(

                content,

                openingBraceIndex

            );


        if (

            closingBraceIndex === -1

        ) {

            continue;

        }


        const classBody =

            content.substring(

                openingBraceIndex,

                closingBraceIndex

            );


        const methods = [];


        let methodMatch;


        methodRegex.lastIndex = 0;


        while (

            (
                methodMatch =
                    methodRegex.exec(
                        classBody
                    )
            ) !== null

        ) {


            const methodName =

                methodMatch[1];


            if (

                methodName ===
                "constructor"

            ) {

                methods.push(

                    methodName

                );

                continue;

            }


            methods.push(

                methodName

            );

        }


        const startLine =

            getLineNumber(

                content,

                match.index

            );


        const endLine =

            getLineNumber(

                content,

                closingBraceIndex

            );


        const classContent =

            extractContent(

                content,

                startLine,

                endLine

            );


        result.classes.push({

            name:

                className,

            startLine,

            endLine,

            content:

                classContent,

            calls:

                parseFunctionCalls(

                    classContent,

                    "JavaScript"

                ),

            methods

        });

    }


    /*
    |--------------------------------------------------------------------------
    | Top Level Calls
    |--------------------------------------------------------------------------
    */


    result.topLevelCalls =

        parseTopLevelCalls(

            content,

            "JavaScript"

        );


    /*
    |--------------------------------------------------------------------------
    | Remove Duplicate Imports / Exports
    |--------------------------------------------------------------------------
    */


    result.imports = [

        ...new Set(

            result.imports

        )

    ];


    result.exports = [

        ...new Set(

            result.exports

        )

    ];


    return result;

};


module.exports = {

    parseJavaScript

};