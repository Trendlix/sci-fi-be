import { Model } from "mongoose";
import BrandModel from "../../models/brand/brand.model";
import { IBrand, IBrandDocument } from "../../models/brand/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class BrandServices {
    constructor(private readonly brandModel: Model<IBrandDocument>) {
        this.brandModel = brandModel;
    }

    async getBrand() {
        const brand = await this.brandModel.findOne().lean<IBrand | null>();
        if (!brand) {
            throw new ServerError("Brand not found", 404);
        }
        return responseFormatter(200, "Brand fetched successfully", brand);
    }

    async patchBrand(payload: IBrand) {
        const updatedBrand = await this.brandModel
            .findOneAndUpdate(
                {},
                { $set: payload },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .lean<IBrand | null>();
        if (!updatedBrand) {
            throw new ServerError("Brand not found", 404);
        }
        return responseFormatter(200, "Brand updated successfully", updatedBrand);
    }
}

export default new BrandServices(BrandModel);

