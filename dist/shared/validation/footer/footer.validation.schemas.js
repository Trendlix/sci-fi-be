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
exports.footerValidationSchema = void 0;
const z = __importStar(require("zod"));
const addressSchema = z.object({
    title: z.string().min(1),
    url: z.string().min(1),
});
exports.footerValidationSchema = z.object({
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
