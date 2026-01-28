"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const books_routes_1 = __importDefault(require("./modules/books/books.routes"));
const zod_1 = require("zod");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./docs/swagger");
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // Swagger UI
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
    // Modules routes
    app.use("/books", books_routes_1.default);
    // Error handling
    app.use((_req, res) => {
        res.status(404).json({ status: "error", message: "Endpoint not found" });
    });
    app.use((err, _req, res, _next) => {
        // Zod validation error
        if (err instanceof zod_1.ZodError) {
            return res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: err.issues.map((i) => ({
                    path: i.path.join("."),
                    message: i.message,
                })),
            });
        }
        // Custom errors
        if (typeof err === "object" && err !== null && "statusCode" in err && "message" in err) {
            const e = err;
            return res.status(e.statusCode ?? 500).json({
                status: "error",
                message: e.message ?? "Error",
            });
        }
        // Unknown / unhandled errors
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    });
    return app;
}
//# sourceMappingURL=app.js.map