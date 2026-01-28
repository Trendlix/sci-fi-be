import type { Request, Response } from "express";
import CatchAsyncError, { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";
import adminServices from "../../services/admin/admin.services";

export const adminController = CatchAsyncError(async (req: Request, res: Response) => {
    const { user_name, password } = req.body;
    if (!user_name || !password) {
        throw new ServerError("user_name and password are required", 400);
    }
    const response = await adminServices.adminAccount({ user_name, password });
    res.status(response.status).json(responseFormatter(response.status, response.message, response.data));
})