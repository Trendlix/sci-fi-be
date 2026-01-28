import * as z from "zod";

export const adminAccountValidationSchema = z.object({
    user_name: z.string().min(3).max(20),
    password: z.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
}).required({
    user_name: true,
    password: true,
});