import { Router } from "express";
import { getAboutController, patchAboutController } from "../../controllers/about/about.controllers";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import { aboutValidationSchema } from "../../../shared/validation/about/about.validation.schemas";

const aboutRoutes = Router();

aboutRoutes.use(languageMiddleware);

aboutRoutes.get("/", getAboutController);
aboutRoutes.patch("/", adminAuth, zodValidator(aboutValidationSchema), patchAboutController);

export default aboutRoutes;

