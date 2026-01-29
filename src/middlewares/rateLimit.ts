import rateLimit from "express-rate-limit";

export const reportsRateLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { status: "error", message: "Too many requests, please try again later." },
});