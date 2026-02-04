import { Router } from "express";
import { getSeoController, patchSeoController } from "../../controllers/seo/seo.controllers";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import { seoValidationSchema } from "../../../shared/validation/seo/seo.validation.schemas";

const seoRoutes = Router();

seoRoutes.use(languageMiddleware);

seoRoutes.get("/", getSeoController);
seoRoutes.patch("/", adminAuth, zodValidator(seoValidationSchema), patchSeoController);

export default seoRoutes;

