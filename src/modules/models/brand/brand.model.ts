import mongoose from "mongoose";
import { IBrandDocument } from "./types/model.types";

const brandSchema = new mongoose.Schema({
    whatsAppMe: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model<IBrandDocument>("Brand", brandSchema);