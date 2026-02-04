import mongoose, { Document } from "mongoose";
import { IEvent } from "./types/model.types";


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

const AboutSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    cards: [
        {
            icon: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true,
                minlength: 10
            }
        }
    ]
}, { _id: false, timestamps: true });

const PartnersSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10
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

const ProgramCardSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length <= 5,
            message: "Features must have at most 5 items."
        }
    }
}, { _id: false, timestamps: true });

const ProgramSchema = new mongoose.Schema({
    vr_arena: ProgramCardSchema,
    printing_lab_3d: ProgramCardSchema,
    innovation_lab: ProgramCardSchema,
    tech_museum: ProgramCardSchema,
    digital_art_studio: ProgramCardSchema
}, { _id: false, timestamps: true });


const HowCardSchema = new mongoose.Schema({
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
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    highlights: {
        type: mongoose.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v: string[]) => v.length <= 4,
            message: "highlights must have at most 4 items"
        }
    }
}, { _id: false, timestamps: true });
const HowSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    cards: {
        type: [HowCardSchema],
        required: true,
        validate: {
            validator: (cards: unknown[]) => cards.length > 0,
            message: "at least one card required."
        }
    }
}, { _id: false, timestamps: true });


const ReadyCardSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    no: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, { _id: false, timestamps: true })
const ReadySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    cards: {
        type: [ReadyCardSchema],
        required: true,
        validate: {
            validator: (cards: unknown[]) => cards.length == 3,
            message: "Just 3 cards no more."
        }
    }
}, { _id: false, timestamps: true });

const FeaturedCardSchema = new mongoose.Schema({
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
    tag: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    highlights: {
        type: mongoose.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v: String[]) => v.length <= 3,
            message: "Highlights at most be 3"
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    }
}, { _id: false, timestamps: true })
const FeaturedSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    cards: {
        type: [FeaturedCardSchema],
        required: true,
        validate: {
            validator: (cards: unknown[]) => cards.length >= 1,
            message: "at least one card required."
        }
    }
}, { _id: false, timestamps: true });

const UpcomingSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true,
        unique: true
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
    tag: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    highlights: {
        type: mongoose.Schema.Types.Array,
        required: true,
        validate: {
            validator: (highlights: String[]) => highlights.length <= 3,
            message: "highlights max count is 3."
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    cta: {
        type: String,
        required: true
    }
}, { _id: false, timestamps: true });

const EventBaseSchema = new mongoose.Schema({
    hero: HeroSchema,
    about: AboutSchema,
    partners: PartnersSchema,
    program: ProgramSchema,
    how: HowSchema,
    ready: ReadySchema,
    featured: FeaturedSchema,
    upcoming: [UpcomingSchema]
}, { timestamps: true, _id: false });

const EventSchema = new mongoose.Schema(
    {
        ar: {
            type: EventBaseSchema,
            required: false
        },
        en: {
            type: EventBaseSchema,
            required: false
        }
    },
    { timestamps: true }
);

EventSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});

export type IEventModel = IEvent & Document;
export const EventModel = mongoose.model<IEventModel>("Event", EventSchema);