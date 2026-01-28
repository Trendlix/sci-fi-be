import dotenv from "dotenv";

dotenv.config();

const requireEnv = (key: string): string => {
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

export default env;

