import { z } from "zod";

export const createBookSchema = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    isbn: z.string().min(10).max(13),
    shelfLocation: z.string().optional(),
    availableQuantity: z.number().int().min(0),
});

export const isbnParamSchema = z.object({
    isbn: z.string().min(10).max(13),
});

export const updateBookSchema = createBookSchema.partial();
