"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHomeLocationsController = exports.updateHomeTestimonialsController = exports.updateHomeHorizontalController = exports.updateHomeAboutController = exports.updateHomeHeroController = exports.getHomeLocationsController = exports.getHomeTestimonialsController = exports.getHomeHorizontalController = exports.getAboutController = exports.getHeroController = void 0;
const error_services_1 = __importDefault(require("../../../services/error.services"));
const home_services_1 = __importDefault(require("../../services/home/home.services"));
exports.getHeroController = (0, error_services_1.default)(async (req, res) => {
    const response = await home_services_1.default.getHomeHero(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.getAboutController = (0, error_services_1.default)(async (req, res) => {
    const response = await home_services_1.default.getHomeAbout(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.getHomeHorizontalController = (0, error_services_1.default)(async (req, res) => {
    const response = await home_services_1.default.getHomeHorizontal(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.getHomeTestimonialsController = (0, error_services_1.default)(async (req, res) => {
    const response = await home_services_1.default.getHomeTestimonials(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.getHomeLocationsController = (0, error_services_1.default)(async (req, res) => {
    const response = await home_services_1.default.getHomeLocations(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateHomeHeroController = (0, error_services_1.default)(async (req, res) => {
    const response = await home_services_1.default.updateHomeHero(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.updateHomeAboutController = (0, error_services_1.default)(async (req, res) => {
    const response = await home_services_1.default.updateHomeAbout(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.updateHomeHorizontalController = (0, error_services_1.default)(async (req, res) => {
    const response = await home_services_1.default.updateHomeHorizontal(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.updateHomeTestimonialsController = (0, error_services_1.default)(async (req, res) => {
    const response = await home_services_1.default.updateHomeTestimonials(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.updateHomeLocationsController = (0, error_services_1.default)(async (req, res) => {
    const response = await home_services_1.default.updateHomeLocations(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
