import { Router } from "express";
import { getSitemapController } from "../../controllers/sitemap/sitemap.controllers";

const sitemapRoutes = Router();

sitemapRoutes.get("/", getSitemapController);

export default sitemapRoutes;

