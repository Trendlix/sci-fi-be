import * as z from "zod";

const heroSchema = z.object({
    title: z.array(z.string().min(1)).length(6),
    description: z.string().min(10),
});

const aboutCardSchema = z.object({
    icon: z.object({
        url: z.string().optional(),
        path: z.string().optional(),
        contentType: z.string().optional(),
        uploadedAt: z.string().optional(),
    }),
    title: z.string().min(1),
    description: z.string().min(1),
});

const aboutMinSchema = z.object({
    description: z.string().min(10),
    cards: z.array(aboutCardSchema).min(1).max(2),
});

const serviceCardSchema = z.object({
    tag: z.string().min(3).max(20),
    icon: z.string().min(1),
    title: z.string().min(3).max(20),
    description: z.string().min(10).max(100),
});

const serviceSchema = z.object({
    description: z.string().min(10).max(100),
    cards: z.array(serviceCardSchema).min(1),
});

const preValueSchema = z.object({
    title: z.array(z.string().min(1)).length(5),
    description: z.string().min(10).max(100),
    file: z
        .object({
            url: z.string().optional(),
            path: z.string().optional(),
            contentType: z.string().optional(),
            uploadedAt: z.string().optional(),
        })
        .optional(),
});

const valueCardSchema = z.object({
    icon: z.string().min(1),
    title: z.string().min(3).max(20),
    description: z.string().min(10).max(100),
});

const valueSchema = z.object({
    description: z.string().min(10).max(100),
    cards: z.array(valueCardSchema).min(1),
});

export const aboutValidationSchema = z
    .object({
        hero: heroSchema.optional(),
        about: aboutMinSchema.optional(),
        service: serviceSchema.optional(),
        preValue: preValueSchema.optional(),
        value: valueSchema.optional(),
    })
    .refine((payload) => Object.values(payload).some(Boolean), {
        message: "At least one section must be provided.",
    });

