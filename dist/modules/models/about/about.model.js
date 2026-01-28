"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HeroSchema = new mongoose_1.default.Schema({
    title: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length === 6,
            message: "Title must have exactly 6 words.",
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    }
}, { _id: false, timestamps: true });
const AboutCardSchema = new mongoose_1.default.Schema({
    icon: {
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
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { _id: false, timestamps: true });
const AboutMinSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    cards: {
        type: [AboutCardSchema],
        required: true,
        validate: {
            validator: (v) => v.length >= 1 && v.length <= 2,
            message: "Cards must have between 1 and 2 items."
        }
    }
}, { _id: false, timestamps: true });
const ServiceCardSchema = new mongoose_1.default.Schema({
    tag: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
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
        minlength: 10,
        maxlength: 100
    }
}, { _id: false, timestamps: true });
const ServiceSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
    },
    cards: {
        type: [ServiceCardSchema],
        required: true,
        validate: {
            validator: (v) => v.length >= 1,
            message: "Cards must have at least 1 item."
        }
    }
}, { _id: false, timestamps: true });
const PreValueSchema = new mongoose_1.default.Schema({
    title: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length === 5,
            message: "Title must have exactly 6 words.",
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
    },
    file: {
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
            type: Date,
            default: Date.now,
        }
    }
}, { _id: false, timestamps: true });
const ValueCardSchema = new mongoose_1.default.Schema({
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
        minlength: 10,
        maxlength: 100
    }
}, { _id: false, timestamps: true });
const ValueSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
    },
    cards: {
        type: [ValueCardSchema],
        required: true,
        validate: {
            validator: (v) => v.length >= 1,
            message: "Cards must have at least 1 item."
        }
    }
}, { _id: false, timestamps: true });
const AboutBaseSchema = new mongoose_1.default.Schema({
    hero: HeroSchema,
    about: AboutMinSchema,
    service: ServiceSchema,
    preValue: PreValueSchema,
    value: ValueSchema
}, { _id: false, timestamps: true });
const AboutSchema = new mongoose_1.default.Schema({
    ar: {
        type: AboutBaseSchema,
        required: false,
    },
    en: {
        type: AboutBaseSchema,
        required: false,
    }
}, { timestamps: true });
AboutSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});
exports.AboutModel = mongoose_1.default.model('About', AboutSchema);
