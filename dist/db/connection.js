"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("../shared/config/env"));
const registerConnectionListeners = (() => {
    let registered = false;
    return () => {
        if (registered)
            return;
        registered = true;
        mongoose_1.default.connection.on("connected", () => {
            console.log("MongoDB connected");
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });
        mongoose_1.default.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        });
    };
})();
const connectDB = async () => {
    if (mongoose_1.default.connection.readyState === 1) {
        return;
    }
    registerConnectionListeners();
    try {
        await mongoose_1.default.connect(env_1.default.mongoUri, {
            dbName: env_1.default.mongoDbName,
            autoIndex: env_1.default.nodeEnv !== "production",
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });
    }
    catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
