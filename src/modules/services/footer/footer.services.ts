import { Model } from "mongoose";
import { FooterModel, IFooterModel } from "../../models/footer/footer.model";
import { IFooter, IFooterBase } from "../../models/footer/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class FooterServices {
    constructor(private readonly footerModel: Model<IFooterModel>) {
        this.footerModel = footerModel;
    }

    async getFooter(lang: "ar" | "en") {
        const footer = await this.footerModel.findOne().select(lang).lean<IFooter | null>();
        const footerBase = footer?.[lang];
        if (!footerBase) {
            throw new ServerError("Footer not found", 404);
        }
        return responseFormatter(200, "Footer fetched successfully", footerBase);
    }

    async patchFooter(lang: "ar" | "en", payload: Partial<IFooterBase>) {
        const existing = await this.footerModel.findOne().select(lang).lean<IFooter | null>();
        const current = existing?.[lang] ?? {};
        const mergedPayload = {
            ...current,
            ...payload,
            address: payload.address
                ? { ...(current as IFooterBase).address, ...payload.address }
                : (current as IFooterBase).address,
        } as IFooterBase;
        const updatedFooter = await this.footerModel
            .findOneAndUpdate(
                {},
                { $set: { [lang]: mergedPayload } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(lang)
            .lean<IFooter | null>();
        const updatedFooterBase = updatedFooter?.[lang];
        if (!updatedFooterBase) {
            throw new ServerError("Footer not found", 404);
        }
        return responseFormatter(200, "Footer updated successfully", updatedFooterBase);
    }
}

export default new FooterServices(FooterModel);

