import { Model } from "mongoose";
import { HomeModel, IHomeModel } from "../../models/home/home.model";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";
import { IAbout, IHero, IHorizontal, ILocation, ITestimonial, IHome, IHomeBase } from "../../models/home/types/model.types";

class HomeServices {
    constructor(private readonly homeModel: Model<IHomeModel>) {
        this.homeModel = homeModel;
    }

    async getHomeHero(lang: "ar" | "en") {
        const home = await this.homeModel.findOne().select(`${lang}.hero`).lean<IHome | null>();
        const hero = home?.[lang]?.hero;
        if (!hero) {
            throw new ServerError("Home hero not found", 404);
        }
        return responseFormatter(200, "Home hero fetched successfully", hero);
    }

    async getHomeAbout(lang: "ar" | "en") {
        const home = await this.homeModel.findOne().select(`${lang}.about`).lean<IHome | null>();
        const about = home?.[lang]?.about;
        if (!about) {
            throw new ServerError("Home about not found", 404);
        }
        return responseFormatter(200, "Home about fetched successfully", about);
    }

    async getHomeHorizontal(lang: "ar" | "en") {
        const home = await this.homeModel.findOne().select(`${lang}.horizontal`).lean<IHome | null>();
        const horizontal = home?.[lang]?.horizontal;
        if (!horizontal) {
            throw new ServerError("Home horizontal not found", 404);
        }
        return responseFormatter(200, "Home horizontal fetched successfully", horizontal);
    }

    async getHomeTestimonials(lang: "ar" | "en") {
        const home = await this.homeModel.findOne().select(`${lang}.testimonials`).lean<IHome | null>();
        const testimonials = home?.[lang]?.testimonials;
        if (!testimonials) {
            throw new ServerError("Home testimonials not found", 404);
        }
        return responseFormatter(200, "Home testimonials fetched successfully", testimonials);
    }

    async getHomeLocations(lang: "ar" | "en") {
        const home = await this.homeModel.findOne().select(`${lang}.locations`).lean<IHome | null>();
        const locations = home?.[lang]?.locations;
        if (!locations) {
            throw new ServerError("Home locations not found", 404);
        }
        return responseFormatter(200, "Home locations fetched successfully", locations);
    }

    private buildEmptyHomeBase(): IHomeBase {
        return {
            hero: {
                title: ["", "", "", "", "", ""],
                description: "..........",
            },
            about: {
                description: ["", "", "", "", ""],
            },
            horizontal: [],
            testimonials: [],
            locations: [],
        };
    }

    private buildEmptyHomeDocument(): IHome {
        return {
            ar: this.buildEmptyHomeBase(),
            en: this.buildEmptyHomeBase(),
        };
    }

    private async ensureHomeDocument(): Promise<void> {
        const existing = await this.homeModel.findOne().select("_id").lean();
        if (existing) {
            return;
        }
        await this.homeModel.create(this.buildEmptyHomeDocument());
    }

    async updateHomeHero(lang: "ar" | "en", hero: IHero) {
        await this.ensureHomeDocument();
        const updatedHome = await this.homeModel.findOneAndUpdate(
            {},
            { $set: { [`${lang}.hero`]: hero } },
            { new: true }
        )
            .select(`${lang}.hero`)
            .lean<IHome | null>();
        const updatedHero = updatedHome?.[lang]?.hero;
        if (!updatedHero) {
            throw new ServerError("Home hero not found", 404);
        }
        return responseFormatter(200, "Home hero updated successfully", updatedHero);
    }

    async updateHomeAbout(lang: "ar" | "en", about: IAbout) {
        await this.ensureHomeDocument();
        const updatedHome = await this.homeModel.findOneAndUpdate(
            {},
            { $set: { [`${lang}.about`]: about } },
            { new: true }
        )
            .select(`${lang}.about`)
            .lean<IHome | null>();
        const updatedAbout = updatedHome?.[lang]?.about;
        if (!updatedAbout) {
            throw new ServerError("Home about not found", 404);
        }
        return responseFormatter(200, "Home about updated successfully", updatedAbout);
    }

    async updateHomeHorizontal(lang: "ar" | "en", horizontal: IHorizontal[]) {
        await this.ensureHomeDocument();
        const updatedHome = await this.homeModel.findOneAndUpdate(
            {},
            { $set: { [`${lang}.horizontal`]: horizontal } },
            { new: true }
        )
            .select(`${lang}.horizontal`)
            .lean<IHome | null>();
        const updatedHorizontal = updatedHome?.[lang]?.horizontal;
        if (!updatedHorizontal) {
            throw new ServerError("Home horizontal not found", 404);
        }
        return responseFormatter(200, "Home horizontal updated successfully", updatedHorizontal);
    }

    async updateHomeTestimonials(lang: "ar" | "en", testimonials: ITestimonial[]) {
        await this.ensureHomeDocument();
        const updatedHome = await this.homeModel.findOneAndUpdate(
            {},
            { $set: { [`${lang}.testimonials`]: testimonials } },
            { new: true }
        )
            .select(`${lang}.testimonials`)
            .lean<IHome | null>();
        const updatedTestimonials = updatedHome?.[lang]?.testimonials;
        if (!updatedTestimonials) {
            throw new ServerError("Home testimonials not found", 404);
        }
        return responseFormatter(200, "Home testimonials updated successfully", updatedTestimonials);
    }

    async updateHomeLocations(lang: "ar" | "en", locations: ILocation[]) {
        await this.ensureHomeDocument();
        const updatedHome = await this.homeModel.findOneAndUpdate(
            {},
            { $set: { [`${lang}.locations`]: locations } },
            { new: true }
        )
            .select(`${lang}.locations`)
            .lean<IHome | null>();
        const updatedLocations = updatedHome?.[lang]?.locations;
        if (!updatedLocations) {
            throw new ServerError("Home locations not found", 404);
        }
        return responseFormatter(200, "Home locations updated successfully", updatedLocations);
    }
}

export default new HomeServices(HomeModel);