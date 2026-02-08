import { Router } from "express";
import {
    getLandHeroController,
    updateLandHeroController,
    getLandDiscoverFloorsController,
    updateLandDiscoverFloorsController,
    getLandFloorsController,
    getLandFloorsOptionsController,
    updateLandFloorsController,
    getLandServicesBirthdayController,
    updateLandServicesBirthdayController,
    getLandServicesMembershipController,
    updateLandServicesMembershipController,
    getLandServicesSchoolNurseryController,
    updateLandServicesSchoolNurseryController,
    getLandServicesWalkinController,
    updateLandServicesWalkinController,
} from "../../controllers/land/land.controllers";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import {
    landHeroSchema,
    landDiscoverFloorsSchema,
    landFloorsSchema,
    landBirthdaySchema,
    landMembershipSchema,
    landSchoolNurserySchema,
    landWalkinSchema,
} from "../../../shared/validation/land/land.validation.schemas";

const landRoutes = Router();

landRoutes.use(languageMiddleware);

landRoutes.get("/hero", getLandHeroController);
landRoutes.get("/discover-floors", getLandDiscoverFloorsController);
landRoutes.get("/floors", getLandFloorsController);
landRoutes.get("/floors/options", getLandFloorsOptionsController);
landRoutes.get("/services/birthday", getLandServicesBirthdayController);
landRoutes.get("/services/membership", getLandServicesMembershipController);
landRoutes.get("/services/school-nursery", getLandServicesSchoolNurseryController);
landRoutes.get("/services/walkin", getLandServicesWalkinController);

landRoutes.patch("/hero", adminAuth, zodValidator(landHeroSchema), updateLandHeroController);
landRoutes.patch("/discover-floors", adminAuth, zodValidator(landDiscoverFloorsSchema), updateLandDiscoverFloorsController);
landRoutes.patch("/floors", adminAuth, zodValidator(landFloorsSchema), updateLandFloorsController);
landRoutes.patch("/services/birthday", adminAuth, zodValidator(landBirthdaySchema), updateLandServicesBirthdayController);
landRoutes.patch("/services/membership", adminAuth, zodValidator(landMembershipSchema), updateLandServicesMembershipController);
landRoutes.patch("/services/school-nursery", adminAuth, zodValidator(landSchoolNurserySchema), updateLandServicesSchoolNurseryController);
landRoutes.patch("/services/walkin", adminAuth, zodValidator(landWalkinSchema), updateLandServicesWalkinController);

export default landRoutes;

