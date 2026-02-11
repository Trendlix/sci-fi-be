import { Model } from "mongoose";
import { FloorModel, IFloorModel } from "../../models/floor/floor.model";
import { FooterModel } from "../../models/footer/footer.model";
import { SeoModel } from "../../models/seo/seo.model";
import { ISeo } from "../../models/seo/types/model.types";
import { IFloor, IFloorFeatures, IFloorGrounds, IFloorHeader, IFloorHero, IFloorServices, IFloorSlider } from "../../models/floor/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class FloorServices {
    constructor(private readonly floorModel: Model<IFloorModel>) {
        this.floorModel = floorModel;
    }

    private async getSection<T>(
        lang: "ar" | "en",
        key: "header" | "hero" | "features" | "services" | "grounds" | "floorsSlider",
        notFoundMessage: string,
        successMessage: string,
        floorId?: string,
        floorIndex?: number,
        floorTitle?: string
    ) {
        const query: Record<string, unknown> = {};
        if (floorId) {
            query._id = floorId;
        } else if (typeof floorIndex === "number") {
            query.landFloorIndex = floorIndex;
        }
        let floor: IFloor | null = null;
        if (!floorId && typeof floorIndex === "number") {
            floor = await this.floorModel
                .findOne({
                    landFloorIndex: floorIndex,
                    [lang]: { $exists: true },
                })
                .select(`${lang}.${key}`)
                .lean<IFloor | null>();
        }
        if (!floor) {
            floor = await this.floorModel.findOne(query).select(`${lang}.${key}`).lean<IFloor | null>();
        }
        const section = floor?.[lang]?.[key];
        if (!section) {
            if (typeof floorIndex === "number") {
                const defaults: Record<typeof key, unknown> = {
                    header: { title: "", description: "" },
                    hero: { title: "", description: "", files: [] },
                    features: { cards: [] },
                    services: { hidden: false, description: "", cards: [] },
                    grounds: { hidden: false, cards: [] },
                    floorsSlider: { description: "", cards: [] },
                };
                return responseFormatter(200, "Floor section initialized", defaults[key] as T);
            }
            throw new ServerError(notFoundMessage, 404);
        }
        return responseFormatter(200, successMessage, section as T);
    }

    private buildTitleRegex(value: string) {
        const trimmed = value.trim();
        if (!trimmed) return null;
        const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = escaped.replace(/\\-+/g, "[-\\s]+");
        return new RegExp(`^${pattern}$`, "i");
    }

    private async updateSection<T>(
        lang: "ar" | "en",
        key: "header" | "hero" | "features" | "services" | "grounds" | "floorsSlider",
        payload: T,
        notFoundMessage: string,
        successMessage: string,
        floorId?: string,
        floorIndex?: number,
        floorTitle?: string
    ) {
        const query: Record<string, unknown> = {};
        if (floorId) {
            query._id = floorId;
        } else if (typeof floorIndex === "number") {
            query.landFloorIndex = floorIndex;
            query[lang] = { $exists: true };
        }
        const metaUpdates: Record<string, unknown> = {};
        if (typeof floorIndex === "number") {
            metaUpdates.landFloorIndex = floorIndex;
        }
        if (floorTitle) {
            metaUpdates[`landFloorTitle.${lang}`] = floorTitle;
        }
        const updatedFloor = await this.floorModel
            .findOneAndUpdate(
                query,
                { $set: { [`${lang}.${key}`]: payload, ...metaUpdates } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(`${lang}.${key}`)
            .lean<IFloor | null>();
        const updatedSection = updatedFloor?.[lang]?.[key];
        if (!updatedSection) {
            throw new ServerError(notFoundMessage, 404);
        }
        return responseFormatter(200, successMessage, updatedSection as T);
    }

    async getFloorHeader(lang: "ar" | "en", floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.getSection<IFloorHeader>(
            lang,
            "header",
            "Floor header not found",
            "Floor header fetched successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async updateFloorHeader(lang: "ar" | "en", payload: IFloorHeader, floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.updateSection<IFloorHeader>(
            lang,
            "header",
            payload,
            "Floor header not found",
            "Floor header updated successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async getFloorHero(lang: "ar" | "en", floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.getSection<IFloorHero>(
            lang,
            "hero",
            "Floor hero not found",
            "Floor hero fetched successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async updateFloorHero(lang: "ar" | "en", payload: IFloorHero, floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.updateSection<IFloorHero>(
            lang,
            "hero",
            payload,
            "Floor hero not found",
            "Floor hero updated successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async getFloorFeatures(lang: "ar" | "en", floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.getSection<IFloorFeatures>(
            lang,
            "features",
            "Floor features not found",
            "Floor features fetched successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async updateFloorFeatures(lang: "ar" | "en", payload: IFloorFeatures, floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.updateSection<IFloorFeatures>(
            lang,
            "features",
            payload,
            "Floor features not found",
            "Floor features updated successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async getFloorServices(lang: "ar" | "en", floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.getSection<IFloorServices>(
            lang,
            "services",
            "Floor services not found",
            "Floor services fetched successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async updateFloorServices(lang: "ar" | "en", payload: IFloorServices, floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.updateSection<IFloorServices>(
            lang,
            "services",
            payload,
            "Floor services not found",
            "Floor services updated successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async updateFloorServicesHidden(lang: "ar" | "en", hidden: boolean, floorId?: string, floorIndex?: number, floorTitle?: string) {
        const query: Record<string, unknown> = {};
        if (floorId) {
            query._id = floorId;
        } else if (typeof floorIndex === "number") {
            query.landFloorIndex = floorIndex;
            query[lang] = { $exists: true };
        }
        const updatedFloor = await this.floorModel
            .findOneAndUpdate(
                query,
                { $set: { [`${lang}.services.hidden`]: hidden, ...(floorTitle ? { [`landFloorTitle.${lang}`]: floorTitle } : {}) } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(`${lang}.services.hidden`)
            .lean<IFloor | null>();
        const updatedHidden = updatedFloor?.[lang]?.services?.hidden;
        if (typeof updatedHidden !== "boolean") {
            throw new ServerError("Floor services not found", 404);
        }
        return responseFormatter(200, "Floor services visibility updated successfully", { hidden: updatedHidden });
    }

    async getFloorGrounds(lang: "ar" | "en", floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.getSection<IFloorGrounds>(
            lang,
            "grounds",
            "Floor grounds not found",
            "Floor grounds fetched successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async updateFloorGrounds(lang: "ar" | "en", payload: IFloorGrounds, floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.updateSection<IFloorGrounds>(
            lang,
            "grounds",
            payload,
            "Floor grounds not found",
            "Floor grounds updated successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async updateFloorGroundsHidden(lang: "ar" | "en", hidden: boolean, floorId?: string, floorIndex?: number, floorTitle?: string) {
        const query: Record<string, unknown> = {};
        if (floorId) {
            query._id = floorId;
        } else if (typeof floorIndex === "number") {
            query.landFloorIndex = floorIndex;
            query[lang] = { $exists: true };
        }
        const updatedFloor = await this.floorModel
            .findOneAndUpdate(
                query,
                { $set: { [`${lang}.grounds.hidden`]: hidden, ...(floorTitle ? { [`landFloorTitle.${lang}`]: floorTitle } : {}) } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(`${lang}.grounds.hidden`)
            .lean<IFloor | null>();
        const updatedHidden = updatedFloor?.[lang]?.grounds?.hidden;
        if (typeof updatedHidden !== "boolean") {
            throw new ServerError("Floor grounds not found", 404);
        }
        return responseFormatter(200, "Floor grounds visibility updated successfully", { hidden: updatedHidden });
    }

    async getFloorSlider(lang: "ar" | "en", floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.getSection<IFloorSlider>(
            lang,
            "floorsSlider",
            "Floor slider not found",
            "Floor slider fetched successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async updateFloorSlider(lang: "ar" | "en", payload: IFloorSlider, floorId?: string, floorIndex?: number, floorTitle?: string) {
        return this.updateSection<IFloorSlider>(
            lang,
            "floorsSlider",
            payload,
            "Floor slider not found",
            "Floor slider updated successfully",
            floorId,
            floorIndex,
            floorTitle
        );
    }

    async getFloorOptions(lang: "ar" | "en") {
        const floors = await this.floorModel.find().select(`${lang}.header.title`).lean<IFloor[]>();
        const options = (floors ?? [])
            .map((floor) => ({
                id: (floor as IFloor & { _id?: string })._id?.toString() ?? "",
                title: floor?.[lang]?.header?.title?.trim() ?? "",
            }))
            .filter((floor) => floor.id && floor.title);
        return responseFormatter(200, "Floor options fetched successfully", options);
    }

    async getFloorAll(lang: "ar" | "en", floorId?: string, floorIndex?: number, floorTitle?: string) {
        const titleRegex = floorTitle?.trim() ? this.buildTitleRegex(floorTitle) : null;
        const floorIndexCandidates = typeof floorIndex === "number"
            ? [floorIndex, ...(floorIndex > 0 ? [floorIndex - 1] : [])]
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
        const [floor, seo, footer] = await Promise.all([
            (async () => {
                if (floorId) {
                    return this.floorModel.findOne({ _id: floorId }).select(projection).lean<IFloor | null>();
                }
                const queries: Record<string, unknown>[] = [];
                if (floorIndexCandidates.length) {
                    floorIndexCandidates.forEach((index) => {
                        const baseQuery: Record<string, unknown> = { landFloorIndex: index };
                        if (titleRegex) {
                            queries.push({ ...baseQuery, [`landFloorTitle.${lang}`]: titleRegex });
                        }
                        queries.push(baseQuery);
                    });
                }
                if (titleRegex) {
                    queries.push({ [`landFloorTitle.${lang}`]: titleRegex });
                }
                for (const query of queries) {
                    const match = await this.floorModel.findOne(query).select(projection).lean<IFloor | null>();
                    if (match) return match;
                }
                return null;
            })(),
            SeoModel.findOne().select(seoProjection).lean<ISeo | null>(),
            FooterModel.findOne().select(footerProjection).lean(),
        ]);
        const floorData = floor?.[lang];
        if (!floorData) {
            throw new ServerError("Floor not found", 404);
        }
        return responseFormatter(200, "Floor fetched successfully", {
            ...floorData,
            footer: footer?.[lang] ?? null,
            seo: seo?.[lang]?.land ?? null,
        });
    }
}

export default new FloorServices(FloorModel);

