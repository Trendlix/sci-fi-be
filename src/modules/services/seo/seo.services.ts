import { Model } from "mongoose";
import { SeoModel, ISeoModel } from "../../models/seo/seo.model";
import { ISeo, ISeoSection } from "../../models/seo/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class SeoServices {
    constructor(private readonly seoModel: Model<ISeoModel>) {
        this.seoModel = seoModel;
    }

    async getSeo(lang: "ar" | "en") {
        const seo = await this.seoModel.findOne().select(lang).lean<ISeo | null>();
        const seoSection = seo?.[lang];
        if (!seoSection) {
            throw new ServerError("Seo not found", 404);
        }
        return responseFormatter(200, "Seo fetched successfully", seoSection);
    }

    async patchSeo(lang: "ar" | "en", payload: Partial<ISeoSection>) {
        const existing = await this.seoModel.findOne().select(lang).lean<ISeo | null>();
        const current = existing?.[lang] ?? ({} as ISeoSection);
        const mergedPayload = { ...current, ...payload };
        const updatedSeo = await this.seoModel
            .findOneAndUpdate(
                {},
                { $set: { [lang]: mergedPayload } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(lang)
            .lean<ISeo | null>();
        const updatedSeoSection = updatedSeo?.[lang];
        if (!updatedSeoSection) {
            throw new ServerError("Seo not found", 404);
        }
        return responseFormatter(200, "Seo updated successfully", updatedSeoSection);
    }
}

export default new SeoServices(SeoModel);

