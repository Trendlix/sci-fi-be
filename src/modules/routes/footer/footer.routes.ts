import { Router } from "express";
import { getFooterController, patchFooterController } from "../../controllers/footer/footer.controllers";
import { adminAuth } from "../../../shared/middlewares/admin-auth.middleware";
import { languageMiddleware } from "../../../shared/middlewares/language.middleware";
import { zodValidator } from "../../../shared/utils/zod.util";
import { footerValidationSchema } from "../../../shared/validation/footer/footer.validation.schemas";

const footerRoutes = Router();

footerRoutes.use(languageMiddleware);

footerRoutes.get("/", getFooterController);
footerRoutes.patch("/", adminAuth, zodValidator(footerValidationSchema), patchFooterController);

export default footerRoutes;

