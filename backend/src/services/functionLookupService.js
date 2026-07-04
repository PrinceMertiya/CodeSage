const buildFunctionLookup = (files) => {

    const lookup = {};

    for (const file of files) {

        if (!file.structure) continue;

        const allFunctions = [

            ...(file.structure.functions || []),

            ...(file.structure.arrowFunctions || [])

        ];

        for (const func of allFunctions) {

            lookup[func.name] = {

                file,

                function: func

            };

        }

    }

    return lookup;

};

module.exports = {

    buildFunctionLookup

};