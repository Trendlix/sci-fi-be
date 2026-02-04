"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HeroSchema = new mongoose_1.default.Schema({
    title: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length === 6,
            message: "Title must have exactly 6 words."
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    }
}, { _id: false, timestamps: true });
const AboutCardSchema = new mongoose_1.default.Schema({
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
        maxlength: 20
    },
    description: {
        type: String,
        required: true,
    }
}, { _id: false, timestamps: true });
const AboutSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    cards: [AboutCardSchema]
}, { _id: false, timestamps: true });
const PartnersSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: false,
        validate: {
            validator: (value) => !value || value.length >= 10,
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
}, { _id: false, timestamps: true });
const WhyUsSchema = new mongoose_1.default.Schema({
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
                maxlength: 200
            }
        }]
}, { _id: false, timestamps: true });
const StudioBaseSchema = new mongoose_1.default.Schema({
    hero: HeroSchema,
    about: AboutSchema,
    partners: PartnersSchema,
    whyUs: WhyUsSchema
}, { _id: false, timestamps: true });
const StudioSchema = new mongoose_1.default.Schema({
    ar: StudioBaseSchema,
    en: StudioBaseSchema
}, { timestamps: true });
exports.StudioModel = mongoose_1.default.model('Studio', StudioSchema);
