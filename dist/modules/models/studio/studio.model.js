"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FileSchema = new mongoose_1.default.Schema({
    url: {
        type: String,
        required: false,
    },
    path: {
        type: String,
        required: false,
    },
    contentType: {
        type: String,
        required: false,
    },
    uploadedAt: {
        type: String,
        required: false,
    },
}, { _id: false, timestamps: false });
const StudioHeroCardSchema = new mongoose_1.default.Schema({
    title: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length >= 2,
            message: "Title must have at least 2 items.",
        },
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    file: {
        type: FileSchema,
        required: false,
    },
}, { _id: false, timestamps: true });
const StudioHeroSchema = new mongoose_1.default.Schema({
    cards: {
        type: [StudioHeroCardSchema],
        required: true,
        validate: {
            validator: (v) => v.length >= 1,
            message: "Cards must have at least 1 item.",
        },
    },
}, { _id: false, timestamps: true });
const StudioAboutCardSchema = new mongoose_1.default.Schema({
    tag: {
        type: String,
        required: true,
        minlength: 1,
    },
    file: {
        type: FileSchema,
        required: false,
    },
    icon: {
        type: String,
        required: true,
        minlength: 1,
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
    },
}, { _id: false, timestamps: true });
const StudioAboutSchema = new mongoose_1.default.Schema({
    title: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length >= 2,
            message: "Title must have at least 2 items.",
        },
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    cards: {
        type: [StudioAboutCardSchema],
        required: true,
        validate: {
            validator: (v) => v.length >= 1,
            message: "Cards must have at least 1 item.",
        },
    },
}, { _id: false, timestamps: true });
const StudioPartnersSchema = new mongoose_1.default.Schema({
    title: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length >= 2,
            message: "Title must have at least 2 items.",
        },
    },
    description: {
        type: String,
        required: false,
    },
    files: {
        type: [FileSchema],
        required: true,
        validate: {
            validator: (v) => v.length >= 1,
            message: "Files must have at least 1 item.",
        },
    },
}, { _id: false, timestamps: true });
const StudioWhyUsLineSchema = new mongoose_1.default.Schema({
    icon: {
        type: String,
        required: true,
        minlength: 1,
    },
    line: {
        type: String,
        required: true,
        minlength: 3,
    },
}, { _id: false, timestamps: true });
const StudioWhyUsSchema = new mongoose_1.default.Schema({
    title: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length >= 2,
            message: "Title must have at least 2 items.",
        },
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    lines: {
        type: [StudioWhyUsLineSchema],
        required: true,
        validate: {
            validator: (v) => v.length >= 1,
            message: "Lines must have at least 1 item.",
        },
    },
}, { _id: false, timestamps: true });
const StudioBaseSchema = new mongoose_1.default.Schema({
    hero: {
        type: StudioHeroSchema,
        required: false,
    },
    about: {
        type: StudioAboutSchema,
        required: false,
    },
    partners: {
        type: StudioPartnersSchema,
        required: false,
    },
    whyUs: {
        type: StudioWhyUsSchema,
        required: false,
    },
}, { _id: false, timestamps: true });
const StudioSchema = new mongoose_1.default.Schema({
    ar: {
        type: StudioBaseSchema,
        required: false,
    },
    en: {
        type: StudioBaseSchema,
        required: false,
    },
}, { timestamps: true });
StudioSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});
exports.StudioModel = mongoose_1.default.model("Studio", StudioSchema);
