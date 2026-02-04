import * as z from "zod";

const fileSchema = z.object({
    url: z.string().optional(),
    path: z.string().optional(),
    contentType: z.string().optional(),
    uploadedAt: z.string().optional(),
});

export const homeHeroSchema = z.object({
    title: z.array(z.string().min(1)).length(6),
    description: z.string().min(10),
});

export const homeAboutSchema = z.object({
    description: z.array(z.string().min(1)).length(5),
});

const horizontalLinkSchema = z
    .object({
        type: z.enum(["firebase", "external"]),
        url: z.string().min(1),
        path: z.string().optional(),
        contentType: z.string().optional(),
    })
    .superRefine((value, ctx) => {
        if (value.type === "firebase") {
            if (!value.path) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "path is required for firebase link",
                    path: ["path"],
                });
            }
            if (!value.contentType) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "contentType is required for firebase link",
                    path: ["contentType"],
                });
            }
        }
    });

const horizontalSchema = z.object({
    link: horizontalLinkSchema,
    title: z.array(z.string().min(1)).length(2),
    slogan: z.string().min(3),
    description: z.array(z.string().min(1)).min(1),
});

export const homeHorizontalSchema = z.array(horizontalSchema).min(1);

const testimonialSchema = z.object({
    name: z.string().min(3),
    title: z.string().optional(),
    message: z.string().min(10),
    rating: z.number().min(1).max(5),
    avatar: fileSchema.optional(),
});

export const homeTestimonialsSchema = z.array(testimonialSchema).min(1);

const locationSchema = z.object({
    title: z.string().min(3),
    address: z.string().min(10),
    mapUrl: z.string().min(1),
});

export const homeLocationsSchema = z.array(locationSchema).min(1);

