import jwt, { type Secret, type SignOptions, type JwtPayload } from "jsonwebtoken";
import type { StringValue } from "ms";
import dotenv from "dotenv";

dotenv.config();

// Utility to safely get environment variables
function requireEnv(name: string, fallback?: string): string {
    const value = process.env[name] ?? fallback;
    if (!value) {
        throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
}

const isProduction = process.env.NODE_ENV === "production";
const jwtSecretKey: Secret = requireEnv("JWT_SECRET_KEY", isProduction ? undefined : "dev-secret");
const jwtExpiresIn = (process.env.JWT_EXPIRES_IN ?? "1d") as StringValue;

// JWT Service
export class JwtService {
    constructor(
        private readonly secretKey: Secret,
        private readonly expiresIn: SignOptions["expiresIn"] = "1d" as StringValue
    ) { }

    /**
     * Generates a JWT token with the given payload
     * @param payload - The data to sign
     * @returns JWT token string
     */
    generateToken<T extends object>(payload: T): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
    }

    /**
     * Verifies a JWT token
     * @param token - The token string to verify
     * @returns The decoded payload
     */
    verifyToken<T = JwtPayload>(token: string): T {
        try {
            return jwt.verify(token, this.secretKey) as T;
        } catch (error) {
            throw new Error("Invalid or expired token");
        }
    }
}

// Export singleton instance
export const jwtService = new JwtService(jwtSecretKey, jwtExpiresIn);
