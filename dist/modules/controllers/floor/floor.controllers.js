"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFloorSliderController = exports.getFloorOptionsController = exports.getFloorSliderController = exports.updateFloorGroundsHiddenController = exports.updateFloorGroundsController = exports.getFloorGroundsController = exports.updateFloorServicesHiddenController = exports.updateFloorServicesController = exports.getFloorServicesController = exports.updateFloorFeaturesController = exports.getFloorFeaturesController = exports.updateFloorHeroController = exports.getFloorHeroController = exports.updateFloorHeaderController = exports.getFloorHeaderController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const error_services_1 = __importStar(require("../../../services/error.services"));
const floor_services_1 = __importDefault(require("../../services/floor/floor.services"));
const resolveFloorLookup = (floorId, floorIndex, floorTitle) => {
    if (floorId && mongoose_1.default.Types.ObjectId.isValid(floorId)) {
        return { floorId };
    }
    const normalizedIndex = typeof floorIndex === "string" && floorIndex.trim() !== ""
        ? Number.parseInt(floorIndex, 10)
        : Number.NaN;
    if (Number.isFinite(normalizedIndex)) {
        return { floorIndex: normalizedIndex, floorTitle: floorTitle?.trim() };
    }
    if (floorId && /^\d+$/.test(floorId)) {
        return { floorIndex: Number.parseInt(floorId, 10), floorTitle: floorTitle?.trim() };
    }
    throw new error_services_1.ServerError("Floor id is invalid", 400);
};
exports.getFloorHeaderController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.getFloorHeader(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.updateFloorHeaderController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.updateFloorHeader(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.getFloorHeroController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.getFloorHero(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.updateFloorHeroController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.updateFloorHero(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.getFloorFeaturesController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.getFloorFeatures(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.updateFloorFeaturesController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.updateFloorFeatures(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.getFloorServicesController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.getFloorServices(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.updateFloorServicesController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.updateFloorServices(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.updateFloorServicesHiddenController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.updateFloorServicesHidden(req.lang ?? "en", req.body.hidden, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.getFloorGroundsController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.getFloorGrounds(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.updateFloorGroundsController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.updateFloorGrounds(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.updateFloorGroundsHiddenController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.updateFloorGroundsHidden(req.lang ?? "en", req.body.hidden, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.getFloorSliderController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.getFloorSlider(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
exports.getFloorOptionsController = (0, error_services_1.default)(async (req, res) => {
    const response = await floor_services_1.default.getFloorOptions(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.updateFloorSliderController = (0, error_services_1.default)(async (req, res) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(req.query.floorId, req.query.floorIndex, req.query.floorTitle);
    const response = await floor_services_1.default.updateFloorSlider(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});
