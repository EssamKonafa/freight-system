import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Freight System API",
            version: "1.0.0",
            description: "API documentation for the Freight System microservices",
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
