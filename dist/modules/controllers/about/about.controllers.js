"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchAboutValueController = exports.getAboutValueController = exports.patchAboutPreValueController = exports.getAboutPreValueController = exports.patchAboutServiceController = exports.getAboutServiceController = exports.patchAboutSectionController = exports.getAboutSectionController = exports.patchAboutHeroController = exports.getAboutHeroController = exports.getAboutAllController = exports.patchAboutController = exports.getAboutController = void 0;
const error_services_1 = __importDefault(require("../../../services/error.services"));
const about_services_1 = __importDefault(require("../../services/about/about.services"));
exports.getAboutController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.getAbout(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.patchAboutController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.patchAbout(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getAboutAllController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.getAboutAll(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.getAboutHeroController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.getHero(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.patchAboutHeroController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.patchHero(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getAboutSectionController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.getAboutSection(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.patchAboutSectionController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.patchAboutSection(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getAboutServiceController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.getService(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.patchAboutServiceController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.patchService(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getAboutPreValueController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.getPreValue(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.patchAboutPreValueController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.patchPreValue(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getAboutValueController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.getValue(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.patchAboutValueController = (0, error_services_1.default)(async (req, res) => {
    const response = await about_services_1.default.patchValue(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
