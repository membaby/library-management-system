import { z } from "zod";

export const analyzeBorrowsQuerySchema = z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
});

export const exportBorrowsQuerySchema = z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    overdue: z.boolean().default(false)
});