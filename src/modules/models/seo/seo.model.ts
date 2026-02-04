import mongoose, { Document } from "mongoose";
import { ISeo } from "./types/model.types";

const SeoBaseSchema = new mongoose.Schema({
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

const SeoSchema = new mongoose.Schema({
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

export type ISeoModel = ISeo & Document;
export const SeoModel = mongoose.model<ISeoModel>("Seo", SeoSchema);