"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const about_model_1 = require("../../models/about/about.model");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class AboutServices {
    constructor(aboutModel) {
        this.aboutModel = aboutModel;
        this.aboutModel = aboutModel;
    }
    async getAbout(lang) {
        const about = await this.aboutModel.findOne().select(lang).lean();
        const aboutBase = about?.[lang];
        if (!aboutBase) {
            throw new error_services_1.ServerError("About not found", 404);
        }
        return (0, format_services_1.default)(200, "About fetched successfully", aboutBase);
    }
    async patchAbout(lang, payload) {
        const existing = await this.aboutModel.findOne().select(lang).lean();
        const current = existing?.[lang] ?? {};
        const mergedPayload = { ...current, ...payload };
        const updatedAbout = await this.aboutModel
            .findOneAndUpdate({}, { $set: { [lang]: mergedPayload } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(lang)
            .lean();
        const updatedAboutBase = updatedAbout?.[lang];
        if (!updatedAboutBase) {
            throw new error_services_1.ServerError("About not found", 404);
        }
        return (0, format_services_1.default)(200, "About updated successfully", updatedAboutBase);
    }
}
exports.default = new AboutServices(about_model_1.AboutModel);
