import * as z from "zod";

export const brandValidationSchema = z.object({
    whatsAppMe: z.string().min(1),
});

