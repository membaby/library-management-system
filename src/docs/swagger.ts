import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management System",
      version: "1.0.0",
      description: "RESTful API for managing books and borrows",
    },
    servers: [
      { url: "http://localhost:3000" }
    ],
    components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //       bearerFormat: "JWT",
    //     },
    //   },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/**/*.ts"]
});
