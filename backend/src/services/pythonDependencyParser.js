const { pythonDependencyRules } = require("../utils/pythonDependencyRules");

// console.log("Rules Loaded:", Object.keys(pythonDependencyRules));

const parseRequirements = (content) => {

    const result = {
        framework: [],
        ai: [],
        database: [],
        visualization: [],
        pdf: []
    };

    const lines = content.split("\n");

    for (let line of lines) {

        line = line.trim().toLowerCase();

        if (!line) continue;

        const packageName = line
            .replace(/^\uFEFF/, "")
            .replace(/\u0000/g, "")
            .split(/[<>=~!]+/)[0]
            .trim();

        // console.log("package ",packageName);


        // console.log("Package:", JSON.stringify(packageName));

        // console.log(
        //     "Direct Access:",
        //     pythonDependencyRules.streamlit
        // );

        // console.log(
        //     "Dynamic Access:",
        //     pythonDependencyRules[packageName]
        // );


        const rule = pythonDependencyRules[packageName];

        // console.log("rule ",rule);

        if (!rule) continue;

        switch (rule.category) {
            case "framework":
                result.framework.push(rule.value);
                break;

            case "ai":
                result.ai.push(rule.value);
                break;

            case "database":
                result.database.push(rule.value);
                break;

            case "visualization":
                result.visualization.push(rule.value);
                break;

            case "pdf":
                result.pdf.push(rule.value);
                break;
        }
    }

    return result;
};

module.exports = {
    parseRequirements
};