import { Router } from "express";
import { getHeroController, getAboutController, getHomeHorizontalController, getHomeTestimonialsController, getHomeLocationsController, updateHomeHeroController, updateHomeTestimonialsController, updateHomeLocationsController, updateHomeHorizontalController, updateHomeAboutController } from "../../controllers/home/home.controllers";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";

const homeRoutes = Router();

homeRoutes.use(languageMiddleware);

homeRoutes.get("/hero", getHeroController);
homeRoutes.get("/about", getAboutController);
homeRoutes.get("/horizontal", getHomeHorizontalController);
homeRoutes.get("/testimonials", getHomeTestimonialsController);
homeRoutes.get("/locations", getHomeLocationsController);

homeRoutes.patch("/hero", adminAuth, updateHomeHeroController);
homeRoutes.patch("/about", adminAuth, updateHomeAboutController);
homeRoutes.patch("/horizontal", adminAuth, updateHomeHorizontalController);
homeRoutes.patch("/testimonials", adminAuth, updateHomeTestimonialsController);
homeRoutes.patch("/locations", adminAuth, updateHomeLocationsController);

export default homeRoutes;