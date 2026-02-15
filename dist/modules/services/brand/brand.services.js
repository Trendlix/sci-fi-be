"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brand_model_1 = __importDefault(require("../../models/brand/brand.model"));
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class BrandServices {
    constructor(brandModel) {
        this.brandModel = brandModel;
        this.brandModel = brandModel;
    }
    async getBrand() {
        const brand = await this.brandModel.findOne().lean();
        if (!brand) {
            throw new error_services_1.ServerError("Brand not found", 404);
        }
        return (0, format_services_1.default)(200, "Brand fetched successfully", brand);
    }
    async patchBrand(payload) {
        const updatedBrand = await this.brandModel
            .findOneAndUpdate({}, { $set: payload }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .lean();
        if (!updatedBrand) {
            throw new error_services_1.ServerError("Brand not found", 404);
        }
        return (0, format_services_1.default)(200, "Brand updated successfully", updatedBrand);
    }
}
exports.default = new BrandServices(brand_model_1.default);
