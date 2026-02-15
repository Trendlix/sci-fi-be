"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchBrandController = exports.getBrandController = void 0;
const error_services_1 = __importDefault(require("../../../services/error.services"));
const brand_services_1 = __importDefault(require("../../services/brand/brand.services"));
exports.getBrandController = (0, error_services_1.default)(async (_req, res) => {
    const response = await brand_services_1.default.getBrand();
    res.status(response.status).json(response);
});
exports.patchBrandController = (0, error_services_1.default)(async (req, res) => {
    const response = await brand_services_1.default.patchBrand(req.body);
    res.status(response.status).json(response);
});
