"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const about_model_1 = require("../../models/about/about.model");
const seo_model_1 = require("../../models/seo/seo.model");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class AboutServices {
    constructor(aboutModel) {
        this.aboutModel = aboutModel;
        this.aboutModel = aboutModel;
    }
    async getSection(lang, section, message) {
        const about = await this.aboutModel.findOne().select(`${lang}.${section}`).lean();
        const data = about?.[lang]?.[section];
        if (!data) {
            throw new error_services_1.ServerError("About not found", 404);
        }
        return (0, format_services_1.default)(200, message, data);
    }
    async patchSection(lang, section, payload, message) {
        const updatedAbout = await this.aboutModel
            .findOneAndUpdate({}, { $set: { [`${lang}.${section}`]: payload } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(`${lang}.${section}`)
            .lean();
        const updatedSection = updatedAbout?.[lang]?.[section];
        if (!updatedSection) {
            throw new error_services_1.ServerError("About not found", 404);
        }
        return (0, format_services_1.default)(200, message, updatedSection);
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
    async getAboutAll(lang) {
        const projection = {
            [`${lang}.hero`]: 1,
            [`${lang}.about`]: 1,
            [`${lang}.service`]: 1,
            // [`${lang}.preValue`]: 1,
            [`${lang}.value`]: 1,
            _id: 0,
        };
        const seoProjection = {
            [`${lang}.about`]: 1,
            _id: 0,
        };
        const [about, seo] = await Promise.all([
            this.aboutModel.findOne().select(projection).lean(),
            seo_model_1.SeoModel.findOne().select(seoProjection).lean(),
        ]);
        const aboutData = about?.[lang];
        if (!aboutData) {
            throw new error_services_1.ServerError("About not found", 404);
        }
        return (0, format_services_1.default)(200, "About fetched successfully", {
            ...aboutData,
            seo: seo?.[lang]?.about ?? null,
        });
    }
    async getHero(lang) {
        return this.getSection(lang, "hero", "About hero fetched successfully");
    }
    async patchHero(lang, payload) {
        return this.patchSection(lang, "hero", payload, "About hero updated successfully");
    }
    async getAboutSection(lang) {
        return this.getSection(lang, "about", "About section fetched successfully");
    }
    async patchAboutSection(lang, payload) {
        return this.patchSection(lang, "about", payload, "About section updated successfully");
    }
    async getService(lang) {
        return this.getSection(lang, "service", "About service fetched successfully");
    }
    async patchService(lang, payload) {
        return this.patchSection(lang, "service", payload, "About service updated successfully");
    }
    async getPreValue(lang) {
        return this.getSection(lang, "preValue", "About pre-value fetched successfully");
    }
    async patchPreValue(lang, payload) {
        return this.patchSection(lang, "preValue", payload, "About pre-value updated successfully");
    }
    async getValue(lang) {
        return this.getSection(lang, "value", "About value fetched successfully");
    }
    async patchValue(lang, payload) {
        return this.patchSection(lang, "value", payload, "About value updated successfully");
    }
}
exports.default = new AboutServices(about_model_1.AboutModel);
