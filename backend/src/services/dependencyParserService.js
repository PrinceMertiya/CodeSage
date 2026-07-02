const { dependencyRules } = require("../utils/dependencyRules");

const parseDependencies = (packageJson) => {

    const result = {

        frameworks: [],

        databases: [],

        authentication: [],

        httpClients: []

    };

    if (!packageJson.dependencies) {
        return result;
    }

    const dependencies = Object.keys(packageJson.dependencies);

    for (const dependency of dependencies) {

        const rule = dependencyRules[dependency];

        if (!rule) continue;

        switch (rule.category) {

            case "framework":

                result.frameworks.push(rule.value);

                break;

            case "database":

                result.databases.push(rule.value);

                break;

            case "authentication":

                result.authentication.push(rule.value);

                break;

            case "httpClient":

                result.httpClients.push(rule.value);

                break;

        }

    }

    return result;

};

module.exports = {
    parseDependencies
};