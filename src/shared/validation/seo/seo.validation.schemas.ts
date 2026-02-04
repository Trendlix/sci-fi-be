import * as z from "zod";

const seoBaseSchema = z.object({
    filesAlt: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    keywords: z.array(z.string().min(1)).min(1),
});

export const seoValidationSchema = z
    .object({
        home: seoBaseSchema.optional(),
        about: seoBaseSchema.optional(),
        contact: seoBaseSchema.optional(),
        events: seoBaseSchema.optional(),
        studio: seoBaseSchema.optional(),
        land: seoBaseSchema.optional(),
    })
    .refine((payload) => Object.values(payload).some(Boolean), {
        message: "At least one section must be provided.",
    });

