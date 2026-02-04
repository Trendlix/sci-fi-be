"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_model_1 = require("../../models/events/events.model");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class EventServices {
    constructor(eventModel) {
        this.eventModel = eventModel;
        this.eventModel = eventModel;
    }
    async getSection(lang, section, message) {
        const event = await this.eventModel.findOne().select(`${lang}.${section}`).lean();
        const data = event?.[lang]?.[section];
        if (!data) {
            throw new error_services_1.ServerError("Event not found", 404);
        }
        return (0, format_services_1.default)(200, message, data);
    }
    async patchSection(lang, section, payload, message) {
        const updatedEvent = await this.eventModel
            .findOneAndUpdate({}, { $set: { [`${lang}.${section}`]: payload } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(`${lang}.${section}`)
            .lean();
        const updatedSection = updatedEvent?.[lang]?.[section];
        if (!updatedSection) {
            throw new error_services_1.ServerError("Event not found", 404);
        }
        return (0, format_services_1.default)(200, message, updatedSection);
    }
    async getHero(lang) {
        return this.getSection(lang, "hero", "Event hero fetched successfully");
    }
    async patchHero(lang, payload) {
        return this.patchSection(lang, "hero", payload, "Event hero updated successfully");
    }
    async getAbout(lang) {
        return this.getSection(lang, "about", "Event about fetched successfully");
    }
    async patchAbout(lang, payload) {
        return this.patchSection(lang, "about", payload, "Event about updated successfully");
    }
    async getPartners(lang) {
        return this.getSection(lang, "partners", "Event partners fetched successfully");
    }
    async patchPartners(lang, payload) {
        return this.patchSection(lang, "partners", payload, "Event partners updated successfully");
    }
    async getProgram(lang) {
        return this.getSection(lang, "program", "Event program fetched successfully");
    }
    async patchProgram(lang, payload) {
        return this.patchSection(lang, "program", payload, "Event program updated successfully");
    }
    async getHow(lang) {
        return this.getSection(lang, "how", "Event how fetched successfully");
    }
    async patchHow(lang, payload) {
        return this.patchSection(lang, "how", payload, "Event how updated successfully");
    }
    async getReady(lang) {
        return this.getSection(lang, "ready", "Event ready fetched successfully");
    }
    async patchReady(lang, payload) {
        return this.patchSection(lang, "ready", payload, "Event ready updated successfully");
    }
    async getFeatured(lang) {
        return this.getSection(lang, "featured", "Event featured fetched successfully");
    }
    async patchFeatured(lang, payload) {
        return this.patchSection(lang, "featured", payload, "Event featured updated successfully");
    }
    async getUpcoming(lang) {
        return this.getSection(lang, "upcoming", "Event upcoming fetched successfully");
    }
    async patchUpcoming(lang, payload) {
        return this.patchSection(lang, "upcoming", payload, "Event upcoming updated successfully");
    }
    async getUpcomingTypes(lang) {
        const event = await this.eventModel.findOne().select(`${lang}.upcoming.type`).lean();
        const upcoming = event?.[lang]?.upcoming ?? [];
        const types = Array.from(new Set(upcoming.map((card) => card.type).filter(Boolean)));
        return (0, format_services_1.default)(200, "Event upcoming types fetched successfully", types);
    }
}
exports.default = new EventServices(events_model_1.EventModel);
