import { Router } from "express";
import { getBrandController, patchBrandController } from "../../controllers/brand/brand.controllers";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import { brandValidationSchema } from "../../../shared/validation/brand/brand.validation.schemas";

const brandRoutes = Router();

brandRoutes.get("/", getBrandController);
brandRoutes.patch("/", adminAuth, zodValidator(brandValidationSchema), patchBrandController);

export default brandRoutes;

