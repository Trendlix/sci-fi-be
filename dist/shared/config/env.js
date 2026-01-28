"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requireEnv = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
if (Number.isNaN(port)) {
    throw new Error("PORT must be a valid number");
}
const env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port,
    mongoUri: requireEnv("MONGO_URI"),
    mongoDbName: process.env.MONGO_DB_NAME,
};
exports.default = env;
