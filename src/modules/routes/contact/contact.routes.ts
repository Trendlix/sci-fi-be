import { Router } from "express";
import { getContactController, patchContactController } from "../../controllers/contact/contact.controllers";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import { contactValidationSchema } from "../../../shared/validation/contact/contact.validation.schemas";

const contactRoutes = Router();

contactRoutes.use(languageMiddleware);

contactRoutes.get("/", getContactController);
contactRoutes.patch("/", adminAuth, zodValidator(contactValidationSchema), patchContactController);

export default contactRoutes;

