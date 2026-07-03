const parsePython = (content) => {

    const result = {

        imports: [],
        classes: [],
        functions: []

    };

    const importRegex =
        /^import\s+(.+)$/gm;

    const fromImportRegex =
        /^from\s+([a-zA-Z0-9_\.]+)\s+import/gm;

    // const classRegex =
    //     /^class\s+([a-zA-Z_][a-zA-Z0-9_]*)/gm;

    const classRegex =
    /^class\s+([a-zA-Z_][a-zA-Z0-9_]*)[^\n]*:/gm;

    // const functionRegex =
    //     /^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm;

    const functionRegex =
    /^(?:async\s+)?def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm;

    let match;

    // import streamlit
    while ((match = importRegex.exec(content)) !== null) {

        const modules = match[1]
            .split(",")
            .map(item => item.trim());

        result.imports.push(...modules);

    }

    // from utils import helper
    while ((match = fromImportRegex.exec(content)) !== null) {

        result.imports.push(match[1]);

    }

    // while ((match = classRegex.exec(content)) !== null) {

    //     result.classes.push({

    //         name: match[1],

    //         methods: []

    //     });

    // }


//     while ((match = classRegex.exec(content)) !== null) {

//     const className = match[1];

//     const startIndex = match.index;

//     const nextClass = classRegex.exec(content);

//     const endIndex = nextClass
//         ? nextClass.index
//         : content.length;

//     if (nextClass) {
//         classRegex.lastIndex = nextClass.index;
//     }

//     const classBody = content.substring(
//         startIndex,
//         endIndex
//     );

//     // const methodRegex =
//     //     /^\s{4}def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm;

//     const methodRegex =
//     /^\s+(?:async\s+)?def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm;

//     const methods = [];

//     let methodMatch;

//     while ((methodMatch = methodRegex.exec(classBody)) !== null) {

//         methods.push(methodMatch[1]);

//     }

//     result.classes.push({

//         name: className,

//         methods

//     });

// }

    const lines = content.split("\n");

let currentClass = null;

for (const line of lines) {

    const classMatch = line.match(
        /^class\s+([a-zA-Z_][a-zA-Z0-9_]*)[^\n]*:/
    );

    if (classMatch) {

        currentClass = {

            name: classMatch[1],
            methods: []

        };

        result.classes.push(currentClass);

        continue;

    }

    const methodMatch = line.match(
        /^\s+(?:async\s+)?def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/
    );

    if (methodMatch && currentClass) {

        currentClass.methods.push(methodMatch[1]);

        

    }
    

}

    // while ((match = functionRegex.exec(content)) !== null) {

    //     result.functions.push(match[1]);

    // }

    while ((match = functionRegex.exec(content)) !== null) {

    const functionName = match[1];

    const isMethod = result.classes.some(cls =>
        cls.methods.includes(functionName)
    );

    if (!isMethod) {

        result.functions.push(functionName);

    }

}

    result.imports = [...new Set(result.imports)];
    result.functions = [...new Set(result.functions)];

    return result;

};

module.exports = {
    parsePython
};