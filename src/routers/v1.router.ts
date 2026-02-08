import { Router } from "express";
import adminRouter from "../modules/routes/admin/admin.routes";
import homeRoutes from "../modules/routes/home/home.routes";
import contactRoutes from "../modules/routes/contact/contact.routes";
import aboutRoutes from "../modules/routes/about/about.routes";
import studioRoutes from "../modules/routes/studio/studio.routes";
import landRoutes from "../modules/routes/land/land.routes";
import floorRoutes from "../modules/routes/floor/floor.routes";
import eventRoutes from "../modules/routes/events/events.routes";
import seoRoutes from "../modules/routes/seo/seo.routes";

const v1Router = Router();

v1Router.use("/admin", adminRouter);
v1Router.use("/home", homeRoutes);
v1Router.use("/contact", contactRoutes);
v1Router.use("/about", aboutRoutes);
v1Router.use("/studio", studioRoutes);
v1Router.use("/land", landRoutes);
v1Router.use("/floor", floorRoutes);
v1Router.use("/events", eventRoutes);
v1Router.use("/seo", seoRoutes);

export default v1Router;