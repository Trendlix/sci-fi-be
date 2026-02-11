"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLandAllController = exports.updateLandServicesWalkinController = exports.getLandServicesWalkinController = exports.updateLandServicesSchoolNurseryController = exports.getLandServicesSchoolNurseryController = exports.updateLandServicesMembershipController = exports.getLandServicesMembershipController = exports.updateLandServicesBirthdayPrinceVisibilityController = exports.updateLandServicesBirthdayController = exports.getLandServicesBirthdayController = exports.updateLandServicesHeaderController = exports.getLandServicesHeaderController = exports.updateLandTestimonialsTitleController = exports.getLandTestimonialsTitleController = exports.updateLandFloorsController = exports.getLandFloorsOptionsController = exports.getLandFloorsController = exports.updateLandDiscoverFloorsController = exports.getLandDiscoverFloorsController = exports.updateLandHeroController = exports.getLandHeroController = void 0;
const error_services_1 = __importDefault(require("../../../services/error.services"));
const land_services_1 = __importDefault(require("../../services/land/land.services"));
exports.getLandHeroController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandHero(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateLandHeroController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.updateLandHero(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getLandDiscoverFloorsController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandDiscoverFloors(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateLandDiscoverFloorsController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.updateLandDiscoverFloors(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getLandFloorsController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandFloors(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.getLandFloorsOptionsController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandFloorsOptions(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateLandFloorsController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.updateLandFloors(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getLandTestimonialsTitleController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandTestimonialsTitle(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateLandTestimonialsTitleController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.updateLandTestimonialsTitle(req.lang ?? "en", req.body.title);
    res.status(response.status).json(response);
});
exports.getLandServicesHeaderController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandServicesHeader(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateLandServicesHeaderController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.updateLandServicesHeader(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getLandServicesBirthdayController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandServicesBirthday(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateLandServicesBirthdayController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.updateLandServicesBirthday(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.updateLandServicesBirthdayPrinceVisibilityController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.updateLandServicesBirthdayPrinceVisibility(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getLandServicesMembershipController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandServicesMembership(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateLandServicesMembershipController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.updateLandServicesMembership(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getLandServicesSchoolNurseryController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandServicesSchoolNursery(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateLandServicesSchoolNurseryController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.updateLandServicesSchoolNursery(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getLandServicesWalkinController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandServicesWalkin(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateLandServicesWalkinController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.updateLandServicesWalkin(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getLandAllController = (0, error_services_1.default)(async (req, res) => {
    const response = await land_services_1.default.getLandAll(req.lang ?? "en");
    res.status(response.status).json(response);
});
