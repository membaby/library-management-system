import { z } from "zod";

export const createBorrowerSchema = z.object({
    name: z.string().min(1),
    email: z.email()
});

export const idParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});
  
export const updateBorrowerSchema = createBorrowerSchema.partial();
