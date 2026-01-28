"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_model_1 = require("../../models/admin/admin.model");
const bcrypt_service_1 = require("../../../shared/services/bcrypt.service");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
const jwt_service_1 = require("../../../shared/services/jwt.service");
class AdminServices {
    constructor(adminModel, bcryptService, jwtService) {
        this.adminModel = adminModel;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
        this.adminModel = adminModel;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
    }
    async createNewAccount(data) {
        const { user_name, password } = data;
        const hashedPassword = await this.bcryptService.hashPassword(password);
        const admin = this.adminModel.create({ user_name, password: hashedPassword });
        if (!admin) {
            throw new error_services_1.ServerError("Failed to create new account", 400);
        }
        return (0, format_services_1.default)(201, "New account created successfully, ask someone to activate it", {
            user_name,
            status: "inactive"
        });
    }
    async loginAdminAccount(admin, password) {
        if (admin.status !== "active") {
            throw new error_services_1.ServerError("Account is inactive. Please contact support.", 403);
        }
        const isPasswordCorrect = await this.bcryptService.comparePassword(password, admin.password);
        if (!isPasswordCorrect) {
            throw new error_services_1.ServerError("Wrong credentials", 401);
        }
        const token = this.jwtService.generateToken({ user_name: admin.user_name });
        return (0, format_services_1.default)(200, "Login successful", {
            user_name: admin.user_name,
            status: admin.status,
            token
        });
    }
    async adminAccount(data) {
        const { user_name, password } = data;
        const admin = await this.adminModel.findOne({ user_name });
        if (!admin) {
            return this.createNewAccount(data);
        }
        return this.loginAdminAccount(admin, password);
    }
}
exports.default = new AdminServices(admin_model_1.AdminModel, bcrypt_service_1.bcryptService, jwt_service_1.jwtService);
