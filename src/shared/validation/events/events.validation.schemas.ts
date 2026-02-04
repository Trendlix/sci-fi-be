import * as z from "zod";

const fileSchema = z.object({
    url: z.string().optional(),
    path: z.string().optional(),
    contentType: z.string().optional(),
    uploadedAt: z.string().optional(),
});

const eventHeroCardSchema = z.object({
    title: z.array(z.string().min(1)).length(8),
    description: z.string().min(10),
    file: fileSchema.optional(),
});

export const eventHeroSchema = z.object({
    cards: z.array(eventHeroCardSchema).min(1),
});

const eventAboutCardSchema = z.object({
    icon: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(10),
});

export const eventAboutSchema = z.object({
    description: z.string().min(10),
    cards: z.array(eventAboutCardSchema).min(1),
});

export const eventPartnersSchema = z.object({
    description: z.string().min(10),
    files: z.array(fileSchema).min(1),
});

const eventProgramCardSchema = z.object({
    icon: z.string().min(1),
    description: z.string().min(1),
    features: z.array(z.string().min(1)).min(1).max(5),
});

export const eventProgramSchema = z.object({
    vr_arena: eventProgramCardSchema,
    printing_lab_3d: eventProgramCardSchema,
    innovation_lab: eventProgramCardSchema,
    tech_museum: eventProgramCardSchema,
    digital_art_studio: eventProgramCardSchema,
});

const eventHowCardSchema = z.object({
    file: fileSchema.optional(),
    icon: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(10),
    highlights: z.array(z.string().min(1)).min(1).max(4),
});

export const eventHowSchema = z.object({
    description: z.string().min(10),
    cards: z.array(eventHowCardSchema).min(1),
});

const eventReadyCardSchema = z.object({
    icon: z.string().min(1),
    no: z.number().min(1),
    title: z.string().min(1),
});

export const eventReadySchema = z.object({
    description: z.string().min(1),
    cards: z.array(eventReadyCardSchema).length(3),
});

const eventFeaturedCardSchema = z.object({
    file: fileSchema.optional(),
    tag: z.string().min(1),
    title: z.string().min(1),
    highlights: z.array(z.string().min(1)).min(1).max(3),
    description: z.string().min(10),
});

export const eventFeaturedSchema = z.object({
    description: z.string().min(1),
    cards: z.array(eventFeaturedCardSchema).min(1),
});

const eventUpcomingCardSchema = z.object({
    type: z.string().min(1),
    file: fileSchema.optional(),
    tag: z.string().min(1),
    title: z.string().min(1),
    highlights: z.array(z.string().min(1)).min(1).max(3),
    description: z.string().min(10),
    cta: z.string().min(1),
});

export const eventUpcomingSchema = z.array(eventUpcomingCardSchema).min(1);

