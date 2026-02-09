import mongoose, { Document } from "mongoose";
import { ILand } from "./types/model.types";

const HeroSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v: string[]) => v.length >= 3,
            message: "Title must have at least 3 words."
        }
    },
    description: {
        type: String,
        required: false,
        validate: {
            validator: (value?: string) => !value || value.length >= 10,
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

const DiscoverCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,

    },
    description: {
        type: String,
        required: false,
        validate: {
            validator: (value?: string) => !value || value.length >= 10,
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

const DiscoverFloorsSchema = new mongoose.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length >= 2,
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
            validator: (v: unknown[]) => v.length >= 6,
            message: "Cards must have at least 6 items."
        }
    }
}, { _id: false, timestamps: true });

const FloorsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,

    },
    floor: {
        type: mongoose.Schema.Types.ObjectId,
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

const DiscoverSchema = new mongoose.Schema({
    discoverFloors: {
        type: DiscoverFloorsSchema,
        required: true,
    },
    floors: {
        type: [FloorsSchema],
        required: true,
    },
}, { _id: false, timestamps: true });

const ServiceBirthDayPartyPackagesSchema = new mongoose.Schema({
    oldPrice: {
        type: Number,
        required: true,
    },
    price: {
        weekdays: {
            type: Number,
            required: true,
        },
        weekends: {
            type: Number,
            required: true,
        }
    },
    description: {
        type: mongoose.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v: string[]) => v.length >= 1 && v.length <= 3,
            message: "Description must have at least 1 item and at most 3 items."
        }
    },
    highlights: {
        type: mongoose.Schema.Types.Array,
        required: true,
        minlength: 3,
        validate: {
            validator: (v: string[]) => v.length >= 3,
            message: "Highlights must have at least 3 items."
        }
    }
}, { _id: false, timestamps: true });

const ServicesFileSchema = new mongoose.Schema({
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

const ServicesBirthDayPartySchema = new mongoose.Schema({
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
        bronze: ServiceBirthDayPartyPackagesSchema,
        gold: ServiceBirthDayPartyPackagesSchema,
        diamond: {
            oldPrice: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            description: {
                type: mongoose.Schema.Types.Array,
                required: true,
                validate: {
                    validator: (v: string[]) => v.length >= 1 && v.length <= 3,
                    message: "Description must have at least 1 item and at most 3 items."
                }
            },
            highlights: {
                type: mongoose.Schema.Types.Array,
                required: true,
                minlength: 3,
                validate: {
                    validator: (v: string[]) => v.length >= 3,
                    message: "Highlights must have at least 3 items."
                }
            }
        },
        prince: {
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
    }
}, { _id: false, timestamps: true });

const ServicesMembershipPackagesCardSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.Array,
        required: true,
        minlength: 3,
        validate: {
            validator: (v: string[]) => v.length >= 3,
            message: "Highlights must have at least 3 items."
        }
    },
    isPopular: {
        type: Boolean,
        required: true,
    }
}, { _id: false, timestamps: true });

const ServicesMembershipPackagesSchema = new mongoose.Schema({
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
                    validator: (v: unknown[]) => Array.isArray(v) && v.length >= 3 && v.length <= 6,
                    message: "Each year must include between 3 and 6 plans."
                }
            },
            6: {
                type: [ServicesMembershipPackagesCardSchema],
                required: true,
                validate: {
                    validator: (v: unknown[]) => Array.isArray(v) && v.length >= 3 && v.length <= 6,
                    message: "Each year must include between 3 and 6 plans."
                }
            }
        }
    }
}, { _id: false, timestamps: true });


const ServicesSchoolTripsAndNurseryBaseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    highlights: {
        icon: {
            type: String,
            required: true,
        },
        line: {
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
    }
}, { _id: false, timestamps: true });

const ServicesSchoolTripsAndNurserySchema = new mongoose.Schema({
    schoolTrips: ServicesSchoolTripsAndNurseryBaseSchema,
    nursery: ServicesSchoolTripsAndNurseryBaseSchema
}, { _id: false, timestamps: true });

const ServicesWalkinSchema = new mongoose.Schema({
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
                type: mongoose.Schema.Types.Array,
                required: true,
                minlength: 3,
                validate: {
                    validator: (v: string[]) => v.length >= 3,
                    message: "Highlights must have at least 3 items."
                }
            }
        }
    ],
    joinerFloor: {
        description: {
            type: mongoose.Schema.Types.Array,
            required: true,
            validate: {
                validator: (v: string[]) => v.length == 2,
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
            type: mongoose.Schema.Types.Array,
            required: true,
            validate: {
                validator: (v: string[]) => v.length == 2,
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

const ServicesSchema = new mongoose.Schema({
    title: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length >= 4,
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

const LandBaseSchema = new mongoose.Schema({
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
            validator: (v: string[]) => v.length >= 3,
            message: "Title must have at least 3 items."
        }
    },
    services: ServicesSchema,
}, { _id: false, timestamps: true });

const LandSchema = new mongoose.Schema({
    ar: {
        type: LandBaseSchema,
        required: false
    },
    en: {
        type: LandBaseSchema,
        required: false
    }
}, { timestamps: true });

export type ILandModel = ILand & Document;

LandSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});
export const LandModel = mongoose.model<ILandModel>('Land', LandSchema);