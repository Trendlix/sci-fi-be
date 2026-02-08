import mongoose, { Document } from 'mongoose';
import { IHome } from './types/model.types';

const HeroSchema = new mongoose.Schema(
    {
        title: {
            type: [String],
            required: true,
            validate: {
                validator: (v: string[]) => v.length === 6,
                message: 'Title must have exactly 6 words.'
            }
        },
        description: {
            type: String,
            required: true,
            minlength: 10
        }
    },
    { timestamps: true, _id: false }
);

const AboutSchema = new mongoose.Schema(
    {
        title: {
            type: [String],
            required: true,
            validate: {
                validator: (v: string[]) => v.length === 2,
                message: "Title must have exactly 2 words."
            }
        },
        description: {
            type: [String],
            required: true,
            validate: {
                validator: (v: string[]) => v.length === 5,
                message: "Description must have exactly 5 items."
            }
        },
    },
    { timestamps: true, _id: false }
);

const HorizontalSchema = new mongoose.Schema(
    {
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
                required: function (this: { type?: string }) {
                    return this.type === "firebase";
                },
            },
            contentType: {
                type: String,
                required: function (this: { type?: string }) {
                    return this.type === "firebase";
                },
            },
        },
        title: {
            type: [String],
            required: true,
            validate: {
                validator: (v: string[]) => v.length === 2,
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
                validator: (v: string[]) => v.length >= 1,
                message: 'Description must have at least 1 paragraph.'
            }
        }
    },
    { timestamps: true, _id: false }
);

const TestmonialsCardSchema = new mongoose.Schema(
    {
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
    },
    { timestamps: true, _id: false }
);

const TestimonialsSchema = new mongoose.Schema(
    {
        title: {
            type: [String],
            required: true,
            validate: {
                validator: (v: string[]) => v.length === 2,
                message: "Title must have exactly 2 words."
            }
        },
        cards: {
            type: [TestmonialsCardSchema],
            required: true,
        }
    },
    { timestamps: true, _id: false }
);

const LocationsSchema = new mongoose.Schema(
    {
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
    },
    { timestamps: true, _id: false }
);

const LocationsSectionSchema = new mongoose.Schema(
    {
        title: {
            type: [String],
            required: true,
            validate: {
                validator: (v: string[]) => v.length === 2,
                message: "Title must have exactly 2 words."
            }
        },
        cards: {
            type: [LocationsSchema],
            required: true,
        }
    },
    { timestamps: true, _id: false }
);

const HomeBaseSchema = new mongoose.Schema({
    hero: HeroSchema,
    about: AboutSchema,
    horizontal: {
        type: [HorizontalSchema],
        default: []
    },
    testimonials: TestimonialsSchema,
    locations: LocationsSectionSchema
}, { timestamps: true, _id: false });

const HomeSchema = new mongoose.Schema(
    {
        ar: {
            type: HomeBaseSchema,
            required: false
        },
        en: {
            type: HomeBaseSchema,
            required: false
        }
    },
    { timestamps: true }
);

HomeSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});

export type IHomeModel = IHome & Document;
export const HomeModel = mongoose.model<IHomeModel>('Home', HomeSchema);