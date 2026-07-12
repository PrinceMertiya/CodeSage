const {

    parseFunctionCalls

} = require("../parsers/callParser");


/*
|--------------------------------------------------------------------------
| Remove JavaScript Function / Class Bodies
|--------------------------------------------------------------------------
*/

const removeJavaScriptBlocks = (

    content

) => {


    const chars =

        content.split("");


    /*
    |--------------------------------------------------------------------------
    | Definitions To Remove
    |--------------------------------------------------------------------------
    */

    const definitionRegex =

        /(?:export\s+)?(?:default\s+)?(?:async\s+)?function\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*\([^)]*\)\s*\{|(?:export\s+)?(?:const|let|var)\s+[a-zA-Z_$][a-zA-Z0-9_$]*[^=]*=\s*(?:async\s*)?(?:\([^)]*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=>\s*\{|class\s+[a-zA-Z_$][a-zA-Z0-9_$]*[^{]*\{/g;


    let match;


    while (

        (
            match =
                definitionRegex.exec(
                    content
                )
        ) !== null

    ) {


        const openingBrace =

            content.indexOf(

                "{",

                match.index

            );


        if (

            openingBrace === -1

        ) {

            continue;

        }


        let braceCount = 1;

        let currentIndex =

            openingBrace + 1;


        while (

            currentIndex <
                content.length &&

            braceCount > 0

        ) {


            if (

                content[
                    currentIndex
                ] === "{"

            ) {

                braceCount++;

            }


            else if (

                content[
                    currentIndex
                ] === "}"

            ) {

                braceCount--;

            }


            currentIndex++;

        }


        /*
        |--------------------------------------------------------------------------
        | Replace Function Body With Spaces
        |--------------------------------------------------------------------------
        |
        | Keep newline characters so source structure remains stable.
        |
        */

        for (

            let index =
                match.index;

            index <
                currentIndex;

            index++

        ) {


            if (

                chars[
                    index
                ] !== "\n"

            ) {

                chars[
                    index
                ] = " ";

            }

        }


        definitionRegex.lastIndex =

            currentIndex;

    }


    return chars.join("");

};


/*
|--------------------------------------------------------------------------
| Parse JavaScript Top-Level Calls
|--------------------------------------------------------------------------
*/

const parseJavaScriptTopLevelCalls = (

    content

) => {


    const topLevelContent =

        removeJavaScriptBlocks(

            content

        );


    return parseFunctionCalls(

        topLevelContent,

        "JavaScript"

    );

};


/*
|--------------------------------------------------------------------------
| Parse Python Top-Level Calls
|--------------------------------------------------------------------------
*/

const parsePythonTopLevelCalls = (

    content

) => {


    const lines =

        content.split("\n");


    const topLevelLines = [];


    let insideBlock = false;

    let blockIndent = 0;


    for (

        const line

        of lines

    ) {


        const trimmed =

            line.trim();


        if (

            !trimmed

        ) {

            continue;

        }


        const indent =

            line.match(

                /^\s*/

            )[0].length;


        /*
        |--------------------------------------------------------------------------
        | Leave Function / Class
        |--------------------------------------------------------------------------
        */

        if (

            insideBlock &&

            indent < blockIndent

        ) {

            insideBlock = false;

        }


        /*
        |--------------------------------------------------------------------------
        | Skip Function / Class Body
        |--------------------------------------------------------------------------
        */

        if (

            insideBlock

        ) {

            continue;

        }


        /*
        |--------------------------------------------------------------------------
        | Function / Class Definition
        |--------------------------------------------------------------------------
        */

        if (

            /^def\s/.test(

                trimmed

            ) ||

            /^async\s+def\s/.test(

                trimmed

            ) ||

            /^class\s/.test(

                trimmed

            )

        ) {


            insideBlock = true;

            blockIndent =

                indent + 1;


            continue;

        }


        topLevelLines.push(

            line

        );

    }


    return parseFunctionCalls(

        topLevelLines.join(

            "\n"

        ),

        "Python"

    );

};


/*
|--------------------------------------------------------------------------
| Parse Top-Level Calls
|--------------------------------------------------------------------------
*/

const parseTopLevelCalls = (

    content,

    language

) => {


    if (

        language ===
        "JavaScript" ||

        language ===
        "TypeScript"

    ) {

        return (

            parseJavaScriptTopLevelCalls(

                content

            )

        );

    }


    if (

        language ===
        "Python"

    ) {

        return (

            parsePythonTopLevelCalls(

                content

            )

        );

    }


    return [];

};


module.exports = {

    parseTopLevelCalls

};