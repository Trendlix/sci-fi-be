import mongoose from "mongoose";
import { Document } from "mongoose";
import { IAdmin } from "./types/model.types";

const AdminSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    }
}, { timestamps: true });

export type IAdminModel = IAdmin & Document;
export const AdminModel = mongoose.model<IAdminModel>('Admin', AdminSchema);