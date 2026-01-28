"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studio_model_1 = require("../../models/studio/studio.model");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class StudioServices {
    constructor(studioModel) {
        this.studioModel = studioModel;
        this.studioModel = studioModel;
    }
    async getStudioHero(lang) {
        const studio = await this.studioModel.findOne().select(`${lang}.hero`).lean();
        const hero = studio?.[lang]?.hero;
        if (!hero) {
            throw new error_services_1.ServerError("Studio hero not found", 404);
        }
        return (0, format_services_1.default)(200, "Studio hero fetched successfully", hero);
    }
    async getStudioAbout(lang) {
        const studio = await this.studioModel.findOne().select(`${lang}.about`).lean();
        const about = studio?.[lang]?.about;
        if (!about) {
            throw new error_services_1.ServerError("Studio about not found", 404);
        }
        return (0, format_services_1.default)(200, "Studio about fetched successfully", about);
    }
    async getStudioPartners(lang) {
        const studio = await this.studioModel.findOne().select(`${lang}.partners`).lean();
        const partners = studio?.[lang]?.partners;
        if (!partners) {
            throw new error_services_1.ServerError("Studio partners not found", 404);
        }
        return (0, format_services_1.default)(200, "Studio partners fetched successfully", partners);
    }
    async getStudioWhyUs(lang) {
        const studio = await this.studioModel.findOne().select(`${lang}.whyUs`).lean();
        const whyUs = studio?.[lang]?.whyUs;
        if (!whyUs) {
            throw new error_services_1.ServerError("Studio why us not found", 404);
        }
        return (0, format_services_1.default)(200, "Studio why us fetched successfully", whyUs);
    }
    async updateSection(lang, key, payload, notFoundMessage, successMessage) {
        const updatedStudio = await this.studioModel
            .findOneAndUpdate({}, { $set: { [`${lang}.${key}`]: payload } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(`${lang}.${key}`)
            .lean();
        const updatedSection = updatedStudio?.[lang]?.[key];
        if (!updatedSection) {
            throw new error_services_1.ServerError(notFoundMessage, 404);
        }
        return (0, format_services_1.default)(200, successMessage, updatedSection);
    }
    async updateStudioHero(lang, payload) {
        return this.updateSection(lang, "hero", payload, "Studio hero not found", "Studio hero updated successfully");
    }
    async updateStudioAbout(lang, payload) {
        return this.updateSection(lang, "about", payload, "Studio about not found", "Studio about updated successfully");
    }
    async updateStudioPartners(lang, payload) {
        return this.updateSection(lang, "partners", payload, "Studio partners not found", "Studio partners updated successfully");
    }
    async updateStudioWhyUs(lang, payload) {
        return this.updateSection(lang, "whyUs", payload, "Studio why us not found", "Studio why us updated successfully");
    }
}
exports.default = new StudioServices(studio_model_1.StudioModel);
