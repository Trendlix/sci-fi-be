import mongoose, { Document } from "mongoose";
import { IStudio } from "./types/model.types";

const HeroCardSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v: string[]) => v.length === 8,
            message: "Title must have exactly 8 words."
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    file: {
        url: {
            type: String,
            required: false
        },
        path: {
            type: String,
            required: false
        },
        contentType: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }
}, { _id: false, timestamps: true });

const HeroSchema = new mongoose.Schema({
    cards: {
        type: [HeroCardSchema],
        required: true,
        validate: {
            validator: (cards: unknown[]) => cards.length > 0,
            message: "at least one card required."
        }
    }
}, { _id: false, timestamps: true });


const AboutCardSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true,
    },
    file: {
        url: {
            type: String,
            required: false
        },
        path: {
            type: String,
            required: false
        },
        contentType: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
    }
}, { _id: false, timestamps: true });

const AboutSchema = new mongoose.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length >= 2,
            message: "Title must have at least 2 items."
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    cards: [AboutCardSchema]
}, { _id: false, timestamps: true });

const PartnersSchema = new mongoose.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length >= 2,
            message: "Title must have at least 2 items."
        }
    },
    description: {
        type: String,
        required: false,
        validate: {
            validator: (value?: string) => !value || value.length >= 10,
            message: "Description must be at least 10 characters."
        }
    },
    files: [{
        url: {
            type: String,
            required: false
        },
        path: {
            type: String,
            required: false
        },
        contentType: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { _id: false, timestamps: true })

const WhyUsSchema = new mongoose.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length >= 2,
            message: "Title must have at least 2 items."
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    lines: [{
        icon: {
            type: String,
            required: true,
        },
        line: {
            type: String,
            required: true,
            minlength: 3,
        }
    }]
}, { _id: false, timestamps: true })

const StudioBaseSchema = new mongoose.Schema({
    hero: HeroSchema,
    about: AboutSchema,
    partners: PartnersSchema,
    whyUs: WhyUsSchema
}, { _id: false, timestamps: true })

const StudioSchema = new mongoose.Schema({
    ar: StudioBaseSchema,
    en: StudioBaseSchema
}, { timestamps: true })

export type IStudioModel = IStudio & Document;
export const StudioModel = mongoose.model<IStudioModel>('Studio', StudioSchema);