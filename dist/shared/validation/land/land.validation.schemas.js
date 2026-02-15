"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.landWalkinSchema = exports.landSchoolNurserySchema = exports.landMembershipSchema = exports.landBirthdaySchema = exports.landBirthdayPrinceVisibilitySchema = exports.landFloorsSchema = exports.landServicesHeaderSchema = exports.landDiscoverFloorsSchema = exports.landTestimonialsTitleSchema = exports.landHeroSchema = void 0;
const z = __importStar(require("zod"));
const fileSchema = z.object({
    url: z.string().optional(),
    path: z.string().optional(),
    contentType: z.string().optional(),
    uploadedAt: z.string().optional(),
});
exports.landHeroSchema = z.object({
    title: z.array(z.string().min(1)).min(3),
    description: z.string().min(10),
    file: fileSchema.optional(),
});
exports.landTestimonialsTitleSchema = z.object({
    title: z.array(z.string().min(1)).min(3),
});
const discoverCardSchema = z.object({
    title: z.string().min(3),
    description: z.union([z.string().min(10), z.literal("")]).optional(),
    icon: fileSchema,
    link: z.string().min(1),
});
exports.landDiscoverFloorsSchema = z.object({
    title: z.array(z.string().min(1)).min(2),
    description: z.string().min(10),
    cards: z.array(discoverCardSchema).min(6),
});
exports.landServicesHeaderSchema = z.object({
    title: z.array(z.string().min(1)).min(4),
    description: z.string().min(10),
});
const floorSchema = z.object({
    title: z.string().min(3),
    floor: z.string().optional(),
    description: z.string().min(10),
    file: fileSchema.optional(),
});
exports.landFloorsSchema = z.array(floorSchema).min(1);
const birthdayPriceItemSchema = z.object({
    price: z.number().min(1),
    per: z.string().min(1),
});
const birthdayPackageSchema = z.object({
    title: z.string().min(3),
    oldPrice: z.number().min(1).optional(),
    price: z.object({
        weekdays: birthdayPriceItemSchema.optional(),
        weekends: birthdayPriceItemSchema.optional(),
    }).refine((value) => !!(value.weekdays || value.weekends), {
        message: "At least one of weekdays or weekends price is required.",
    }),
    description: z.array(z.string().min(1)).min(1),
    highlights: z.array(z.string().min(1)).min(1),
});
const birthdayPrinceSchema = z.object({
    hidden: z.boolean(),
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
}).superRefine((value, ctx) => {
    if (value.hidden)
        return;
    if (!value.title?.trim()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Title is required",
            path: ["title"],
        });
    }
    if (!value.description?.trim()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Description is required",
            path: ["description"],
        });
    }
});
exports.landBirthdayPrinceVisibilitySchema = z.object({
    hidden: z.boolean(),
});
exports.landBirthdaySchema = z.object({
    modalDescription: z.string().min(10),
    price: z.number().min(1),
    description: z.string().min(10),
    files: z.array(fileSchema).min(1).optional(),
    packages: z.object({
        list: z.array(birthdayPackageSchema).min(1),
        prince: birthdayPrinceSchema,
    }),
});
const membershipHoursSchema = z.object({
    icon: z.string().min(1),
    highlight: z.object({
        no: z.number().min(1),
        line: z.string().min(3),
    }),
});
const membershipCardSchema = z.object({
    icon: z.string().min(1),
    title: z.string().min(3),
    hours: z.object({
        perMonth: membershipHoursSchema,
        perWeek: membershipHoursSchema,
        perSession: membershipHoursSchema,
        totalTime: z.object({
            icon: z.string().min(1),
            line: z.string().min(3),
        }),
    }),
    oldPricePerMonth: z.number().min(1),
    pricePerMonth: z.number().min(1),
    highlights: z.array(z.string().min(1)).min(3),
    isPopular: z.boolean(),
});
exports.landMembershipSchema = z.object({
    price: z.number().min(1),
    description: z.string().min(10),
    files: z.array(fileSchema).min(1).optional(),
    packages: z.object({
        description: z.string().min(10),
        years: z.object({
            3: z.array(membershipCardSchema).min(1),
            6: z.array(membershipCardSchema).min(1),
        }),
    }),
});
const schoolNurseryBaseSchema = z.object({
    description: z.string().min(10),
    video: fileSchema.optional(),
    catelog: fileSchema.optional(),
});
exports.landSchoolNurserySchema = z.object({
    schoolTrips: schoolNurseryBaseSchema,
    nursery: schoolNurseryBaseSchema,
});
const walkinCardSchema = z.object({
    icon: z.string().min(1),
    title: z.string().min(3),
    description: z.string().min(10),
});
const walkinHighlightCardSchema = z.object({
    icon: z.string().min(1),
    title: z.string().min(3),
    highlights: z.array(z.string().min(1)).min(3),
});
const joinerFileSchema = z.object({
    tag: z.string().min(3),
    url: z.string().min(1),
    path: z.string().min(1),
    contentType: z.string().optional(),
    uploadedAt: z.string().optional(),
});
exports.landWalkinSchema = z.object({
    firstCards: z.array(walkinCardSchema).min(1),
    lastCards: z.array(walkinHighlightCardSchema).min(1),
    joinerFloor: z.object({
        description: z.array(z.string().min(1)).length(2),
        files: z.array(joinerFileSchema).min(1),
    }),
    geniusFloor: z.object({
        description: z.array(z.string().min(1)).length(2),
        files: z.array(joinerFileSchema).min(1),
    }),
});
