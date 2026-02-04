import { Router } from "express";
import {
    getAboutController,
    patchAboutController,
    getAboutAllController,
    getAboutHeroController,
    patchAboutHeroController,
    getAboutSectionController,
    patchAboutSectionController,
    getAboutServiceController,
    patchAboutServiceController,
    getAboutPreValueController,
    patchAboutPreValueController,
    getAboutValueController,
    patchAboutValueController,
} from "../../controllers/about/about.controllers";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import { CachingMiddleware } from "../../middlewares/features.middlewares";
import {
    aboutValidationSchema,
    aboutMinSchema,
    heroSchema,
    preValueSchema,
    serviceSchema,
    valueSchema,
} from "../../../shared/validation/about/about.validation.schemas";

const aboutRoutes = Router();

aboutRoutes.use(languageMiddleware);

aboutRoutes.get("/all", CachingMiddleware, getAboutAllController);

aboutRoutes.get("/", getAboutController);
aboutRoutes.patch("/", adminAuth, zodValidator(aboutValidationSchema), patchAboutController);

aboutRoutes.get("/hero", getAboutHeroController);
aboutRoutes.patch("/hero", adminAuth, zodValidator(heroSchema), patchAboutHeroController);

aboutRoutes.get("/about", getAboutSectionController);
aboutRoutes.patch("/about", adminAuth, zodValidator(aboutMinSchema), patchAboutSectionController);

aboutRoutes.get("/service", getAboutServiceController);
aboutRoutes.patch("/service", adminAuth, zodValidator(serviceSchema), patchAboutServiceController);

aboutRoutes.get("/pre-value", getAboutPreValueController);
aboutRoutes.patch("/pre-value", adminAuth, zodValidator(preValueSchema), patchAboutPreValueController);

aboutRoutes.get("/value", getAboutValueController);
aboutRoutes.patch("/value", adminAuth, zodValidator(valueSchema), patchAboutValueController);

export default aboutRoutes;

