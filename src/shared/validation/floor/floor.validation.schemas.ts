import * as z from "zod";

const fileSchema = z.object({
    url: z.string().min(1),
    path: z.string().min(1),
    contentType: z.string().optional(),
    uploadedAt: z.string().optional(),
});

export const floorHeaderSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
});

export const floorHeroSchema = z.object({
    title: z.array(z.string().min(1)).min(2),
    description: z.string().min(10),
    files: z.array(fileSchema).length(3),
});

const featureCardSchema = z.object({
    file: fileSchema,
    title: z.string().min(3),
    description: z.string().min(10),
    cta: z.string().min(3),
});

export const floorFeaturesSchema = z.object({
    cards: z.array(featureCardSchema).min(1),
});

const servicesCardSchema = z.object({
    title: z.string().min(3),
    thumbnail: fileSchema,
    files: z.array(fileSchema).min(1).optional(),
});

export const floorServicesSchema = z.object({
    title: z.array(z.string().min(1)).min(2),
    hidden: z.boolean().optional(),
    description: z.string().min(10),
    cards: z.array(servicesCardSchema).min(1),
});

const groundsCardSchema = z.object({
    file: fileSchema,
    title: z.string().min(3),
    description: z.string().min(10),
    cta: z.string().min(3),
});

export const floorGroundsSchema = z.object({
    title: z.array(z.string().min(1)).min(2),
    hidden: z.boolean().optional(),
    cards: z.array(groundsCardSchema).min(1),
});

export const floorHiddenSchema = z.object({
    hidden: z.boolean(),
});

const sliderCardSchema = z.object({
    file: fileSchema,
    title: z.string().min(3),
    description: z.string().min(10),
});

export const floorSliderSchema = z.object({
    title: z.array(z.string().min(1)).min(2),
    description: z.string().min(10),
    cards: z.array(sliderCardSchema).min(1),
});

