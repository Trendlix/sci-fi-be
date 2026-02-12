"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSitemapController = void 0;
const error_services_1 = __importDefault(require("../../../services/error.services"));
const land_model_1 = require("../../models/land/land.model");
const SUPPORTED_LOCALES = ["en", "ar"];
const STATIC_ROUTES = ["/", "/about", "/land", "/events", "/studio", "/contact"];
const escapeXml = (value) => value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
const resolveBaseUrl = (req) => {
    const envBaseUrl = process.env.SITE_BASE_URL;
    if (envBaseUrl) {
        return envBaseUrl.replace(/\/+$/, "");
    }
    const forwardedProto = (req.get("x-forwarded-proto") ?? "").split(",")[0].trim();
    const forwardedHost = (req.get("x-forwarded-host") ?? "").split(",")[0].trim();
    const protocol = forwardedProto || req.protocol;
    const host = forwardedHost || req.get("host") || "localhost";
    return `${protocol}://${host}`.replace(/\/+$/, "");
};
const toFloorSlug = (value) => {
    const trimmed = value?.trim();
    if (!trimmed)
        return "";
    return trimmed
        .toLowerCase()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9\u0600-\u06FF]+/gi, "-")
        .replace(/^-+|-+$/g, "");
};
const buildFloorParam = (title, index) => {
    const slug = toFloorSlug(title);
    const safeIndex = Number.isFinite(index) ? index : 0;
    return `${slug || "floor"}-${safeIndex}`;
};
const getLandFloorParamsByLocale = async () => {
    const land = await land_model_1.LandModel.findOne()
        .select("en.floors.title ar.floors.title")
        .lean();
    return SUPPORTED_LOCALES.reduce((acc, locale) => {
        const floors = land?.[locale]?.floors ?? [];
        const params = floors
            .map((floor, index) => buildFloorParam(floor.title ?? "", index))
            .filter(Boolean);
        acc[locale] = params;
        return acc;
    }, {});
};
const buildSitemapXml = (baseUrl, floorParamsByLocale) => {
    const urls = SUPPORTED_LOCALES.flatMap((locale) => {
        const staticUrls = STATIC_ROUTES.map((path) => {
            const normalizedPath = path === "/" ? `/${locale}` : `/${locale}${path}`;
            return `${baseUrl}${normalizedPath}`;
        });
        const floorParams = floorParamsByLocale[locale] ?? [];
        const floorUrls = floorParams.map((param) => `${baseUrl}/${locale}/land?floor=${param}`);
        return [...staticUrls, ...floorUrls];
    });
    const urlNodes = urls
        .map((url) => {
        const escapedUrl = escapeXml(url);
        return [
            "  <url>",
            `    <loc>${escapedUrl}</loc>`,
            "  </url>"
        ].join("\n");
    })
        .join("\n");
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        urlNodes,
        "</urlset>"
    ].join("\n");
};
exports.getSitemapController = (0, error_services_1.default)(async (req, res) => {
    const baseUrl = resolveBaseUrl(req);
    const floorParamsByLocale = await getLandFloorParamsByLocale();
    const sitemapXml = buildSitemapXml(baseUrl, floorParamsByLocale);
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(sitemapXml);
});
