import "express-serve-static-core";

declare module "express-serve-static-core" {
    interface Request {
        adminId?: string;
        adminUserName?: string;
        lang?: "ar" | "en";
    }
}