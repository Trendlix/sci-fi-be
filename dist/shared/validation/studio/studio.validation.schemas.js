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
exports.studioWhyUsSchema = exports.studioPartnersSchema = exports.studioAboutSchema = exports.studioHeroSchema = void 0;
const z = __importStar(require("zod"));
const fileSchema = z.object({
    url: z.string().optional(),
    path: z.string().optional(),
    contentType: z.string().optional(),
    uploadedAt: z.string().optional(),
});
exports.studioHeroSchema = z.object({
    title: z.array(z.string().min(1)).min(3),
    description: z.string().min(10),
});
const aboutCardSchema = z.object({
    tag: z.string().min(1),
    file: fileSchema.optional(),
    icon: z.string().min(1),
    title: z.string().min(3),
    description: z.string().min(1),
});
exports.studioAboutSchema = z.object({
    title: z.array(z.string().min(1)).min(2),
    description: z.string().min(10),
    cards: z.array(aboutCardSchema).min(1),
});
const optionalPartnersDescription = z.union([z.string().min(10), z.literal("")]).optional();
exports.studioPartnersSchema = z.object({
    title: z.array(z.string().min(1)).min(2),
    description: optionalPartnersDescription,
    files: z.array(fileSchema).min(1),
});
const whyUsLineSchema = z.object({
    icon: z.string().min(1),
    line: z.string().min(3),
});
exports.studioWhyUsSchema = z.object({
    title: z.array(z.string().min(1)).min(2),
    description: z.string().min(10),
    lines: z.array(whyUsLineSchema).min(1),
});
