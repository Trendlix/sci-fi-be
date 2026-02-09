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
exports.floorSliderSchema = exports.floorHiddenSchema = exports.floorGroundsSchema = exports.floorServicesSchema = exports.floorFeaturesSchema = exports.floorHeroSchema = exports.floorHeaderSchema = void 0;
const z = __importStar(require("zod"));
const fileSchema = z.object({
    url: z.string().min(1),
    path: z.string().min(1),
    contentType: z.string().optional(),
    uploadedAt: z.string().optional(),
});
exports.floorHeaderSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
});
exports.floorHeroSchema = z.object({
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
exports.floorFeaturesSchema = z.object({
    cards: z.array(featureCardSchema).min(1),
});
const servicesCardSchema = z.object({
    title: z.string().min(3),
    thumbnail: fileSchema,
    files: z.array(fileSchema).min(1).optional(),
});
exports.floorServicesSchema = z.object({
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
exports.floorGroundsSchema = z.object({
    title: z.array(z.string().min(1)).min(2),
    hidden: z.boolean().optional(),
    cards: z.array(groundsCardSchema).min(1),
});
exports.floorHiddenSchema = z.object({
    hidden: z.boolean(),
});
const sliderCardSchema = z.object({
    file: fileSchema,
    title: z.string().min(3),
    description: z.string().min(10),
});
exports.floorSliderSchema = z.object({
    title: z.array(z.string().min(1)).min(2),
    description: z.string().min(10),
    cards: z.array(sliderCardSchema).min(1),
});
