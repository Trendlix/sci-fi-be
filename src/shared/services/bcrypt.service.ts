import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

/**
 * Utility to safely get environment variables
 */
function requireEnv(name: string): string {
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
export class BcryptService {
    constructor(private readonly rounds: number = saltRounds) { }

    /**
     * Hashes a plain text password
     * @param password - The plain password
     * @returns The hashed password
     */
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.rounds);
    }

    /**
     * Compares a plain password with a hash
     * @param password - Plain text password
     * @param hash - Hashed password
     * @returns True if match, false otherwise
     */
    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}

// Export singleton instance
export const bcryptService = new BcryptService(saltRounds);
