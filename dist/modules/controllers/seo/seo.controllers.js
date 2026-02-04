"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchSeoController = exports.getSeoController = void 0;
const error_services_1 = __importDefault(require("../../../services/error.services"));
const seo_services_1 = __importDefault(require("../../services/seo/seo.services"));
exports.getSeoController = (0, error_services_1.default)(async (req, res) => {
    const response = await seo_services_1.default.getSeo(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.patchSeoController = (0, error_services_1.default)(async (req, res) => {
    const response = await seo_services_1.default.patchSeo(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
