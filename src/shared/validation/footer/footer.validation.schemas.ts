import * as z from "zod";

const addressSchema = z.object({
    title: z.string().min(1),
    url: z.string().min(1),
});

export const footerValidationSchema = z.object({
    x: z.string().min(1).optional(),
    facebook: z.string().min(1).optional(),
    linkedin: z.string().min(1).optional(),
    instagram: z.string().min(1).optional(),
    youtube: z.string().min(1).optional(),
    tiktok: z.string().min(1).optional(),
    telegram: z.string().min(1).optional(),
    threads: z.string().min(1).optional(),
    snapchat: z.string().min(1).optional(),
    pinterest: z.string().min(1).optional(),
    reddit: z.string().min(1).optional(),
    email: z.string().min(1),
    address: addressSchema,
    title: z.array(z.string().min(1)).min(4),
    subscribeDescription: z.string().min(10),
});

