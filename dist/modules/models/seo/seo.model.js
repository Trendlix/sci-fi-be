"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SeoBaseSchema = new mongoose_1.default.Schema({
    filesAlt: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    keywords: {
        type: [String],
        required: true,
    },
}, { _id: false, timestamps: true });
const SeoSchema = new mongoose_1.default.Schema({
    ar: {
        home: SeoBaseSchema,
        about: SeoBaseSchema,
        contact: SeoBaseSchema,
        events: SeoBaseSchema,
        studio: SeoBaseSchema,
        land: SeoBaseSchema,
    },
    en: {
        home: SeoBaseSchema,
        about: SeoBaseSchema,
        contact: SeoBaseSchema,
        events: SeoBaseSchema,
        studio: SeoBaseSchema,
        land: SeoBaseSchema,
    },
}, { timestamps: true });
SeoSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});
exports.SeoModel = mongoose_1.default.model("Seo", SeoSchema);
