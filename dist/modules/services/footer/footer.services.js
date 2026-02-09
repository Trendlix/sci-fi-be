"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const footer_model_1 = require("../../models/footer/footer.model");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class FooterServices {
    constructor(footerModel) {
        this.footerModel = footerModel;
        this.footerModel = footerModel;
    }
    async getFooter(lang) {
        const footer = await this.footerModel.findOne().select(lang).lean();
        const footerBase = footer?.[lang];
        if (!footerBase) {
            throw new error_services_1.ServerError("Footer not found", 404);
        }
        return (0, format_services_1.default)(200, "Footer fetched successfully", footerBase);
    }
    async patchFooter(lang, payload) {
        const existing = await this.footerModel.findOne().select(lang).lean();
        const current = existing?.[lang] ?? {};
        const mergedPayload = {
            ...current,
            ...payload,
            address: payload.address
                ? { ...current.address, ...payload.address }
                : current.address,
        };
        const updatedFooter = await this.footerModel
            .findOneAndUpdate({}, { $set: { [lang]: mergedPayload } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(lang)
            .lean();
        const updatedFooterBase = updatedFooter?.[lang];
        if (!updatedFooterBase) {
            throw new error_services_1.ServerError("Footer not found", 404);
        }
        return (0, format_services_1.default)(200, "Footer updated successfully", updatedFooterBase);
    }
}
exports.default = new FooterServices(footer_model_1.FooterModel);
