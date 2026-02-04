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
exports.eventUpcomingSchema = exports.eventFeaturedSchema = exports.eventReadySchema = exports.eventHowSchema = exports.eventProgramSchema = exports.eventPartnersSchema = exports.eventAboutSchema = exports.eventHeroSchema = void 0;
const z = __importStar(require("zod"));
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
exports.eventHeroSchema = z.object({
    cards: z.array(eventHeroCardSchema).min(1),
});
const eventAboutCardSchema = z.object({
    icon: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(10),
});
exports.eventAboutSchema = z.object({
    description: z.string().min(10),
    cards: z.array(eventAboutCardSchema).min(1),
});
exports.eventPartnersSchema = z.object({
    description: z.string().min(10),
    files: z.array(fileSchema).min(1),
});
const eventProgramCardSchema = z.object({
    icon: z.string().min(1),
    description: z.string().min(1),
    features: z.array(z.string().min(1)).min(1).max(5),
});
exports.eventProgramSchema = z.object({
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
exports.eventHowSchema = z.object({
    description: z.string().min(10),
    cards: z.array(eventHowCardSchema).min(1),
});
const eventReadyCardSchema = z.object({
    icon: z.string().min(1),
    no: z.number().min(1),
    title: z.string().min(1),
});
exports.eventReadySchema = z.object({
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
exports.eventFeaturedSchema = z.object({
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
exports.eventUpcomingSchema = z.array(eventUpcomingCardSchema).min(1);
