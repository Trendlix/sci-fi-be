"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptService = exports.BcryptService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Utility to safely get environment variables
 */
function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
}
// Default salt rounds if not provided in env
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);
/**
 * Bcrypt Service
 */
class BcryptService {
    constructor(rounds = saltRounds) {
        this.rounds = rounds;
    }
    /**
     * Hashes a plain text password
     * @param password - The plain password
     * @returns The hashed password
     */
    async hashPassword(password) {
        return bcrypt_1.default.hash(password, this.rounds);
    }
    /**
     * Compares a plain password with a hash
     * @param password - Plain text password
     * @param hash - Hashed password
     * @returns True if match, false otherwise
     */
    async comparePassword(password, hash) {
        return bcrypt_1.default.compare(password, hash);
    }
}
exports.BcryptService = BcryptService;
// Export singleton instance
exports.bcryptService = new BcryptService(saltRounds);
