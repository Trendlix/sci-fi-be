import mongoose, { Document } from "mongoose";
import { IFloor } from "./types/model.types";

const HeaderSchema = new mongoose.Schema({
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


const HeroSchema = new mongoose.Schema({
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
            validator: (v: unknown[]) => v.length === 3,
            message: "Files must have exactly 3 items.",
        },
    },
}, { _id: false, timestamps: true });

const FeaturesSchema = new mongoose.Schema({
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
            validator: (v: unknown[]) => v.length >= 1,
            message: "Cards must have at least 1 item.",
        },
    }
}, { _id: false, timestamps: true });

const ServicesSchema = new mongoose.Schema({
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

const GroundsSchema = new mongoose.Schema({
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
            validator: (v: unknown[]) => v.length >= 1,
            message: "Cards must have at least 1 item.",
                },
    }
}, { _id: false, timestamps: true });

const FloorsSliderSchema = new mongoose.Schema({
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
            validator: (v: unknown[]) => v.length >= 1,
            message: "Fcards must have at least 1 item.",
        },
    }
}, { _id: false, timestamps: true });

const FloorsBaseSchema = new mongoose.Schema({
    header: HeaderSchema,
    hero: HeroSchema,
    features: FeaturesSchema,
    services: ServicesSchema,
    grounds: GroundsSchema,
    floorsSlider: FloorsSliderSchema,
}, { _id: false, timestamps: true });

const FloorsSchema = new mongoose.Schema({
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

export type IFloorModel = IFloor & Document;
export const FloorModel = mongoose.model<IFloorModel>('Floor', FloorsSchema);
