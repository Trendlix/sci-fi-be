import { Router } from "express";
import {
    getEventAboutController,
    getEventPartnersController,
    getEventFeaturedController,
    getEventHeroController,
    getEventHowController,
    getEventProgramController,
    getEventReadyController,
    getEventAllController,
    getEventUpcomingTypesController,
    getEventUpcomingController,
    updateEventAboutController,
    updateEventPartnersController,
    updateEventFeaturedController,
    updateEventHeroController,
    updateEventHowController,
    updateEventProgramController,
    updateEventReadyController,
    updateEventUpcomingController,
} from "../../controllers/events/events.controllers";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import {
    eventAboutSchema,
    eventPartnersSchema,
    eventFeaturedSchema,
    eventHeroSchema,
    eventHowSchema,
    eventProgramSchema,
    eventReadySchema,
    eventUpcomingSchema,
} from "../../../shared/validation/events/events.validation.schemas";

const eventRoutes = Router();

eventRoutes.use(languageMiddleware);

eventRoutes.get("/hero", getEventHeroController);
eventRoutes.patch("/hero", adminAuth, zodValidator(eventHeroSchema), updateEventHeroController);

eventRoutes.get("/all", getEventAllController);

eventRoutes.get("/about", getEventAboutController);
eventRoutes.patch("/about", adminAuth, zodValidator(eventAboutSchema), updateEventAboutController);

eventRoutes.get("/partners", getEventPartnersController);
eventRoutes.patch("/partners", adminAuth, zodValidator(eventPartnersSchema), updateEventPartnersController);

eventRoutes.get("/program", getEventProgramController);
eventRoutes.patch("/program", adminAuth, zodValidator(eventProgramSchema), updateEventProgramController);

eventRoutes.get("/how", getEventHowController);
eventRoutes.patch("/how", adminAuth, zodValidator(eventHowSchema), updateEventHowController);

eventRoutes.get("/ready", getEventReadyController);
eventRoutes.patch("/ready", adminAuth, zodValidator(eventReadySchema), updateEventReadyController);

eventRoutes.get("/featured", getEventFeaturedController);
eventRoutes.patch("/featured", adminAuth, zodValidator(eventFeaturedSchema), updateEventFeaturedController);

eventRoutes.get("/upcoming", getEventUpcomingController);
eventRoutes.get("/upcoming/types", getEventUpcomingTypesController);
eventRoutes.patch("/upcoming", adminAuth, zodValidator(eventUpcomingSchema), updateEventUpcomingController);

export default eventRoutes;

