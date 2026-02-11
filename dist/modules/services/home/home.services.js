"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_model_1 = require("../../models/home/home.model");
const footer_model_1 = require("../../models/footer/footer.model");
const seo_model_1 = require("../../models/seo/seo.model");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class HomeServices {
    constructor(homeModel) {
        this.homeModel = homeModel;
        this.homeModel = homeModel;
    }
    async getHomeHero(lang) {
        const home = await this.homeModel.findOne().select(`${lang}.hero`).lean();
        const hero = home?.[lang]?.hero;
        if (!hero) {
            throw new error_services_1.ServerError("Home hero not found", 404);
        }
        return (0, format_services_1.default)(200, "Home hero fetched successfully", hero);
    }
    async getHomeAbout(lang) {
        const home = await this.homeModel.findOne().select(`${lang}.about`).lean();
        const about = home?.[lang]?.about;
        if (!about) {
            throw new error_services_1.ServerError("Home about not found", 404);
        }
        return (0, format_services_1.default)(200, "Home about fetched successfully", about);
    }
    async getHomeHorizontal(lang) {
        const home = await this.homeModel.findOne().select(`${lang}.horizontal`).lean();
        const horizontal = home?.[lang]?.horizontal;
        if (!horizontal) {
            throw new error_services_1.ServerError("Home horizontal not found", 404);
        }
        return (0, format_services_1.default)(200, "Home horizontal fetched successfully", horizontal);
    }
    async getHomeTestimonials(lang) {
        const home = await this.homeModel.findOne().select(`${lang}.testimonials`).lean();
        const testimonials = home?.[lang]?.testimonials;
        if (!testimonials) {
            throw new error_services_1.ServerError("Home testimonials not found", 404);
        }
        if (Array.isArray(testimonials)) {
            return (0, format_services_1.default)(200, "Home testimonials fetched successfully", {
                title: ["", ""],
                cards: testimonials,
            });
        }
        return (0, format_services_1.default)(200, "Home testimonials fetched successfully", testimonials);
    }
    async getHomeLocations(lang) {
        const home = await this.homeModel.findOne().select(`${lang}.locations`).lean();
        const locations = home?.[lang]?.locations;
        if (!locations) {
            throw new error_services_1.ServerError("Home locations not found", 404);
        }
        if (Array.isArray(locations)) {
            return (0, format_services_1.default)(200, "Home locations fetched successfully", {
                title: ["", ""],
                cards: locations,
            });
        }
        return (0, format_services_1.default)(200, "Home locations fetched successfully", locations);
    }
    buildEmptyHomeBase() {
        return {
            hero: {
                title: ["", "", "", "", "", ""],
                description: "..........",
            },
            about: {
                title: ["", ""],
                description: ["", "", "", "", ""],
            },
            horizontal: [],
            testimonials: {
                title: ["", ""],
                cards: [],
            },
            locations: {
                title: ["", ""],
                cards: [],
            },
        };
    }
    buildEmptyHomeDocument() {
        return {
            ar: this.buildEmptyHomeBase(),
            en: this.buildEmptyHomeBase(),
        };
    }
    async ensureHomeDocument() {
        const existing = await this.homeModel.findOne().select("_id").lean();
        if (existing) {
            return;
        }
        await this.homeModel.create(this.buildEmptyHomeDocument());
    }
    async updateHomeHero(lang, hero) {
        await this.ensureHomeDocument();
        const updatedHome = await this.homeModel.findOneAndUpdate({}, { $set: { [`${lang}.hero`]: hero } }, { new: true })
            .select(`${lang}.hero`)
            .lean();
        const updatedHero = updatedHome?.[lang]?.hero;
        if (!updatedHero) {
            throw new error_services_1.ServerError("Home hero not found", 404);
        }
        return (0, format_services_1.default)(200, "Home hero updated successfully", updatedHero);
    }
    async updateHomeAbout(lang, about) {
        await this.ensureHomeDocument();
        const updatedHome = await this.homeModel.findOneAndUpdate({}, { $set: { [`${lang}.about`]: about } }, { new: true })
            .select(`${lang}.about`)
            .lean();
        const updatedAbout = updatedHome?.[lang]?.about;
        if (!updatedAbout) {
            throw new error_services_1.ServerError("Home about not found", 404);
        }
        return (0, format_services_1.default)(200, "Home about updated successfully", updatedAbout);
    }
    async updateHomeHorizontal(lang, horizontal) {
        await this.ensureHomeDocument();
        const updatedHome = await this.homeModel.findOneAndUpdate({}, { $set: { [`${lang}.horizontal`]: horizontal } }, { new: true })
            .select(`${lang}.horizontal`)
            .lean();
        const updatedHorizontal = updatedHome?.[lang]?.horizontal;
        if (!updatedHorizontal) {
            throw new error_services_1.ServerError("Home horizontal not found", 404);
        }
        return (0, format_services_1.default)(200, "Home horizontal updated successfully", updatedHorizontal);
    }
    async updateHomeTestimonials(lang, testimonials) {
        await this.ensureHomeDocument();
        const updatedHome = await this.homeModel.findOneAndUpdate({}, { $set: { [`${lang}.testimonials`]: testimonials } }, { new: true })
            .select(`${lang}.testimonials`)
            .lean();
        const updatedTestimonials = updatedHome?.[lang]?.testimonials;
        if (!updatedTestimonials) {
            throw new error_services_1.ServerError("Home testimonials not found", 404);
        }
        return (0, format_services_1.default)(200, "Home testimonials updated successfully", updatedTestimonials);
    }
    async updateHomeLocations(lang, locations) {
        await this.ensureHomeDocument();
        const updatedHome = await this.homeModel.findOneAndUpdate({}, { $set: { [`${lang}.locations`]: locations } }, { new: true })
            .select(`${lang}.locations`)
            .lean();
        const updatedLocations = updatedHome?.[lang]?.locations;
        if (!updatedLocations) {
            throw new error_services_1.ServerError("Home locations not found", 404);
        }
        return (0, format_services_1.default)(200, "Home locations updated successfully", updatedLocations);
    }
    async getHomeAll(lang) {
        const projection = {
            [`${lang}.hero`]: 1,
            [`${lang}.about`]: 1,
            [`${lang}.horizontal`]: 1,
            [`${lang}.testimonials`]: 1,
            [`${lang}.locations`]: 1,
            _id: 0,
        };
        const seoProjection = {
            [`${lang}.home`]: 1,
            _id: 0,
        };
        const footerProjection = {
            [lang]: 1,
            _id: 0,
        };
        const [home, seo, footer] = await Promise.all([
            this.homeModel.findOne().select(projection).lean(),
            seo_model_1.SeoModel.findOne().select(seoProjection).lean(),
            footer_model_1.FooterModel.findOne().select(footerProjection).lean(),
        ]);
        const homeData = home?.[lang];
        if (!homeData) {
            throw new error_services_1.ServerError("Home not found", 404);
        }
        return (0, format_services_1.default)(200, "Home fetched successfully", {
            ...homeData,
            footer: footer?.[lang] ?? null,
            seo: seo?.[lang]?.home ?? null,
        });
    }
}
exports.default = new HomeServices(home_model_1.HomeModel);
