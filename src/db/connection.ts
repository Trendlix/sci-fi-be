import mongoose from "mongoose";
import env from "../shared/config/env";

const registerConnectionListeners = (() => {
    let registered = false;
    return () => {
        if (registered) return;
        registered = true;

        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });
        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });
        mongoose.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        });
    };
})();

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    registerConnectionListeners();

    try {
        await mongoose.connect(env.mongoUri, {
            dbName: env.mongoDbName,
            autoIndex: env.nodeEnv !== "production",
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;