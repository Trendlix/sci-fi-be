"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seo_model_1 = require("../../models/seo/seo.model");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class SeoServices {
    constructor(seoModel) {
        this.seoModel = seoModel;
        this.seoModel = seoModel;
    }
    async getSeo(lang) {
        const seo = await this.seoModel.findOne().select(lang).lean();
        const seoSection = seo?.[lang];
        if (!seoSection) {
            throw new error_services_1.ServerError("Seo not found", 404);
        }
        return (0, format_services_1.default)(200, "Seo fetched successfully", seoSection);
    }
    async patchSeo(lang, payload) {
        const existing = await this.seoModel.findOne().select(lang).lean();
        const current = existing?.[lang] ?? {};
        const mergedPayload = { ...current, ...payload };
        const updatedSeo = await this.seoModel
            .findOneAndUpdate({}, { $set: { [lang]: mergedPayload } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(lang)
            .lean();
        const updatedSeoSection = updatedSeo?.[lang];
        if (!updatedSeoSection) {
            throw new error_services_1.ServerError("Seo not found", 404);
        }
        return (0, format_services_1.default)(200, "Seo updated successfully", updatedSeoSection);
    }
}
exports.default = new SeoServices(seo_model_1.SeoModel);
