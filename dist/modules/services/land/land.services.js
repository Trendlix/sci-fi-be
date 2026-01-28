"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const land_model_1 = require("../../models/land/land.model");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class LandServices {
    constructor(landModel) {
        this.landModel = landModel;
        this.landModel = landModel;
    }
    async getSection(lang, path, notFoundMessage, successMessage) {
        const land = await this.landModel.findOne().select(`${lang}.${path}`).lean();
        const section = path.split(".").reduce((acc, key) => {
            if (!acc)
                return undefined;
            return acc[key];
        }, land?.[lang]);
        if (!section) {
            throw new error_services_1.ServerError(notFoundMessage, 404);
        }
        return (0, format_services_1.default)(200, successMessage, section);
    }
    async updateSection(lang, path, payload, notFoundMessage, successMessage) {
        const updatedLand = await this.landModel
            .findOneAndUpdate({}, { $set: { [`${lang}.${path}`]: payload } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(`${lang}.${path}`)
            .lean();
        const updatedSection = path.split(".").reduce((acc, key) => {
            if (!acc)
                return undefined;
            return acc[key];
        }, updatedLand?.[lang]);
        if (!updatedSection) {
            throw new error_services_1.ServerError(notFoundMessage, 404);
        }
        return (0, format_services_1.default)(200, successMessage, updatedSection);
    }
    async getLandHero(lang) {
        return this.getSection(lang, "hero", "Land hero not found", "Land hero fetched successfully");
    }
    async updateLandHero(lang, payload) {
        return this.updateSection(lang, "hero", payload, "Land hero not found", "Land hero updated successfully");
    }
    async getLandDiscoverFloors(lang) {
        return this.getSection(lang, "discoverFloors", "Land discover floors not found", "Land discover floors fetched successfully");
    }
    async updateLandDiscoverFloors(lang, payload) {
        return this.updateSection(lang, "discoverFloors", payload, "Land discover floors not found", "Land discover floors updated successfully");
    }
    async getLandFloors(lang) {
        return this.getSection(lang, "floors", "Land floors not found", "Land floors fetched successfully");
    }
    async updateLandFloors(lang, payload) {
        return this.updateSection(lang, "floors", payload, "Land floors not found", "Land floors updated successfully");
    }
    async getLandServicesBirthday(lang) {
        return this.getSection(lang, "services.birthDayParty", "Land birthday service not found", "Land birthday service fetched successfully");
    }
    async updateLandServicesBirthday(lang, payload) {
        return this.updateSection(lang, "services.birthDayParty", payload, "Land birthday service not found", "Land birthday service updated successfully");
    }
    async getLandServicesMembership(lang) {
        return this.getSection(lang, "services.membershipPackages", "Land membership service not found", "Land membership service fetched successfully");
    }
    async updateLandServicesMembership(lang, payload) {
        return this.updateSection(lang, "services.membershipPackages", payload, "Land membership service not found", "Land membership service updated successfully");
    }
    async getLandServicesSchoolNursery(lang) {
        return this.getSection(lang, "services.schoolTripsAndNursery", "Land school & nursery not found", "Land school & nursery fetched successfully");
    }
    async updateLandServicesSchoolNursery(lang, payload) {
        return this.updateSection(lang, "services.schoolTripsAndNursery", payload, "Land school & nursery not found", "Land school & nursery updated successfully");
    }
    async getLandServicesWalkin(lang) {
        return this.getSection(lang, "services.walkin", "Land walkin not found", "Land walkin fetched successfully");
    }
    async updateLandServicesWalkin(lang, payload) {
        return this.updateSection(lang, "services.walkin", payload, "Land walkin not found", "Land walkin updated successfully");
    }
}
exports.default = new LandServices(land_model_1.LandModel);
