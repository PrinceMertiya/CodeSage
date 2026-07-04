const analyzeDependencies = (files, functionLookup) => {

    const dependencies = [];

    for (const file of files) {

        if (!file.structure) continue;

        const functions = [

            ...(file.structure.functions || []),

            ...(file.structure.arrowFunctions || [])

        ];

        for (const func of functions) {

            const dependency = {

                function: func.name,

                file: file.relativePath,

                internalCalls: [],

                externalCalls: []

            };

            if (func.calls) {

                for (const call of func.calls) {

                    if (functionLookup[call]) {

                        dependency.internalCalls.push({

                            function: call,

                            file: functionLookup[call].file.relativePath

                        });

                    }

                    else {

                        dependency.externalCalls.push(call);

                    }

                }

            }

            dependencies.push(dependency);

        }

    }

    return dependencies;

};

module.exports = {

    analyzeDependencies

};