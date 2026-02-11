"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const land_model_1 = require("../../models/land/land.model");
const home_model_1 = require("../../models/home/home.model");
const footer_model_1 = require("../../models/footer/footer.model");
const seo_model_1 = require("../../models/seo/seo.model");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class LandServices {
    constructor(landModel) {
        this.landModel = landModel;
        this.landModel = landModel;
    }
    stripTimestamps(value) {
        if (Array.isArray(value)) {
            return value.map((item) => this.stripTimestamps(item));
        }
        if (value && typeof value === "object") {
            const entries = Object.entries(value)
                .filter(([key]) => key !== "createdAt" && key !== "updatedAt" && key !== "__v")
                .map(([key, entry]) => [key, this.stripTimestamps(entry)]);
            return Object.fromEntries(entries);
        }
        return value;
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
    async getLandFloorsOptions(lang) {
        const land = await this.landModel.findOne().select(`${lang}.floors`).lean();
        const floors = land?.[lang]?.floors;
        if (!floors) {
            throw new error_services_1.ServerError("Land floors not found", 404);
        }
        const options = floors
            .map((floor, index) => ({
            id: `${index}`,
            title: floor.title ?? "",
        }))
            .filter((floor) => floor.title);
        return (0, format_services_1.default)(200, "Land floors options fetched successfully", options);
    }
    async updateLandFloors(lang, payload) {
        return this.updateSection(lang, "floors", payload, "Land floors not found", "Land floors updated successfully");
    }
    async getLandTestimonialsTitle(lang) {
        return this.getSection(lang, "testimonialsTitle", "Land testimonials title not found", "Land testimonials title fetched successfully");
    }
    async updateLandTestimonialsTitle(lang, payload) {
        return this.updateSection(lang, "testimonialsTitle", payload, "Land testimonials title not found", "Land testimonials title updated successfully");
    }
    async getLandServicesHeader(lang) {
        const land = await this.landModel.findOne().select(`${lang}.services.title ${lang}.services.description`).lean();
        const services = land?.[lang]?.services;
        if (!services) {
            throw new error_services_1.ServerError("Land services header not found", 404);
        }
        return (0, format_services_1.default)(200, "Land services header fetched successfully", {
            title: services.title ?? [],
            description: services.description ?? "",
        });
    }
    async updateLandServicesHeader(lang, payload) {
        const updatedLand = await this.landModel
            .findOneAndUpdate({}, { $set: { [`${lang}.services.title`]: payload.title, [`${lang}.services.description`]: payload.description } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(`${lang}.services.title ${lang}.services.description`)
            .lean();
        const services = updatedLand?.[lang]?.services;
        if (!services) {
            throw new error_services_1.ServerError("Land services header not found", 404);
        }
        return (0, format_services_1.default)(200, "Land services header updated successfully", {
            title: services.title ?? [],
            description: services.description ?? "",
        });
    }
    async getLandServicesBirthday(lang) {
        return this.getSection(lang, "services.birthDayParty", "Land birthday service not found", "Land birthday service fetched successfully");
    }
    async updateLandServicesBirthday(lang, payload) {
        return this.updateSection(lang, "services.birthDayParty", payload, "Land birthday service not found", "Land birthday service updated successfully");
    }
    async updateLandServicesBirthdayPrinceVisibility(lang, payload) {
        const updatedLand = await this.landModel
            .findOneAndUpdate({}, { $set: { [`${lang}.services.birthDayParty.packages.prince.hidden`]: payload.hidden } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(`${lang}.services.birthDayParty`)
            .lean();
        const birthDayParty = updatedLand?.[lang]?.services?.birthDayParty;
        if (!birthDayParty) {
            throw new error_services_1.ServerError("Land birthday service not found", 404);
        }
        return (0, format_services_1.default)(200, "Land birthday prince visibility updated successfully", birthDayParty);
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
    async getLandAll(lang) {
        const projection = {
            [lang]: 1,
            _id: 0,
        };
        const seoProjection = {
            [`${lang}.land`]: 1,
            _id: 0,
        };
        const testimonialsProjection = {
            [`${lang}.testimonials.cards`]: 1,
            _id: 0,
        };
        const footerProjection = {
            [lang]: 1,
            _id: 0,
        };
        const [land, seo, home, footer] = await Promise.all([
            this.landModel.findOne().select(projection).lean(),
            seo_model_1.SeoModel.findOne().select(seoProjection).lean(),
            home_model_1.HomeModel.findOne().select(testimonialsProjection).lean(),
            footer_model_1.FooterModel.findOne().select(footerProjection).lean(),
        ]);
        const landData = land?.[lang];
        if (!landData) {
            throw new error_services_1.ServerError("Land not found", 404);
        }
        const testimonialsCards = home?.[lang]?.testimonials?.cards ?? [];
        const responseData = this.stripTimestamps({
            ...landData,
            testimonials: {
                title: landData.testimonialsTitle ?? [],
                cards: testimonialsCards,
            },
            footer: footer?.[lang] ?? null,
            seo: seo?.[lang]?.land ?? null,
        });
        return (0, format_services_1.default)(200, "Land fetched successfully", responseData);
    }
}
exports.default = new LandServices(land_model_1.LandModel);
