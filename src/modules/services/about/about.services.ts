import { Model } from "mongoose";
import { AboutModel, IAboutModel } from "../../models/about/about.model";
import { IAbout, IAboutBase } from "../../models/about/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class AboutServices {
    constructor(private readonly aboutModel: Model<IAboutModel>) {
        this.aboutModel = aboutModel;
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
}

export default new AboutServices(AboutModel);

