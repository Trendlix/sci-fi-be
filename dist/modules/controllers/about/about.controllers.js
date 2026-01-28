"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchAboutController = exports.getAboutController = void 0;
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
