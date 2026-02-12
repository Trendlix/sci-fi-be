import { Router } from "express";
import {
    getFloorHeaderController,
    updateFloorHeaderController,
    getFloorHeroController,
    updateFloorHeroController,
    getFloorFeaturesController,
    updateFloorFeaturesController,
    getFloorServicesController,
    updateFloorServicesController,
    updateFloorServicesHiddenController,
    getFloorGroundsController,
    updateFloorGroundsController,
    updateFloorGroundsHiddenController,
    getFloorSliderController,
    getFloorOptionsController,
    updateFloorSliderController,
    getFloorSeoController,
    updateFloorSeoController,
    getFloorAllController,
} from "../../controllers/floor/floor.controllers";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import {
    floorHeaderSchema,
    floorHeroSchema,
    floorFeaturesSchema,
    floorServicesSchema,
    floorGroundsSchema,
    floorSliderSchema,
    floorHiddenSchema,
    floorSeoSchema,
} from "../../../shared/validation/floor/floor.validation.schemas";

const floorRoutes = Router();

floorRoutes.use(languageMiddleware);

floorRoutes.get("/header", getFloorHeaderController);
floorRoutes.get("/hero", getFloorHeroController);
floorRoutes.get("/features", getFloorFeaturesController);
floorRoutes.get("/services", getFloorServicesController);
floorRoutes.get("/grounds", getFloorGroundsController);
floorRoutes.get("/floors-slider", getFloorSliderController);
floorRoutes.get("/seo", getFloorSeoController);
floorRoutes.get("/options", getFloorOptionsController);
floorRoutes.get("/all", getFloorAllController);

floorRoutes.patch("/header", adminAuth, zodValidator(floorHeaderSchema), updateFloorHeaderController);
floorRoutes.patch("/hero", adminAuth, zodValidator(floorHeroSchema), updateFloorHeroController);
floorRoutes.patch("/features", adminAuth, zodValidator(floorFeaturesSchema), updateFloorFeaturesController);
floorRoutes.patch("/services", adminAuth, zodValidator(floorServicesSchema), updateFloorServicesController);
floorRoutes.patch("/services/hidden", adminAuth, zodValidator(floorHiddenSchema), updateFloorServicesHiddenController);
floorRoutes.patch("/grounds", adminAuth, zodValidator(floorGroundsSchema), updateFloorGroundsController);
floorRoutes.patch("/grounds/hidden", adminAuth, zodValidator(floorHiddenSchema), updateFloorGroundsHiddenController);
floorRoutes.patch("/floors-slider", adminAuth, zodValidator(floorSliderSchema), updateFloorSliderController);
floorRoutes.patch("/seo", adminAuth, zodValidator(floorSeoSchema), updateFloorSeoController);

export default floorRoutes;

