import * as z from "zod";

const getInTouchCardSchema = z.object({
    type: z.enum(["phone", "email", "address", "hours"]),
    lines: z.array(z.string().min(1)).min(1).max(2),
});

export const contactValidationSchema = z.object({
    hero: z.object({
        description: z.string().min(10),
    }),
    getInTouch: z.object({
        description: z.string().min(10),
        cards: z.array(getInTouchCardSchema).min(1).max(4),
    }),
});

