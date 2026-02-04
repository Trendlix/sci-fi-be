import * as z from "zod";

const fileSchema = z.object({
    url: z.string().optional(),
    path: z.string().optional(),
    contentType: z.string().optional(),
    uploadedAt: z.string().optional(),
});

export const studioHeroSchema = z.object({
    title: z.array(z.string().min(1)).length(6),
    description: z.string().min(10),
});

const aboutCardSchema = z.object({
    tag: z.string().min(1),
    file: fileSchema.optional(),
    icon: z.string().min(1),
    title: z.string().min(3).max(20),
    description: z.string().min(1),
});

export const studioAboutSchema = z.object({
    description: z.string().min(10),
    cards: z.array(aboutCardSchema).min(1),
});

const optionalPartnersDescription = z.union([z.string().min(10), z.literal("")]).optional();

export const studioPartnersSchema = z.object({
    description: optionalPartnersDescription,
    files: z.array(fileSchema).min(1),
});

const whyUsLineSchema = z.object({
    icon: z.string().min(1),
    line: z.string().min(3).max(200),
});

export const studioWhyUsSchema = z.object({
    description: z.string().min(10),
    lines: z.array(whyUsLineSchema).min(1),
});

