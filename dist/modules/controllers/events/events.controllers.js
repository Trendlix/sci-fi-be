"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventAllController = exports.updateEventUpcomingController = exports.getEventUpcomingTypesController = exports.getEventUpcomingController = exports.updateEventFeaturedController = exports.getEventFeaturedController = exports.updateEventReadyController = exports.getEventReadyController = exports.updateEventHowController = exports.getEventHowController = exports.updateEventNewsLetterController = exports.getEventNewsLetterController = exports.updateEventProgramController = exports.getEventProgramController = exports.updateEventPartnersController = exports.getEventPartnersController = exports.updateEventAboutController = exports.getEventAboutController = exports.updateEventHeroController = exports.getEventHeroController = void 0;
const error_services_1 = __importDefault(require("../../../services/error.services"));
const events_services_1 = __importDefault(require("../../services/events/events.services"));
exports.getEventHeroController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getHero(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateEventHeroController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.patchHero(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getEventAboutController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getAbout(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateEventAboutController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.patchAbout(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getEventPartnersController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getPartners(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateEventPartnersController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.patchPartners(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getEventProgramController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getProgram(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateEventProgramController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.patchProgram(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getEventNewsLetterController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getNewsLetter(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateEventNewsLetterController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.patchNewsLetter(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getEventHowController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getHow(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateEventHowController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.patchHow(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getEventReadyController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getReady(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateEventReadyController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.patchReady(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getEventFeaturedController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getFeatured(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateEventFeaturedController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.patchFeatured(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getEventUpcomingController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getUpcoming(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.getEventUpcomingTypesController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getUpcomingTypes(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateEventUpcomingController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.patchUpcoming(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
exports.getEventAllController = (0, error_services_1.default)(async (req, res) => {
    const response = await events_services_1.default.getEventAll(req.lang ?? "en");
    res.status(response.status).json(response);
});
