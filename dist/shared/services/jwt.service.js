"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Utility to safely get environment variables
function requireEnv(name, fallback) {
    const value = process.env[name] ?? fallback;
    if (!value) {
        throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
}
const isProduction = process.env.NODE_ENV === "production";
const jwtSecretKey = requireEnv("JWT_SECRET_KEY", isProduction ? undefined : "dev-secret");
const jwtExpiresIn = (process.env.JWT_EXPIRES_IN ?? "1d");
// JWT Service
class JwtService {
    constructor(secretKey, expiresIn = "1d") {
        this.secretKey = secretKey;
        this.expiresIn = expiresIn;
    }
    /**
     * Generates a JWT token with the given payload
     * @param payload - The data to sign
     * @returns JWT token string
     */
    generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
    }
    /**
     * Verifies a JWT token
     * @param token - The token string to verify
     * @returns The decoded payload
     */
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (error) {
            throw new Error("Invalid or expired token");
        }
    }
}
exports.JwtService = JwtService;
// Export singleton instance
exports.jwtService = new JwtService(jwtSecretKey, jwtExpiresIn);
