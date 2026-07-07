const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CodeSage API",
            version: "1.0.0",
            description: "AI Powered Repository Analysis API"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },

    apis: [
        "./routes/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

console.log(swaggerSpec.paths);

module.exports = swaggerSpec;