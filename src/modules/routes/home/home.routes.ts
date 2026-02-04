import { Router } from "express";
import { getHeroController, getAboutController, getHomeHorizontalController, getHomeTestimonialsController, getHomeLocationsController, updateHomeHeroController, updateHomeTestimonialsController, updateHomeLocationsController, updateHomeHorizontalController, updateHomeAboutController, getHomeAllController } from "../../controllers/home/home.controllers";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import { homeAboutSchema, homeHeroSchema, homeHorizontalSchema, homeLocationsSchema, homeTestimonialsSchema } from "../../../shared/validation/home/home.validation.schemas";
import { CachingMiddleware } from "../../middlewares/features.middlewares";

const homeRoutes = Router();

homeRoutes.use(languageMiddleware);

homeRoutes.get("/hero", getHeroController);
homeRoutes.get("/about", getAboutController);
homeRoutes.get("/horizontal", getHomeHorizontalController);
homeRoutes.get("/testimonials", getHomeTestimonialsController);
homeRoutes.get("/locations", getHomeLocationsController);

homeRoutes.get("/all", CachingMiddleware, languageMiddleware, getHomeAllController);

homeRoutes.patch("/hero", adminAuth, zodValidator(homeHeroSchema), updateHomeHeroController);
homeRoutes.patch("/about", adminAuth, zodValidator(homeAboutSchema), updateHomeAboutController);
homeRoutes.patch("/horizontal", adminAuth, zodValidator(homeHorizontalSchema), updateHomeHorizontalController);
homeRoutes.patch("/testimonials", adminAuth, zodValidator(homeTestimonialsSchema), updateHomeTestimonialsController);
homeRoutes.patch("/locations", adminAuth, zodValidator(homeLocationsSchema), updateHomeLocationsController);

export default homeRoutes;