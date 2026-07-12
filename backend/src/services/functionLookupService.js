const normalizePath = (

    filePath

) => {

    return filePath
        .replace(/\\/g, "/");

};


/*
|--------------------------------------------------------------------------
| Build Function Lookup
|--------------------------------------------------------------------------
*/

const buildFunctionLookup = (

    files

) => {


    const lookup = {};


    for (

        const file

        of files

    ) {


        if (

            !file.structure

        ) {

            continue;

        }


        const normalizedPath =

            normalizePath(

                file.relativePath

            );


        const allFunctions = [

            ...(file.structure.functions || []),

            ...(file.structure.arrowFunctions || [])

        ];


        for (

            const func

            of allFunctions

        ) {


            const entry = {

                file,

                function:

                    func,

                id:

                    `${normalizedPath}:${func.name}`

            };


            /*
            |--------------------------------------------------------------------------
            | Lookup By Function Name
            |--------------------------------------------------------------------------
            |
            | Store multiple functions instead of overwriting duplicates.
            |
            */

            if (

                !lookup[
                    func.name
                ]

            ) {

                lookup[
                    func.name
                ] = [];

            }


            lookup[
                func.name
            ].push(

                entry

            );


            /*
            |--------------------------------------------------------------------------
            | Lookup By Unique File + Function ID
            |--------------------------------------------------------------------------
            */

            lookup[

                `${normalizedPath}:${func.name}`

            ] = entry;

        }

    }


    return lookup;

};


module.exports = {

    buildFunctionLookup

};