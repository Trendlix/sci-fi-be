import mongoose, { Document } from "mongoose";
import { ILand } from "./types/model.types";

const HeroSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.Array,
        required: true,
        validate: {
            validator: (v: string[]) => v.length === 6,
            message: "Title must have exactly 6 words."
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    }
}, { _id: false, timestamps: true });

const DiscoverCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    description: {
        type: String,
        required: true,
        minlength: 10
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
        maxlength: 20
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
                maxlength: 80,
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
                maxlength: 20
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
        maxlength: 20
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
                    maxlength: 30
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
                    maxlength: 30
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
                    maxlength: 30
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
                type: ServicesMembershipPackagesCardSchema,
                required: true,
            },
            6: {
                type: ServicesMembershipPackagesCardSchema,
                required: true,
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
                maxlength: 20
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
                maxlength: 20
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
                maxlength: 20
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
                    maxlength: 20
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
                    maxlength: 20
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