import express, { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

import booksRoutes from "./modules/books/books.routes";
import borrowersRoutes from "./modules/borrowers/borrowers.routes";
import borrowsRoutes from "./modules/borrows/borrows.routes";
import reportsRoutes from "./modules/reports/reports.routes";

import { reportsRateLimit } from "./middlewares/rateLimit";
import { isJsonParseError } from "./utils";


export function createApp() {
  const app = express();
  
  app.use(express.json());

  // Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  
  // Modules routes
  app.use("/books", booksRoutes);
  app.use("/borrowers", borrowersRoutes);
  app.use("/borrows", borrowsRoutes);
  app.use("/reports", reportsRateLimit, reportsRoutes);

  // Error handling
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ status: "error", message: "Endpoint not found" });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    // JSON parsing error
    if (isJsonParseError(err) && err.type === "entity.parse.failed" && err.status === 400) {
      return res.status(400).json({
        status: "error",
        message: "Invalid JSON in request body"
      });
    }
  
  
    // Zod validation error
    if (err instanceof ZodError) {
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
      const e = err as any;
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
