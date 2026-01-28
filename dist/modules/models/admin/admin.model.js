"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
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
exports.AdminModel = mongoose_1.default.model('Admin', AdminSchema);
