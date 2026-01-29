import { z } from "zod";

export const createBorrowsSchema = z.object({
    bookId: z.coerce.number().int().positive(),
    borrowerId: z.coerce.number().int().positive(),
    dueAt: z.coerce.date().refine((date) => date > new Date(),
        { message: "Due date must be a future date" }),
});

export const idParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const getBorrowsQuerySchema = z.object({
    limit: z.coerce.number().int().positive().default(10),
    offset: z.coerce.number().int().positive().default(0),
    borrowerId: z.coerce.number().int().optional(),
    bookId: z.coerce.number().int().optional(),
    dueAt: z.coerce.date().optional(),
    active: z.coerce.boolean().optional(),
    overdue: z.coerce.boolean().optional(),
});  
    
export const updateBorrowsSchema = createBorrowsSchema.partial();
