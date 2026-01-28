"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const error_services_1 = __importStar(require("../../services/error.services"));
const jwt_service_1 = require("../services/jwt.service");
const admin_model_1 = require("../../modules/models/admin/admin.model");
const extractBearerToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new error_services_1.ServerError("Authorization token is required", 401);
    }
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        throw new error_services_1.ServerError("Authorization token is malformed", 401);
    }
    return token;
};
exports.adminAuth = (0, error_services_1.default)(async (req, res, next) => {
    const token = extractBearerToken(req);
    let payload;
    try {
        payload = jwt_service_1.jwtService.verifyToken(token);
    }
    catch {
        throw new error_services_1.ServerError("Invalid or expired token", 401);
    }
    if (!payload?.user_name) {
        throw new error_services_1.ServerError("Invalid token payload", 401);
    }
    const admin = await admin_model_1.AdminModel.findOne({ user_name: payload.user_name })
        .select("_id user_name status")
        .lean();
    if (!admin) {
        throw new error_services_1.ServerError("Admin not found", 401);
    }
    if (admin.status !== "active") {
        throw new error_services_1.ServerError("Account is inactive. Please contact support.", 403);
    }
    req.adminId = admin._id.toString();
    req.adminUserName = admin.user_name;
    next();
});
