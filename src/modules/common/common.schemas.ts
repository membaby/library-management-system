import { z } from "zod";

export const paginationQuerySchema = z.object({
    limit: z.coerce.number().int().positive().default(10),
    offset: z.coerce.number().int().nonnegative().default(0),
});

export const idParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});