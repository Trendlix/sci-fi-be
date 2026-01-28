import { Router } from "express";
import {
    getStudioHeroController,
    getStudioAboutController,
    getStudioPartnersController,
    getStudioWhyUsController,
    updateStudioHeroController,
    updateStudioAboutController,
    updateStudioPartnersController,
    updateStudioWhyUsController,
} from "../../controllers/studio/studio.controllers";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import {
    studioHeroSchema,
    studioAboutSchema,
    studioPartnersSchema,
    studioWhyUsSchema,
} from "../../../shared/validation/studio/studio.validation.schemas";

const studioRoutes = Router();

studioRoutes.use(languageMiddleware);

studioRoutes.get("/hero", getStudioHeroController);
studioRoutes.get("/about", getStudioAboutController);
studioRoutes.get("/partners", getStudioPartnersController);
studioRoutes.get("/why-us", getStudioWhyUsController);

studioRoutes.patch("/hero", adminAuth, zodValidator(studioHeroSchema), updateStudioHeroController);
studioRoutes.patch("/about", adminAuth, zodValidator(studioAboutSchema), updateStudioAboutController);
studioRoutes.patch("/partners", adminAuth, zodValidator(studioPartnersSchema), updateStudioPartnersController);
studioRoutes.patch("/why-us", adminAuth, zodValidator(studioWhyUsSchema), updateStudioWhyUsController);

export default studioRoutes;

