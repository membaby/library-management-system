import { z } from "zod";

export const paginationQuerySchema = z.object({
    limit: z.coerce.number().int().positive().default(10).refine(
        (value) => value >= 1 && value <= 1000,
        {message: "Limit must be between 1 and 1000"}
    ),
    offset: z.coerce.number().int().nonnegative().default(0).refine(
        (value) => value >= 0,
        {message: "Offset must be greater than or equal to 0"}
    ),
});

export const idParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});