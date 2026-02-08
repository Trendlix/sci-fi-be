"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HeroSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length === 6,
            message: 'Title must have exactly 6 words.'
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    }
}, { timestamps: true, _id: false });
const AboutSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length === 2,
            message: "Title must have exactly 2 words."
        }
    },
    description: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length === 5,
            message: "Description must have exactly 5 items."
        }
    },
}, { timestamps: true, _id: false });
const HorizontalSchema = new mongoose_1.default.Schema({
    link: {
        type: {
            type: String,
            enum: ["firebase", "external"],
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: function () {
                return this.type === "firebase";
            },
        },
        contentType: {
            type: String,
            required: function () {
                return this.type === "firebase";
            },
        },
    },
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length === 2,
            message: 'Title must have exactly 2 words.'
        }
    },
    slogan: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length >= 1,
            message: 'Description must have at least 1 paragraph.'
        }
    }
}, { timestamps: true, _id: false });
const TestmonialsCardSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    message: {
        type: String,
        required: true,
        minlength: 10
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, { timestamps: true, _id: false });
const TestimonialsSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length === 2,
            message: "Title must have exactly 2 words."
        }
    },
    cards: {
        type: [TestmonialsCardSchema],
        required: true,
    }
}, { timestamps: true, _id: false });
const LocationsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    address: {
        type: String,
        required: true,
        minlength: 10
    },
    mapUrl: {
        type: String,
        required: true,
        match: /^https?:\/\//
    }
}, { timestamps: true, _id: false });
const LocationsSectionSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length === 2,
            message: "Title must have exactly 2 words."
        }
    },
    cards: {
        type: [LocationsSchema],
        required: true,
    }
}, { timestamps: true, _id: false });
const HomeBaseSchema = new mongoose_1.default.Schema({
    hero: HeroSchema,
    about: AboutSchema,
    horizontal: {
        type: [HorizontalSchema],
        default: []
    },
    testimonials: TestimonialsSchema,
    locations: LocationsSectionSchema
}, { timestamps: true, _id: false });
const HomeSchema = new mongoose_1.default.Schema({
    ar: {
        type: HomeBaseSchema,
        required: false
    },
    en: {
        type: HomeBaseSchema,
        required: false
    }
}, { timestamps: true });
HomeSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});
exports.HomeModel = mongoose_1.default.model('Home', HomeSchema);
