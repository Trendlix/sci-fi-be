import type { Request, Response, NextFunction } from "express";
import CatchAsyncError, { ServerError } from "../../services/error.services";
import { jwtService } from "../services/jwt.service";
import { AdminModel } from "../../modules/models/admin/admin.model";

type AdminTokenPayload = {
    user_name?: string;
};

const extractBearerToken = (req: Request): string => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new ServerError("Authorization token is required", 401);
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        throw new ServerError("Authorization token is malformed", 401);
    }

    return token;
};

export const adminAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const token = extractBearerToken(req);

    let payload: AdminTokenPayload;
    try {
        payload = jwtService.verifyToken<AdminTokenPayload>(token);
    } catch {
        throw new ServerError("Invalid or expired token", 401);
    }

    if (!payload?.user_name) {
        throw new ServerError("Invalid token payload", 401);
    }

    const admin = await AdminModel.findOne({ user_name: payload.user_name })
        .select("_id user_name status")
        .lean();

    if (!admin) {
        throw new ServerError("Admin not found", 401);
    }

    if (admin.status !== "active") {
        throw new ServerError("Account is inactive. Please contact support.", 403);
    }

    req.adminId = admin._id.toString();
    req.adminUserName = admin.user_name;

    next();
});

