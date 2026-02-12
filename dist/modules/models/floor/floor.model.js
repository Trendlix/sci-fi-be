"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HeaderSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
}, { _id: false, timestamps: true });
const HeroSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
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
    files: {
        type: [
            {
                url: {
                    type: String,
                    required: true,
                },
                path: {
                    type: String,
                    required: true,
                },
                contentType: String,
                uploadedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        validate: {
            validator: (v) => v.length === 3,
            message: "Files must have exactly 3 items.",
        },
    },
}, { _id: false, timestamps: true });
const FeaturesSchema = new mongoose_1.default.Schema({
    cards: {
        type: [
            {
                file: {
                    url: {
                        type: String,
                        required: true,
                    },
                    path: {
                        type: String,
                        required: true,
                    },
                    contentType: String,
                    uploadedAt: {
                        type: Date,
                        default: Date.now,
                    },
                },
                title: {
                    type: String,
                    required: true,
                    minlength: 3,
                },
                description: {
                    type: String,
                    required: true,
                    minlength: 10,
                },
                cta: {
                    type: String,
                    required: true,
                    minlength: 3,
                },
            }
        ],
        validate: {
            validator: (v) => v.length >= 1,
            message: "Cards must have at least 1 item.",
        },
    }
}, { _id: false, timestamps: true });
const ServicesSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length >= 2,
            message: "Title must have at least 2 items.",
        },
    },
    hidden: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    cards: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                    minlength: 3,
                },
                thumbnail: {
                    url: {
                        type: String,
                        required: true,
                    },
                    path: {
                        type: String,
                        required: true,
                    },
                    contentType: String,
                    uploadedAt: {
                        type: Date,
                        default: Date.now,
                    },
                },
                files: {
                    type: [
                        {
                            url: {
                                type: String,
                                required: true,
                            },
                            path: {
                                type: String,
                                required: true,
                            },
                            contentType: String,
                            uploadedAt: {
                                type: Date,
                                default: Date.now,
                            },
                        }
                    ],
                    default: [],
                }
            }
        ]
    }
}, { _id: false, timestamps: true });
const GroundsSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length >= 2,
            message: "Title must have at least 2 items.",
        },
    },
    hidden: {
        type: Boolean,
        default: false,
    },
    cards: {
        type: [
            {
                file: {
                    url: {
                        type: String,
                        required: true,
                    },
                    path: {
                        type: String,
                        required: true,
                    },
                    contentType: String,
                    uploadedAt: {
                        type: Date,
                        default: Date.now,
                    },
                },
                title: {
                    type: String,
                    required: true,
                    minlength: 3,
                },
                description: {
                    type: String,
                    required: true,
                    minlength: 10,
                },
                cta: {
                    type: String,
                    required: true,
                    minlength: 3,
                },
            }
        ],
        validate: {
            validator: (v) => v.length >= 1,
            message: "Cards must have at least 1 item.",
        },
    }
}, { _id: false, timestamps: true });
const FloorsSliderSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
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
        type: [
            {
                file: {
                    url: {
                        type: String,
                        required: true,
                    },
                    path: {
                        type: String,
                        required: true,
                    },
                    contentType: String,
                    uploadedAt: {
                        type: Date,
                        default: Date.now,
                    },
                },
                title: {
                    type: String,
                    required: true,
                    minlength: 3,
                },
                description: {
                    type: String,
                    required: true,
                    minlength: 10,
                }
            }
        ],
        validate: {
            validator: (v) => v.length >= 1,
            message: "Fcards must have at least 1 item.",
        },
    }
}, { _id: false, timestamps: true });
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
const FloorsBaseSchema = new mongoose_1.default.Schema({
    header: HeaderSchema,
    hero: HeroSchema,
    features: FeaturesSchema,
    services: ServicesSchema,
    grounds: GroundsSchema,
    floorsSlider: FloorsSliderSchema,
    seo: {
        type: SeoBaseSchema,
        required: true,
    },
}, { _id: false, timestamps: true });
const FloorsSchema = new mongoose_1.default.Schema({
    ar: {
        type: FloorsBaseSchema,
        required: false,
    },
    en: {
        type: FloorsBaseSchema,
        required: false,
    },
    landFloorIndex: {
        type: Number,
        required: false,
    },
    landFloorTitle: {
        ar: {
            type: String,
            required: false,
        },
        en: {
            type: String,
            required: false,
        },
    },
}, { timestamps: true });
FloorsSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});
exports.FloorModel = mongoose_1.default.model('Floor', FloorsSchema);
