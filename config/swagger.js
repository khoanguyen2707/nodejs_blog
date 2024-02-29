const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger API documentation for TodoList API',
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            }
        ],
    },
    apis: ['./api_docs/apiPostDoc.yaml']
};

const swaggerDoc = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDoc;