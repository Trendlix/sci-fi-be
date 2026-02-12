"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sitemap_controllers_1 = require("../../controllers/sitemap/sitemap.controllers");
const sitemapRoutes = (0, express_1.Router)();
sitemapRoutes.get("/", sitemap_controllers_1.getSitemapController);
exports.default = sitemapRoutes;
