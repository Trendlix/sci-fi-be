import { Model } from "mongoose";
import { AboutModel, IAboutModel } from "../../models/about/about.model";
import { SeoModel } from "../../models/seo/seo.model";
import { IAbout, IAboutBase } from "../../models/about/types/model.types";
import { ISeo } from "../../models/seo/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class AboutServices {
    constructor(private readonly aboutModel: Model<IAboutModel>) {
        this.aboutModel = aboutModel;
    }

    private async getSection<T extends keyof IAboutBase>(
        lang: "ar" | "en",
        section: T,
        message: string
    ) {
        const about = await this.aboutModel.findOne().select(`${lang}.${section}`).lean<IAbout | null>();
        const data = about?.[lang]?.[section];
        if (!data) {
            throw new ServerError("About not found", 404);
        }
        return responseFormatter(200, message, data);
    }

    private async patchSection<T extends keyof IAboutBase>(
        lang: "ar" | "en",
        section: T,
        payload: IAboutBase[T],
        message: string
    ) {
        const updatedAbout = await this.aboutModel
            .findOneAndUpdate(
                {},
                { $set: { [`${lang}.${section}`]: payload } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(`${lang}.${section}`)
            .lean<IAbout | null>();
        const updatedSection = updatedAbout?.[lang]?.[section];
        if (!updatedSection) {
            throw new ServerError("About not found", 404);
        }
        return responseFormatter(200, message, updatedSection);
    }

    async getAbout(lang: "ar" | "en") {
        const about = await this.aboutModel.findOne().select(lang).lean<IAbout | null>();
        const aboutBase = about?.[lang];
        if (!aboutBase) {
            throw new ServerError("About not found", 404);
        }
        return responseFormatter(200, "About fetched successfully", aboutBase);
    }

    async patchAbout(lang: "ar" | "en", payload: Partial<IAboutBase>) {
        const existing = await this.aboutModel.findOne().select(lang).lean<IAbout | null>();
        const current = existing?.[lang] ?? {};
        const mergedPayload = { ...current, ...payload };
        const updatedAbout = await this.aboutModel
            .findOneAndUpdate(
                {},
                { $set: { [lang]: mergedPayload } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(lang)
            .lean<IAbout | null>();
        const updatedAboutBase = updatedAbout?.[lang];
        if (!updatedAboutBase) {
            throw new ServerError("About not found", 404);
        }
        return responseFormatter(200, "About updated successfully", updatedAboutBase);
    }

    async getAboutAll(lang: "ar" | "en") {
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
            this.aboutModel.findOne().select(projection).lean<IAbout | null>(),
            SeoModel.findOne().select(seoProjection).lean<ISeo | null>(),
        ]);
        const aboutData = about?.[lang];
        if (!aboutData) {
            throw new ServerError("About not found", 404);
        }
        return responseFormatter(200, "About fetched successfully", {
            ...aboutData,
            seo: seo?.[lang]?.about ?? null,
        });
    }

    async getHero(lang: "ar" | "en") {
        return this.getSection(lang, "hero", "About hero fetched successfully");
    }

    async patchHero(lang: "ar" | "en", payload: IAboutBase["hero"]) {
        return this.patchSection(lang, "hero", payload, "About hero updated successfully");
    }

    async getAboutSection(lang: "ar" | "en") {
        return this.getSection(lang, "about", "About section fetched successfully");
    }

    async patchAboutSection(lang: "ar" | "en", payload: IAboutBase["about"]) {
        return this.patchSection(lang, "about", payload, "About section updated successfully");
    }

    async getService(lang: "ar" | "en") {
        return this.getSection(lang, "service", "About service fetched successfully");
    }

    async patchService(lang: "ar" | "en", payload: IAboutBase["service"]) {
        return this.patchSection(lang, "service", payload, "About service updated successfully");
    }

    async getPreValue(lang: "ar" | "en") {
        return this.getSection(lang, "preValue", "About pre-value fetched successfully");
    }

    async patchPreValue(lang: "ar" | "en", payload: IAboutBase["preValue"]) {
        return this.patchSection(lang, "preValue", payload, "About pre-value updated successfully");
    }

    async getValue(lang: "ar" | "en") {
        return this.getSection(lang, "value", "About value fetched successfully");
    }

    async patchValue(lang: "ar" | "en", payload: IAboutBase["value"]) {
        return this.patchSection(lang, "value", payload, "About value updated successfully");
    }
}

export default new AboutServices(AboutModel);

