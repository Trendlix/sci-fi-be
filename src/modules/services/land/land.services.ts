import { Model } from "mongoose";
import { LandModel, ILandModel } from "../../models/land/land.model";
import { HomeModel } from "../../models/home/home.model";
import { IHome } from "../../models/home/types/model.types";
import { FooterModel } from "../../models/footer/footer.model";
import { IFooter } from "../../models/footer/types/model.types";
import { SeoModel } from "../../models/seo/seo.model";
import BrandModel from "../../models/brand/brand.model";
import { IBrand } from "../../models/brand/types/model.types";
import { ISeo } from "../../models/seo/types/model.types";
import { ILand, ILandBase, ILandHero, IDiscoverFloors, IFloor, IServices, IServiceBirthDayParty, IServiceMembershipPackages, IServiceSchoolTripsAndNursery, IServiceWalkin } from "../../models/land/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class LandServices {
    constructor(private readonly landModel: Model<ILandModel>) {
        this.landModel = landModel;
    }

    private stripTimestamps<T>(value: T): T {
        if (Array.isArray(value)) {
            return value.map((item) => this.stripTimestamps(item)) as T;
        }
        if (value && typeof value === "object") {
            const entries = Object.entries(value as Record<string, unknown>)
                .filter(([key]) => key !== "createdAt" && key !== "updatedAt" && key !== "__v")
                .map(([key, entry]) => [key, this.stripTimestamps(entry)]);
            return Object.fromEntries(entries) as T;
        }
        return value;
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

    async getLandFloorsOptions(lang: "ar" | "en") {
        const land = await this.landModel.findOne().select(`${lang}.floors`).lean<ILand | null>();
        const floors = land?.[lang]?.floors;
        if (!floors) {
            throw new ServerError("Land floors not found", 404);
        }
        const options = floors
            .map((floor, index) => ({
                id: `${index}`,
                title: floor.title ?? "",
            }))
            .filter((floor) => floor.title);
        return responseFormatter(200, "Land floors options fetched successfully", options);
    }

    async updateLandFloors(lang: "ar" | "en", payload: IFloor[]) {
        return this.updateSection<IFloor[]>(lang, "floors", payload, "Land floors not found", "Land floors updated successfully");
    }

    async getLandTestimonialsTitle(lang: "ar" | "en") {
        return this.getSection<string[]>(lang, "testimonialsTitle", "Land testimonials title not found", "Land testimonials title fetched successfully");
    }

    async updateLandTestimonialsTitle(lang: "ar" | "en", payload: string[]) {
        return this.updateSection<string[]>(lang, "testimonialsTitle", payload, "Land testimonials title not found", "Land testimonials title updated successfully");
    }

    async getLandServicesHeader(lang: "ar" | "en") {
        const land = await this.landModel.findOne().select(`${lang}.services.title ${lang}.services.description`).lean<ILand | null>();
        const services = land?.[lang]?.services;
        if (!services) {
            throw new ServerError("Land services header not found", 404);
        }
        return responseFormatter(200, "Land services header fetched successfully", {
            title: services.title ?? [],
            description: services.description ?? "",
        });
    }

    async updateLandServicesHeader(lang: "ar" | "en", payload: { title: string[]; description: string }) {
        const updatedLand = await this.landModel
            .findOneAndUpdate(
                {},
                { $set: { [`${lang}.services.title`]: payload.title, [`${lang}.services.description`]: payload.description } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(`${lang}.services.title ${lang}.services.description`)
            .lean<ILand | null>();
        const services = updatedLand?.[lang]?.services;
        if (!services) {
            throw new ServerError("Land services header not found", 404);
        }
        return responseFormatter(200, "Land services header updated successfully", {
            title: services.title ?? [],
            description: services.description ?? "",
        });
    }

    async getLandServicesBirthday(lang: "ar" | "en") {
        return this.getSection<IServiceBirthDayParty>(lang, "services.birthDayParty", "Land birthday service not found", "Land birthday service fetched successfully");
    }

    async updateLandServicesBirthday(lang: "ar" | "en", payload: IServiceBirthDayParty) {
        return this.updateSection<IServiceBirthDayParty>(lang, "services.birthDayParty", payload, "Land birthday service not found", "Land birthday service updated successfully");
    }

    async updateLandServicesBirthdayPrinceVisibility(lang: "ar" | "en", payload: { hidden: boolean }) {
        const updatedLand = await this.landModel
            .findOneAndUpdate(
                {},
                { $set: { [`${lang}.services.birthDayParty.packages.prince.hidden`]: payload.hidden } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(`${lang}.services.birthDayParty`)
            .lean<ILand | null>();

        const birthDayParty = updatedLand?.[lang]?.services?.birthDayParty;
        if (!birthDayParty) {
            throw new ServerError("Land birthday service not found", 404);
        }

        return responseFormatter(200, "Land birthday prince visibility updated successfully", birthDayParty);
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

    async getLandAll(lang: "ar" | "en") {
        const projection = {
            [lang]: 1,
            _id: 0,
        };
        const seoProjection = {
            [`${lang}.land`]: 1,
            _id: 0,
        };
        const testimonialsProjection = {
            [`${lang}.testimonials.cards`]: 1,
            _id: 0,
        };
        const footerProjection = {
            [lang]: 1,
            _id: 0,
        };
        const [land, seo, home, footer, brand] = await Promise.all([
            this.landModel.findOne().select(projection).lean<ILand | null>(),
            SeoModel.findOne().select(seoProjection).lean<ISeo | null>(),
            HomeModel.findOne().select(testimonialsProjection).lean<IHome | null>(),
            FooterModel.findOne().select(footerProjection).lean<IFooter | null>(),
            BrandModel.findOne().lean<IBrand | null>(),
        ]);
        const landData = land?.[lang];
        if (!landData) {
            throw new ServerError("Land not found", 404);
        }
        const testimonialsCards = home?.[lang]?.testimonials?.cards ?? [];
        const responseData = this.stripTimestamps({
            ...landData,
            testimonials: {
                title: landData.testimonialsTitle ?? [],
                cards: testimonialsCards,
            },
            footer: footer?.[lang] ?? null,
            seo: seo?.[lang]?.land ?? null,
            brand: brand ?? null,
        });
        return responseFormatter(200, "Land fetched successfully", responseData);
    }
}

export default new LandServices(LandModel);

