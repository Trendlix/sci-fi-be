"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HeroSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10
    }
}, { timestamps: true, _id: false });
const GetInTouchSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ["phone", "email", "address", "hours"],
        required: true
    },
    lines: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length >= 1 && v.length <= 2,
            message: "Lines must have between 1 and 2 items."
        }
    }
}, { timestamps: true, _id: false });
const ContactBaseSchema = new mongoose_1.default.Schema({
    hero: {
        type: HeroSchema,
        required: true
    },
    getInTouch: {
        description: {
            type: String,
            required: true,
            minlength: 10
        },
        cards: {
            type: [GetInTouchSchema],
            default: [],
            validate: {
                validator: (v) => v.length >= 1 && v.length <= 4,
                message: "Get in touch must have between 1 and 4 items."
            }
        }
    }
}, { timestamps: true, _id: false });
const ContactSchema = new mongoose_1.default.Schema({
    ar: {
        type: ContactBaseSchema,
        required: false,
    },
    en: {
        type: ContactBaseSchema,
        required: false,
    },
}, { timestamps: true });
ContactSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});
exports.ContactModel = mongoose_1.default.model('Contact', ContactSchema);
