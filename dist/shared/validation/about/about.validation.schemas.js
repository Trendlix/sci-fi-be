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
exports.aboutValidationSchema = void 0;
const z = __importStar(require("zod"));
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
exports.aboutValidationSchema = z
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
