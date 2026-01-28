import { Router } from "express";
import { adminController } from "../../controllers/admin/admin.controllers";
import { adminAccountValidationSchema } from "../../../shared/validation/admin/admin.validation.schemas";
import { zodValidator } from "../../../shared/utils/zod.util";

const adminRouter = Router();

adminRouter.post("/account", zodValidator(adminAccountValidationSchema), adminController);

export default adminRouter;