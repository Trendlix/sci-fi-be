import mongoose, { Document } from "mongoose";
import { IFooter } from "./types/model.types";

const FooterBaseSchema = new mongoose.Schema(
    {
        x: {
            type: String,
            required: false,
        },
        facebook: {
            type: String,
            required: false,
        },
        linkedin: {
            type: String,
            required: false,
        },
        instagram: {
            type: String,
            required: false,
        },
        youtube: {
            type: String,
            required: false,
        },
        tiktok: {
            type: String,
            required: false,
        },
        telegram: {
            type: String,
            required: false,
        },
        threads: {
            type: String,
            required: false,
        },
        snapchat: {
            type: String,
            required: false,
        },
        pinterest: {
            type: String,
            required: false,
        },
        reddit: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            title: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        },
        title: {
            type: [String],
            required: true,
            validate: {
                validator: (v: string[]) => v.length >= 4,
                message: "Title must have at least 4 items."
            }
        },
        subscribeDescription: {
            type: String,
            required: true,
            minlength: 10,
        }
    },
    { _id: false, timestamps: true }
);

const FooterSchema = new mongoose.Schema(
    {
        ar: {
            type: FooterBaseSchema,
            required: false,
        },
        en: {
            type: FooterBaseSchema,
            required: false,
        },
    },
    { timestamps: true }
);

FooterSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});

export type IFooterModel = IFooter & Document;
export const FooterModel = mongoose.model<IFooterModel>("Footer", FooterSchema);

