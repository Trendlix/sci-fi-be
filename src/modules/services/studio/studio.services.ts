import { Model } from "mongoose";
import { StudioModel, IStudioModel } from "../../models/studio/studio.model";
import { IStudio, IStudioAbout, IStudioHero, IStudioPartners, IStudioWhyUs } from "../../models/studio/types/model.types";
import { SeoModel } from "../../models/seo/seo.model";
import { FooterModel } from "../../models/footer/footer.model";
import { ISeo } from "../../models/seo/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class StudioServices {
    constructor(private readonly studioModel: Model<IStudioModel>) {
        this.studioModel = studioModel;
    }

    async getStudioHero(lang: "ar" | "en") {
        const studio = await this.studioModel.findOne().select(`${lang}.hero`).lean<IStudio | null>();
        const hero = studio?.[lang]?.hero;
        if (!hero) {
            throw new ServerError("Studio hero not found", 404);
        }
        return responseFormatter(200, "Studio hero fetched successfully", hero);
    }

    async getStudioAbout(lang: "ar" | "en") {
        const studio = await this.studioModel.findOne().select(`${lang}.about`).lean<IStudio | null>();
        const about = studio?.[lang]?.about;
        if (!about) {
            throw new ServerError("Studio about not found", 404);
        }
        return responseFormatter(200, "Studio about fetched successfully", about);
    }

    async getStudioPartners(lang: "ar" | "en") {
        const studio = await this.studioModel.findOne().select(`${lang}.partners`).lean<IStudio | null>();
        const partners = studio?.[lang]?.partners;
        if (!partners) {
            throw new ServerError("Studio partners not found", 404);
        }
        return responseFormatter(200, "Studio partners fetched successfully", partners);
    }

    async getStudioWhyUs(lang: "ar" | "en") {
        const studio = await this.studioModel.findOne().select(`${lang}.whyUs`).lean<IStudio | null>();
        const whyUs = studio?.[lang]?.whyUs;
        if (!whyUs) {
            throw new ServerError("Studio why us not found", 404);
        }
        return responseFormatter(200, "Studio why us fetched successfully", whyUs);
    }

    async getStudioAll(lang: "ar" | "en") {
        const projection = {
            [`${lang}.hero`]: 1,
            [`${lang}.about`]: 1,
            [`${lang}.partners`]: 1,
            [`${lang}.whyUs`]: 1,
            _id: 0,
        };
        const seoProjection = {
            [`${lang}.studio`]: 1,
            _id: 0,
        };
        const footerProjection = {
            [lang]: 1,
            _id: 0,
        };
        const [studio, seo, footer] = await Promise.all([
            this.studioModel.findOne().select(projection).lean<IStudio | null>(),
            SeoModel.findOne().select(seoProjection).lean<ISeo | null>(),
            FooterModel.findOne().select(footerProjection).lean(),
        ]);
        const studioData = studio?.[lang];
        if (!studioData) {
            throw new ServerError("Studio not found", 404);
        }
        return responseFormatter(200, "Studio fetched successfully", {
            ...studioData,
            footer: footer?.[lang] ?? null,
            seo: seo?.[lang]?.studio ?? null,
        });
    }

    private async updateSection<T>(
        lang: "ar" | "en",
        key: "hero" | "about" | "partners" | "whyUs",
        payload: T,
        notFoundMessage: string,
        successMessage: string
    ) {
        const updatedStudio = await this.studioModel
            .findOneAndUpdate(
                {},
                { $set: { [`${lang}.${key}`]: payload } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(`${lang}.${key}`)
            .lean<IStudio | null>();
        const updatedSection = updatedStudio?.[lang]?.[key];
        if (!updatedSection) {
            throw new ServerError(notFoundMessage, 404);
        }
        return responseFormatter(200, successMessage, updatedSection);
    }

    async updateStudioHero(lang: "ar" | "en", payload: IStudioHero) {
        return this.updateSection(lang, "hero", payload, "Studio hero not found", "Studio hero updated successfully");
    }

    async updateStudioAbout(lang: "ar" | "en", payload: IStudioAbout) {
        return this.updateSection(lang, "about", payload, "Studio about not found", "Studio about updated successfully");
    }

    async updateStudioPartners(lang: "ar" | "en", payload: IStudioPartners) {
        return this.updateSection(lang, "partners", payload, "Studio partners not found", "Studio partners updated successfully");
    }

    async updateStudioWhyUs(lang: "ar" | "en", payload: IStudioWhyUs) {
        return this.updateSection(lang, "whyUs", payload, "Studio why us not found", "Studio why us updated successfully");
    }
}

export default new StudioServices(StudioModel);

