import { Model } from "mongoose";
import { LandModel, ILandModel } from "../../models/land/land.model";
import { ILand, ILandBase, ILandHero, IDiscoverFloors, IFloor, IServices, IServiceBirthDayParty, IServiceMembershipPackages, IServiceSchoolTripsAndNursery, IServiceWalkin } from "../../models/land/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class LandServices {
    constructor(private readonly landModel: Model<ILandModel>) {
        this.landModel = landModel;
    }

    private async getSection<T>(lang: "ar" | "en", path: string, notFoundMessage: string, successMessage: string) {
        const land = await this.landModel.findOne().select(`${lang}.${path}`).lean<ILand | null>();
        const section = path.split(".").reduce<unknown>((acc, key) => {
            if (!acc) return undefined;
            return (acc as Record<string, unknown>)[key];
        }, land?.[lang] as unknown);

        if (!section) {
            throw new ServerError(notFoundMessage, 404);
        }

        return responseFormatter(200, successMessage, section as T);
    }

    private async updateSection<T>(lang: "ar" | "en", path: string, payload: T, notFoundMessage: string, successMessage: string) {
        const updatedLand = await this.landModel
            .findOneAndUpdate(
                {},
                { $set: { [`${lang}.${path}`]: payload } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(`${lang}.${path}`)
            .lean<ILand | null>();

        const updatedSection = path.split(".").reduce<unknown>((acc, key) => {
            if (!acc) return undefined;
            return (acc as Record<string, unknown>)[key];
        }, updatedLand?.[lang] as unknown);

        if (!updatedSection) {
            throw new ServerError(notFoundMessage, 404);
        }

        return responseFormatter(200, successMessage, updatedSection as T);
    }

    async getLandHero(lang: "ar" | "en") {
        return this.getSection<ILandHero>(lang, "hero", "Land hero not found", "Land hero fetched successfully");
    }

    async updateLandHero(lang: "ar" | "en", payload: ILandHero) {
        return this.updateSection<ILandHero>(lang, "hero", payload, "Land hero not found", "Land hero updated successfully");
    }

    async getLandDiscoverFloors(lang: "ar" | "en") {
        return this.getSection<IDiscoverFloors>(lang, "discoverFloors", "Land discover floors not found", "Land discover floors fetched successfully");
    }

    async updateLandDiscoverFloors(lang: "ar" | "en", payload: IDiscoverFloors) {
        return this.updateSection<IDiscoverFloors>(lang, "discoverFloors", payload, "Land discover floors not found", "Land discover floors updated successfully");
    }

    async getLandFloors(lang: "ar" | "en") {
        return this.getSection<IFloor[]>(lang, "floors", "Land floors not found", "Land floors fetched successfully");
    }

    async updateLandFloors(lang: "ar" | "en", payload: IFloor[]) {
        return this.updateSection<IFloor[]>(lang, "floors", payload, "Land floors not found", "Land floors updated successfully");
    }

    async getLandServicesBirthday(lang: "ar" | "en") {
        return this.getSection<IServiceBirthDayParty>(lang, "services.birthDayParty", "Land birthday service not found", "Land birthday service fetched successfully");
    }

    async updateLandServicesBirthday(lang: "ar" | "en", payload: IServiceBirthDayParty) {
        return this.updateSection<IServiceBirthDayParty>(lang, "services.birthDayParty", payload, "Land birthday service not found", "Land birthday service updated successfully");
    }

    async getLandServicesMembership(lang: "ar" | "en") {
        return this.getSection<IServiceMembershipPackages>(lang, "services.membershipPackages", "Land membership service not found", "Land membership service fetched successfully");
    }

    async updateLandServicesMembership(lang: "ar" | "en", payload: IServiceMembershipPackages) {
        return this.updateSection<IServiceMembershipPackages>(lang, "services.membershipPackages", payload, "Land membership service not found", "Land membership service updated successfully");
    }

    async getLandServicesSchoolNursery(lang: "ar" | "en") {
        return this.getSection<IServiceSchoolTripsAndNursery>(lang, "services.schoolTripsAndNursery", "Land school & nursery not found", "Land school & nursery fetched successfully");
    }

    async updateLandServicesSchoolNursery(lang: "ar" | "en", payload: IServiceSchoolTripsAndNursery) {
        return this.updateSection<IServiceSchoolTripsAndNursery>(lang, "services.schoolTripsAndNursery", payload, "Land school & nursery not found", "Land school & nursery updated successfully");
    }

    async getLandServicesWalkin(lang: "ar" | "en") {
        return this.getSection<IServiceWalkin>(lang, "services.walkin", "Land walkin not found", "Land walkin fetched successfully");
    }

    async updateLandServicesWalkin(lang: "ar" | "en", payload: IServiceWalkin) {
        return this.updateSection<IServiceWalkin>(lang, "services.walkin", payload, "Land walkin not found", "Land walkin updated successfully");
    }
}

export default new LandServices(LandModel);

