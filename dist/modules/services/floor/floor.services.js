"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const floor_model_1 = require("../../models/floor/floor.model");
const land_model_1 = require("../../models/land/land.model");
const footer_model_1 = require("../../models/footer/footer.model");
const seo_model_1 = require("../../models/seo/seo.model");
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class FloorServices {
    constructor(floorModel) {
        this.floorModel = floorModel;
        this.floorModel = floorModel;
    }
    async getSection(lang, key, notFoundMessage, successMessage, floorId, floorIndex, floorTitle) {
        const query = {};
        if (floorId) {
            query._id = floorId;
        }
        else if (typeof floorIndex === "number") {
            query.landFloorIndex = floorIndex;
        }
        let floor = null;
        if (!floorId && typeof floorIndex === "number") {
            floor = await this.floorModel
                .findOne({
                landFloorIndex: floorIndex,
                [lang]: { $exists: true },
            })
                .select(`${lang}.${key}`)
                .lean();
        }
        if (!floor) {
            floor = await this.floorModel.findOne(query).select(`${lang}.${key}`).lean();
        }
        const section = floor?.[lang]?.[key];
        if (!section) {
            if (typeof floorIndex === "number") {
                const defaults = {
                    header: { title: "", description: "" },
                    hero: { title: "", description: "", files: [] },
                    features: { cards: [] },
                    services: { hidden: false, description: "", cards: [] },
                    grounds: { hidden: false, cards: [] },
                    floorsSlider: { description: "", cards: [] },
                    seo: { filesAlt: "", title: "", description: "", keywords: [] },
                };
                return (0, format_services_1.default)(200, "Floor section initialized", defaults[key]);
            }
            throw new error_services_1.ServerError(notFoundMessage, 404);
        }
        return (0, format_services_1.default)(200, successMessage, section);
    }
    buildTitleRegex(value) {
        const trimmed = value.trim();
        if (!trimmed)
            return null;
        const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = escaped.replace(/\\-+/g, "[-\\s]+");
        return new RegExp(`^${pattern}$`, "i");
    }
    toFloorSlug(value) {
        const trimmed = value?.trim();
        if (!trimmed)
            return "";
        return trimmed
            .toLowerCase()
            .replace(/['"]/g, "")
            .replace(/[^a-z0-9\u0600-\u06FF]+/gi, "-")
            .replace(/^-+|-+$/g, "");
    }
    async updateSection(lang, key, payload, notFoundMessage, successMessage, floorId, floorIndex, floorTitle) {
        const query = {};
        if (floorId) {
            query._id = floorId;
        }
        else if (typeof floorIndex === "number") {
            query.landFloorIndex = floorIndex;
            query[lang] = { $exists: true };
        }
        const metaUpdates = {};
        if (typeof floorIndex === "number") {
            metaUpdates.landFloorIndex = floorIndex;
        }
        if (floorTitle) {
            metaUpdates[`landFloorTitle.${lang}`] = floorTitle;
        }
        const updatedFloor = await this.floorModel
            .findOneAndUpdate(query, { $set: { [`${lang}.${key}`]: payload, ...metaUpdates } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(`${lang}.${key}`)
            .lean();
        const updatedSection = updatedFloor?.[lang]?.[key];
        if (!updatedSection) {
            throw new error_services_1.ServerError(notFoundMessage, 404);
        }
        return (0, format_services_1.default)(200, successMessage, updatedSection);
    }
    async getFloorHeader(lang, floorId, floorIndex, floorTitle) {
        return this.getSection(lang, "header", "Floor header not found", "Floor header fetched successfully", floorId, floorIndex, floorTitle);
    }
    async updateFloorHeader(lang, payload, floorId, floorIndex, floorTitle) {
        return this.updateSection(lang, "header", payload, "Floor header not found", "Floor header updated successfully", floorId, floorIndex, floorTitle);
    }
    async getFloorHero(lang, floorId, floorIndex, floorTitle) {
        return this.getSection(lang, "hero", "Floor hero not found", "Floor hero fetched successfully", floorId, floorIndex, floorTitle);
    }
    async updateFloorHero(lang, payload, floorId, floorIndex, floorTitle) {
        return this.updateSection(lang, "hero", payload, "Floor hero not found", "Floor hero updated successfully", floorId, floorIndex, floorTitle);
    }
    async getFloorFeatures(lang, floorId, floorIndex, floorTitle) {
        return this.getSection(lang, "features", "Floor features not found", "Floor features fetched successfully", floorId, floorIndex, floorTitle);
    }
    async updateFloorFeatures(lang, payload, floorId, floorIndex, floorTitle) {
        return this.updateSection(lang, "features", payload, "Floor features not found", "Floor features updated successfully", floorId, floorIndex, floorTitle);
    }
    async getFloorServices(lang, floorId, floorIndex, floorTitle) {
        return this.getSection(lang, "services", "Floor services not found", "Floor services fetched successfully", floorId, floorIndex, floorTitle);
    }
    async updateFloorServices(lang, payload, floorId, floorIndex, floorTitle) {
        return this.updateSection(lang, "services", payload, "Floor services not found", "Floor services updated successfully", floorId, floorIndex, floorTitle);
    }
    async updateFloorServicesHidden(lang, hidden, floorId, floorIndex, floorTitle) {
        const query = {};
        if (floorId) {
            query._id = floorId;
        }
        else if (typeof floorIndex === "number") {
            query.landFloorIndex = floorIndex;
            query[lang] = { $exists: true };
        }
        const updatedFloor = await this.floorModel
            .findOneAndUpdate(query, { $set: { [`${lang}.services.hidden`]: hidden, ...(floorTitle ? { [`landFloorTitle.${lang}`]: floorTitle } : {}) } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(`${lang}.services.hidden`)
            .lean();
        const updatedHidden = updatedFloor?.[lang]?.services?.hidden;
        if (typeof updatedHidden !== "boolean") {
            throw new error_services_1.ServerError("Floor services not found", 404);
        }
        return (0, format_services_1.default)(200, "Floor services visibility updated successfully", { hidden: updatedHidden });
    }
    async getFloorGrounds(lang, floorId, floorIndex, floorTitle) {
        return this.getSection(lang, "grounds", "Floor grounds not found", "Floor grounds fetched successfully", floorId, floorIndex, floorTitle);
    }
    async updateFloorGrounds(lang, payload, floorId, floorIndex, floorTitle) {
        return this.updateSection(lang, "grounds", payload, "Floor grounds not found", "Floor grounds updated successfully", floorId, floorIndex, floorTitle);
    }
    async updateFloorGroundsHidden(lang, hidden, floorId, floorIndex, floorTitle) {
        const query = {};
        if (floorId) {
            query._id = floorId;
        }
        else if (typeof floorIndex === "number") {
            query.landFloorIndex = floorIndex;
            query[lang] = { $exists: true };
        }
        const updatedFloor = await this.floorModel
            .findOneAndUpdate(query, { $set: { [`${lang}.grounds.hidden`]: hidden, ...(floorTitle ? { [`landFloorTitle.${lang}`]: floorTitle } : {}) } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(`${lang}.grounds.hidden`)
            .lean();
        const updatedHidden = updatedFloor?.[lang]?.grounds?.hidden;
        if (typeof updatedHidden !== "boolean") {
            throw new error_services_1.ServerError("Floor grounds not found", 404);
        }
        return (0, format_services_1.default)(200, "Floor grounds visibility updated successfully", { hidden: updatedHidden });
    }
    async getFloorSlider(lang, floorId, floorIndex, floorTitle) {
        return this.getSection(lang, "floorsSlider", "Floor slider not found", "Floor slider fetched successfully", floorId, floorIndex, floorTitle);
    }
    async updateFloorSlider(lang, payload, floorId, floorIndex, floorTitle) {
        return this.updateSection(lang, "floorsSlider", payload, "Floor slider not found", "Floor slider updated successfully", floorId, floorIndex, floorTitle);
    }
    async getFloorOptions(lang) {
        const floors = await this.floorModel.find().select(`${lang}.header.title`).lean();
        const options = (floors ?? [])
            .map((floor) => ({
            id: floor._id?.toString() ?? "",
            title: floor?.[lang]?.header?.title?.trim() ?? "",
        }))
            .filter((floor) => floor.id && floor.title);
        return (0, format_services_1.default)(200, "Floor options fetched successfully", options);
    }
    async getFloorAll(lang, floorId, floorIndex, floorTitle) {
        const titleRegex = floorTitle?.trim() ? this.buildTitleRegex(floorTitle) : null;
        const titleFields = Array.from(new Set([`landFloorTitle.${lang}`, "landFloorTitle.en", "landFloorTitle.ar"]));
        const langExists = { [lang]: { $exists: true } };
        const floorIndexCandidates = typeof floorIndex === "number"
            ? Array.from(new Set([
                floorIndex,
                ...(floorIndex > 0 ? [floorIndex - 1] : []),
                floorIndex + 1
            ])).filter((value) => value >= 0)
            : [];
        const projection = {
            [`${lang}`]: 1,
            landFloorIndex: 1,
            landFloorTitle: 1,
            _id: 0,
        };
        const seoProjection = {
            [`${lang}.land`]: 1,
            _id: 0,
        };
        const footerProjection = {
            [lang]: 1,
            _id: 0,
        };
        let [floor, seo, footer] = await Promise.all([
            (async () => {
                if (floorId) {
                    return this.floorModel.findOne({ _id: floorId }).select(projection).lean();
                }
                const queries = [];
                if (floorIndexCandidates.length) {
                    floorIndexCandidates.forEach((index) => {
                        const baseQuery = { landFloorIndex: index, ...langExists };
                        if (titleRegex) {
                            titleFields.forEach((field) => {
                                queries.push({ ...baseQuery, [field]: titleRegex });
                            });
                        }
                        queries.push(baseQuery);
                    });
                }
                if (titleRegex) {
                    titleFields.forEach((field) => {
                        queries.push({ [field]: titleRegex, ...langExists });
                    });
                }
                for (const query of queries) {
                    const match = await this.floorModel.findOne(query).select(projection).lean();
                    if (match)
                        return match;
                }
                return null;
            })(),
            seo_model_1.SeoModel.findOne().select(seoProjection).lean(),
            footer_model_1.FooterModel.findOne().select(footerProjection).lean(),
        ]);
        if (!floor || !floor?.[lang]) {
            if (floor && !floor?.[lang]) {
                floor = null;
            }
            const land = await land_model_1.LandModel.findOne()
                .select(`${lang}.floors`)
                .lean();
            const landFloors = land?.[lang]?.floors ?? [];
            const titleSlug = floorTitle ? this.toFloorSlug(floorTitle) : "";
            let fallbackFloorId;
            if (floorIndexCandidates.length) {
                for (const index of floorIndexCandidates) {
                    const candidate = landFloors[index]?.floor;
                    if (candidate) {
                        fallbackFloorId = String(candidate);
                        break;
                    }
                }
            }
            if (!fallbackFloorId && titleSlug) {
                const matched = landFloors.find((landFloor) => this.toFloorSlug(landFloor.title ?? "") === titleSlug);
                if (matched?.floor) {
                    fallbackFloorId = String(matched.floor);
                }
            }
            if (fallbackFloorId) {
                floor = await this.floorModel
                    .findOne({ _id: fallbackFloorId, ...langExists })
                    .select(projection)
                    .lean();
            }
        }
        const floorData = floor?.[lang];
        if (!floorData) {
            throw new error_services_1.ServerError("Floor not found", 404);
        }
        return (0, format_services_1.default)(200, "Floor fetched successfully", {
            ...floorData,
            footer: footer?.[lang] ?? null,
            seo: floorData.seo ?? seo?.[lang]?.land ?? null,
        });
    }
    async getFloorSeo(lang, floorId, floorIndex, floorTitle) {
        return this.getSection(lang, "seo", "Floor seo not found", "Floor seo fetched successfully", floorId, floorIndex, floorTitle);
    }
    async updateFloorSeo(lang, payload, floorId, floorIndex, floorTitle) {
        return this.updateSection(lang, "seo", payload, "Floor seo not found", "Floor seo updated successfully", floorId, floorIndex, floorTitle);
    }
}
exports.default = new FloorServices(floor_model_1.FloorModel);
