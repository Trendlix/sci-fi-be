"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HeroCardSchema = new mongoose_1.default.Schema({
    title: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length === 8,
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
const HeroSchema = new mongoose_1.default.Schema({
    cards: {
        type: [HeroCardSchema],
        required: true,
        validate: {
            validator: (cards) => cards.length > 0,
            message: "at least one card required."
        }
    }
}, { _id: false, timestamps: true });
const AboutSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length >= 2,
            message: "Title must have at least 2 items."
        }
    },
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
const PartnersSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length >= 2,
            message: "Title must have at least 2 items."
        }
    },
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
const ProgramSchema = new mongoose_1.default.Schema({
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
const HowCardSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length <= 4,
            message: "highlights must have at most 4 items"
        }
    }
}, { _id: false, timestamps: true });
const HowSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    cards: {
        type: [HowCardSchema],
        required: true,
        validate: {
            validator: (cards) => cards.length > 0,
            message: "at least one card required."
        }
    }
}, { _id: false, timestamps: true });
const ReadyCardSchema = new mongoose_1.default.Schema({
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
}, { _id: false, timestamps: true });
const ReadySchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true
    },
    cards: {
        type: [ReadyCardSchema],
        required: true,
        validate: {
            validator: (cards) => cards.length == 3,
            message: "Just 3 cards no more."
        }
    }
}, { _id: false, timestamps: true });
const FeaturedCardSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length >= 3,
            message: "Highlights must have at least 3 items."
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    }
}, { _id: false, timestamps: true });
const FeaturedSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length === 2,
            message: "Title must have exactly 2 items."
        }
    },
    description: {
        type: String,
        required: true
    },
    cards: {
        type: [FeaturedCardSchema],
        required: true,
        validate: {
            validator: (cards) => cards.length >= 1,
            message: "at least one card required."
        }
    }
}, { _id: false, timestamps: true });
const UpcomingSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length >= 3,
            message: "highlights must have at least 3 items."
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
const NewsLetterSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length >= 2,
            message: "Title must have at least 2 items."
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    }
}, { _id: false, timestamps: true });
const EventBaseSchema = new mongoose_1.default.Schema({
    hero: HeroSchema,
    about: AboutSchema,
    partners: PartnersSchema,
    program: ProgramSchema,
    newsLetter: NewsLetterSchema,
    how: HowSchema,
    ready: ReadySchema,
    featured: FeaturedSchema,
    upcoming: [UpcomingSchema]
}, { timestamps: true, _id: false });
const EventSchema = new mongoose_1.default.Schema({
    ar: {
        type: EventBaseSchema,
        required: false
    },
    en: {
        type: EventBaseSchema,
        required: false
    }
}, { timestamps: true });
EventSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});
exports.EventModel = mongoose_1.default.model("Event", EventSchema);
