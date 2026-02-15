"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HeroSchema = new mongoose_1.default.Schema({
    title: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length >= 3,
            message: "Title must have at least 3 words."
        }
    },
    description: {
        type: String,
        required: false,
        validate: {
            validator: (value) => !value || value.length >= 10,
            message: "Description must be at least 10 characters."
        }
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
const DiscoverCardSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: false,
        validate: {
            validator: (value) => !value || value.length >= 10,
            message: "Description must be at least 10 characters."
        }
    },
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
    link: {
        type: String,
        required: true,
    }
}, { _id: false, timestamps: true });
const DiscoverFloorsSchema = new mongoose_1.default.Schema({
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
    cards: {
        type: [DiscoverCardSchema],
        required: true,
        validate: {
            validator: (v) => v.length >= 6,
            message: "Cards must have at least 6 items."
        }
    }
}, { _id: false, timestamps: true });
const FloorsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    floor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Floor",
        required: false,
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
const DiscoverSchema = new mongoose_1.default.Schema({
    discoverFloors: {
        type: DiscoverFloorsSchema,
        required: true,
    },
    floors: {
        type: [FloorsSchema],
        required: true,
    },
}, { _id: false, timestamps: true });
const ServiceBirthDayPartyPriceItemSchema = new mongoose_1.default.Schema({
    price: {
        type: Number,
        required: true,
    },
    per: {
        type: String,
        required: true,
        minlength: 1,
    }
}, { _id: false, timestamps: true });
const ServiceBirthDayPartyPriceSchema = new mongoose_1.default.Schema({
    weekdays: {
        type: ServiceBirthDayPartyPriceItemSchema,
        required: false,
    },
    weekends: {
        type: ServiceBirthDayPartyPriceItemSchema,
        required: false,
    },
}, { _id: false, timestamps: true });
const ServiceBirthDayPartyPackagesSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    oldPrice: {
        type: Number,
        required: false,
    },
    price: {
        type: ServiceBirthDayPartyPriceSchema,
        required: true,
        validate: {
            validator: (value) => !!(value?.weekdays || value?.weekends),
            message: "At least one of weekdays or weekends price is required."
        }
    },
    description: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length >= 1,
            message: "Description must have at least 1 item."
        }
    },
    highlights: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v) => v.length >= 1,
            message: "Highlights must have at least 1 item."
        }
    }
}, { _id: false, timestamps: true });
const ServicesFileSchema = new mongoose_1.default.Schema({
    url: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: false,
    },
    contentType: String,
    uploadedAt: {
        type: Date,
        default: Date.now,
    }
}, { _id: false, timestamps: true });
const ServicesBirthDayPartySchema = new mongoose_1.default.Schema({
    modalDescription: {
        type: String,
        required: true,
        minlength: 10
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    files: {
        type: [ServicesFileSchema],
        required: false,
    },
    packages: {
        list: {
            type: [ServiceBirthDayPartyPackagesSchema],
            required: true,
            validate: {
                validator: (v) => Array.isArray(v) && v.length >= 1,
                message: "Packages must have at least 1 item."
            }
        },
        prince: {
            hidden: {
                type: Boolean,
                required: true,
                default: false,
            },
            title: {
                type: String,
                required: function () {
                    return !this.hidden;
                },
                minlength: 3,
            },
            description: {
                type: String,
                required: function () {
                    return !this.hidden;
                },
                minlength: 10
            }
        }
    }
}, { _id: false, timestamps: true });
const ServicesMembershipPackagesCardSchema = new mongoose_1.default.Schema({
    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    hours: {
        perMonth: {
            icon: {
                type: String,
                required: true,
            },
            highlight: {
                no: {
                    type: Number,
                    required: true,
                },
                line: {
                    type: String,
                    required: true,
                    minlength: 3,
                }
            }
        },
        perWeek: {
            icon: {
                type: String,
                required: true,
            },
            highlight: {
                no: {
                    type: Number,
                    required: true,
                },
                line: {
                    type: String,
                    required: true,
                    minlength: 3,
                }
            }
        },
        perSession: {
            icon: {
                type: String,
                required: true,
            },
            highlight: {
                no: {
                    type: Number,
                    required: true,
                },
                line: {
                    type: String,
                    required: true,
                    minlength: 3,
                }
            }
        },
        totalTime: {
            icon: {
                type: String,
                required: true,
            },
            line: {
                type: String,
                required: true,
                minlength: 3,
            }
        }
    },
    oldPricePerMonth: {
        type: Number,
        required: true,
    },
    pricePerMonth: {
        type: Number,
        required: true,
    },
    highlights: {
        type: mongoose_1.default.Schema.Types.Array,
        required: true,
        minlength: 3,
        validate: {
            validator: (v) => v.length >= 3,
            message: "Highlights must have at least 3 items."
        }
    },
    isPopular: {
        type: Boolean,
        required: true,
    }
}, { _id: false, timestamps: true });
const ServicesMembershipPackagesSchema = new mongoose_1.default.Schema({
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    files: {
        type: [ServicesFileSchema],
        required: false,
    },
    packages: {
        description: {
            type: String,
            required: true,
            minlength: 10
        },
        years: {
            3: {
                type: [ServicesMembershipPackagesCardSchema],
                required: true,
                validate: {
                    validator: (v) => Array.isArray(v) && v.length >= 1,
                    message: "Each year must include at least 1 plan."
                }
            },
            6: {
                type: [ServicesMembershipPackagesCardSchema],
                required: true,
                validate: {
                    validator: (v) => Array.isArray(v) && v.length >= 1,
                    message: "Each year must include at least 1 plan."
                }
            }
        }
    }
}, { _id: false, timestamps: true });
const ServicesSchoolTripsAndNurseryBaseSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    video: {
        type: ServicesFileSchema,
        required: false,
    },
    catelog: {
        type: ServicesFileSchema,
        required: false,
    }
}, { _id: false, timestamps: true });
const ServicesSchoolTripsAndNurserySchema = new mongoose_1.default.Schema({
    schoolTrips: ServicesSchoolTripsAndNurseryBaseSchema,
    nursery: ServicesSchoolTripsAndNurseryBaseSchema
}, { _id: false, timestamps: true });
const ServicesWalkinSchema = new mongoose_1.default.Schema({
    firstCards: [
        {
            icon: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
                minlength: 3,
            },
            description: {
                type: String,
                required: true,
                minlength: 10
            }
        }
    ],
    lastCards: [
        {
            icon: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
                minlength: 3,
            },
            highlights: {
                type: mongoose_1.default.Schema.Types.Array,
                required: true,
                minlength: 3,
                validate: {
                    validator: (v) => v.length >= 3,
                    message: "Highlights must have at least 3 items."
                }
            }
        }
    ],
    joinerFloor: {
        description: {
            type: mongoose_1.default.Schema.Types.Array,
            required: true,
            validate: {
                validator: (v) => v.length == 2,
                message: "Description must have exactly 2 items."
            }
        },
        files: [
            {
                tag: {
                    type: String,
                    required: true,
                    minlength: 3,
                },
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
                    default: Date.now
                }
            }
        ]
    },
    geniusFloor: {
        description: {
            type: mongoose_1.default.Schema.Types.Array,
            required: true,
            validate: {
                validator: (v) => v.length == 2,
                message: "Description must have exactly 2 items."
            }
        },
        files: [
            {
                tag: {
                    type: String,
                    required: true,
                    minlength: 3,
                },
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
                    default: Date.now
                }
            }
        ]
    }
}, { _id: false, timestamps: true });
const ServicesSchema = new mongoose_1.default.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length >= 4,
            message: "Title must have at least 4 items."
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    birthDayParty: ServicesBirthDayPartySchema,
    membershipPackages: ServicesMembershipPackagesSchema,
    schoolTripsAndNursery: ServicesSchoolTripsAndNurserySchema,
    walkin: ServicesWalkinSchema
}, { _id: false, timestamps: true });
const LandBaseSchema = new mongoose_1.default.Schema({
    hero: HeroSchema,
    discoverFloors: DiscoverFloorsSchema,
    floors: {
        type: [FloorsSchema],
        required: true,
    },
    testimonialsTitle: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length >= 3,
            message: "Title must have at least 3 items."
        }
    },
    services: ServicesSchema,
}, { _id: false, timestamps: true });
const LandSchema = new mongoose_1.default.Schema({
    ar: {
        type: LandBaseSchema,
        required: false
    },
    en: {
        type: LandBaseSchema,
        required: false
    }
}, { timestamps: true });
LandSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});
exports.LandModel = mongoose_1.default.model('Land', LandSchema);
