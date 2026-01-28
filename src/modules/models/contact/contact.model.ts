import mongoose, { Document } from "mongoose";
import { IContact, IGetInTouch } from "./types/model.types";

const HeroSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10
    }
}, { timestamps: true, _id: false });

const GetInTouchSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["phone", "email", "address", "hours"],
        required: true
    },
    lines: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length >= 1 && v.length <= 2,
            message: "Lines must have between 1 and 2 items."
        }
    }
}, { timestamps: true, _id: false })

const ContactBaseSchema = new mongoose.Schema({
    hero: {
        type: HeroSchema,
        required: true
    },
    getInTouch: {
        description: {
            type: String,
            required: true,
            minlength: 10
        },
        cards: {
            type: [GetInTouchSchema],
            default: [],
            validate: {
                validator: (v: IGetInTouch[]) => v.length >= 1 && v.length <= 4,
                message: "Get in touch must have between 1 and 4 items."
            }
        }
    }
}, { timestamps: true, _id: false });

const ContactSchema = new mongoose.Schema(
    {
        ar: {
            type: ContactBaseSchema,
            required: false,
        },
        en: {
            type: ContactBaseSchema,
            required: false,
        },
    },
    { timestamps: true }
);

ContactSchema.pre("validate", function () {
    if (!this.ar && !this.en) {
        this.invalidate("ar", "Either 'ar' or 'en' must be provided");
        this.invalidate("en", "Either 'ar' or 'en' must be provided");
    }
});

export type IContactModel = IContact & Document;
export const ContactModel = mongoose.model<IContactModel>('Contact', ContactSchema);