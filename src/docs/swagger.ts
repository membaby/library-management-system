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
    tags: [
      { name: "Books", description: "Book management" },
      { name: "Borrowers", description: "Borrower management" },
      { name: "Borrows", description: "Borrow & return operations" },
      { name: "Reports", description: "Reports operatons" },
    ],  
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/**/*.ts"]
});
