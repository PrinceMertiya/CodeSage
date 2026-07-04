const detectDeadCode = (files) => {

    const allFunctions = [];
    const calledFunctions = new Set();

    // =====================================
    // Collect all declared functions
    // =====================================

    for (const file of files) {

        if (!file.structure) continue;

        const functions = [

            ...(file.structure.functions || []),

            ...(file.structure.arrowFunctions || [])

        ];

        for (const func of functions) {

            allFunctions.push({

                name: func.name,

                file: file.relativePath,

                startLine: func.startLine,

                endLine: func.endLine

            });

            if (func.calls) {

                for (const call of func.calls) {

                    calledFunctions.add(call);

                }

            }

        }

    }

    // =====================================
    // Functions never called
    // =====================================

    const deadFunctions = allFunctions.filter(

        func => !calledFunctions.has(func.name)

    );

    return deadFunctions;

};

module.exports = {

    detectDeadCode

};