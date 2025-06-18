const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger JavaScript Express Node Mongo API',
            version: '1.0.0',
            description: 'API documentation for your Express MongoDB application',
        },
        servers: [
            {
                url: 'http://localhost:5050/api',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
