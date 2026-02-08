"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeLocationsSchema = exports.homeTestimonialsSchema = exports.homeHorizontalSchema = exports.homeAboutSchema = exports.homeHeroSchema = void 0;
const z = __importStar(require("zod"));
exports.homeHeroSchema = z.object({
    title: z.array(z.string().min(1)).length(6),
    description: z.string().min(10),
});
exports.homeAboutSchema = z.object({
    title: z.array(z.string().min(1)).length(2),
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
exports.homeHorizontalSchema = z.array(horizontalSchema).min(1);
const testimonialCardSchema = z.object({
    name: z.string().min(3),
    title: z.string().min(1),
    message: z.string().min(10),
    rating: z.number().min(1).max(5),
});
const testimonialSchema = z.object({
    title: z.array(z.string().min(1)).length(2),
    cards: z.array(testimonialCardSchema).min(1),
});
exports.homeTestimonialsSchema = testimonialSchema;
const locationSchema = z.object({
    title: z.string().min(3),
    address: z.string().min(10),
    mapUrl: z.string().min(1),
});
exports.homeLocationsSchema = z.object({
    title: z.array(z.string().min(1)).length(2),
    cards: z.array(locationSchema).min(1),
});
