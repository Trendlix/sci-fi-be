import { type Model } from "mongoose";
import { AdminModel, IAdminModel } from "../../models/admin/admin.model";
import { IAdmin } from "../../models/admin/types/model.types";
import { bcryptService, BcryptService } from "../../../shared/services/bcrypt.service";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";
import { jwtService, JwtService } from "../../../shared/services/jwt.service";

class AdminServices {
    constructor(
        private readonly adminModel: Model<IAdminModel>,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService
    ) {
        this.adminModel = adminModel;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
    }

    private async createNewAccount(data: IAdmin) {
        const { user_name, password } = data;
        const hashedPassword = await this.bcryptService.hashPassword(password);
        const admin = this.adminModel.create({ user_name, password: hashedPassword });
        if (!admin) {
            throw new ServerError("Failed to create new account", 400);
        }
        return responseFormatter(201, "New account created successfully, ask someone to activate it", {
            user_name,
            status: "inactive"
        });
    }

    private async loginAdminAccount(admin: IAdminModel, password: string) {
        if (admin.status !== "active") {
            throw new ServerError("Account is inactive. Please contact support.", 403);
        }
        const isPasswordCorrect = await this.bcryptService.comparePassword(password, admin.password);
        if (!isPasswordCorrect) {
            throw new ServerError("Wrong credentials", 401);
        }
        const token = this.jwtService.generateToken({ user_name: admin.user_name });
        return responseFormatter(200, "Login successful", {
            user_name: admin.user_name,
            status: admin.status,
            token
        });
    }

    async adminAccount(data: IAdmin) {
        const { user_name, password } = data;
        const admin = await this.adminModel.findOne({ user_name });
        if (!admin) {
            return this.createNewAccount(data);
        }
        return this.loginAdminAccount(admin, password);
    }
}

export default new AdminServices(AdminModel, bcryptService, jwtService);