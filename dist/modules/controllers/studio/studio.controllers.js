"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudioWhyUsController = exports.updateStudioPartnersController = exports.updateStudioAboutController = exports.updateStudioHeroController = exports.getStudioWhyUsController = exports.getStudioPartnersController = exports.getStudioAboutController = exports.getStudioHeroController = void 0;
const error_services_1 = __importDefault(require("../../../services/error.services"));
const studio_services_1 = __importDefault(require("../../services/studio/studio.services"));
exports.getStudioHeroController = (0, error_services_1.default)(async (req, res) => {
    const response = await studio_services_1.default.getStudioHero(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.getStudioAboutController = (0, error_services_1.default)(async (req, res) => {
    const response = await studio_services_1.default.getStudioAbout(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.getStudioPartnersController = (0, error_services_1.default)(async (req, res) => {
    const response = await studio_services_1.default.getStudioPartners(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.getStudioWhyUsController = (0, error_services_1.default)(async (req, res) => {
    const response = await studio_services_1.default.getStudioWhyUs(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateStudioHeroController = (0, error_services_1.default)(async (req, res) => {
    const response = await studio_services_1.default.updateStudioHero(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.updateStudioAboutController = (0, error_services_1.default)(async (req, res) => {
    const response = await studio_services_1.default.updateStudioAbout(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.updateStudioPartnersController = (0, error_services_1.default)(async (req, res) => {
    const response = await studio_services_1.default.updateStudioPartners(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.updateStudioWhyUsController = (0, error_services_1.default)(async (req, res) => {
    const response = await studio_services_1.default.updateStudioWhyUs(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
