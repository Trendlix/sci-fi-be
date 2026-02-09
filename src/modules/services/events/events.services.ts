import { Model } from "mongoose";
import { EventModel, IEventModel } from "../../models/events/events.model";
import { IEvent, IEventBase } from "../../models/events/types/model.types";
import { SeoModel } from "../../models/seo/seo.model";
import { ISeo } from "../../models/seo/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class EventServices {
    constructor(private readonly eventModel: Model<IEventModel>) {
        this.eventModel = eventModel;
    }

    private async getSection<T extends keyof IEventBase>(
        lang: "ar" | "en",
        section: T,
        message: string
    ) {
        const event = await this.eventModel.findOne().select(`${lang}.${section}`).lean<IEvent | null>();
        const data = event?.[lang]?.[section];
        if (!data) {
            throw new ServerError("Event not found", 404);
        }
        return responseFormatter(200, message, data);
    }

    private async patchSection<T extends keyof IEventBase>(
        lang: "ar" | "en",
        section: T,
        payload: IEventBase[T],
        message: string
    ) {
        const updatedEvent = await this.eventModel
            .findOneAndUpdate(
                {},
                { $set: { [`${lang}.${section}`]: payload } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(`${lang}.${section}`)
            .lean<IEvent | null>();
        const updatedSection = updatedEvent?.[lang]?.[section];
        if (!updatedSection) {
            throw new ServerError("Event not found", 404);
        }
        return responseFormatter(200, message, updatedSection);
    }

    async getHero(lang: "ar" | "en") {
        return this.getSection(lang, "hero", "Event hero fetched successfully");
    }

    async patchHero(lang: "ar" | "en", payload: IEventBase["hero"]) {
        return this.patchSection(lang, "hero", payload, "Event hero updated successfully");
    }

    async getAbout(lang: "ar" | "en") {
        return this.getSection(lang, "about", "Event about fetched successfully");
    }

    async patchAbout(lang: "ar" | "en", payload: IEventBase["about"]) {
        return this.patchSection(lang, "about", payload, "Event about updated successfully");
    }

    async getPartners(lang: "ar" | "en") {
        return this.getSection(lang, "partners", "Event partners fetched successfully");
    }

    async patchPartners(lang: "ar" | "en", payload: IEventBase["partners"]) {
        return this.patchSection(lang, "partners", payload, "Event partners updated successfully");
    }

    async getProgram(lang: "ar" | "en") {
        return this.getSection(lang, "program", "Event program fetched successfully");
    }

    async patchProgram(lang: "ar" | "en", payload: IEventBase["program"]) {
        return this.patchSection(lang, "program", payload, "Event program updated successfully");
    }

    async getNewsLetter(lang: "ar" | "en") {
        return this.getSection(lang, "newsLetter", "Event newsletter fetched successfully");
    }

    async patchNewsLetter(lang: "ar" | "en", payload: IEventBase["newsLetter"]) {
        return this.patchSection(lang, "newsLetter", payload, "Event newsletter updated successfully");
    }

    async getHow(lang: "ar" | "en") {
        return this.getSection(lang, "how", "Event how fetched successfully");
    }

    async patchHow(lang: "ar" | "en", payload: IEventBase["how"]) {
        return this.patchSection(lang, "how", payload, "Event how updated successfully");
    }

    async getReady(lang: "ar" | "en") {
        return this.getSection(lang, "ready", "Event ready fetched successfully");
    }

    async patchReady(lang: "ar" | "en", payload: IEventBase["ready"]) {
        return this.patchSection(lang, "ready", payload, "Event ready updated successfully");
    }

    async getFeatured(lang: "ar" | "en") {
        return this.getSection(lang, "featured", "Event featured fetched successfully");
    }

    async patchFeatured(lang: "ar" | "en", payload: IEventBase["featured"]) {
        return this.patchSection(lang, "featured", payload, "Event featured updated successfully");
    }

    async getUpcoming(lang: "ar" | "en") {
        return this.getSection(lang, "upcoming", "Event upcoming fetched successfully");
    }

    async patchUpcoming(lang: "ar" | "en", payload: IEventBase["upcoming"]) {
        return this.patchSection(lang, "upcoming", payload, "Event upcoming updated successfully");
    }

    async getUpcomingTypes(lang: "ar" | "en") {
        const event = await this.eventModel.findOne().select(`${lang}.upcoming.type`).lean<IEvent | null>();
        const upcoming = event?.[lang]?.upcoming ?? [];
        const types = Array.from(new Set(upcoming.map((card) => card.type).filter(Boolean)));
        return responseFormatter(200, "Event upcoming types fetched successfully", types);
    }

    async getEventAll(lang: "ar" | "en") {
        const projection = {
            [`${lang}.hero`]: 1,
            [`${lang}.about`]: 1,
            [`${lang}.partners`]: 1,
            [`${lang}.program`]: 1,
            [`${lang}.newsLetter`]: 1,
            [`${lang}.how`]: 1,
            [`${lang}.ready`]: 1,
            [`${lang}.featured`]: 1,
            [`${lang}.upcoming`]: 1,
            _id: 0,
        };
        const seoProjection = {
            [`${lang}.events`]: 1,
            _id: 0,
        };
        const [event, seo] = await Promise.all([
            this.eventModel.findOne().select(projection).lean<IEvent | null>(),
            SeoModel.findOne().select(seoProjection).lean<ISeo | null>(),
        ]);
        const eventData = event?.[lang];
        if (!eventData) {
            throw new ServerError("Event not found", 404);
        }
        return responseFormatter(200, "Event fetched successfully", {
            ...eventData,
            seo: seo?.[lang]?.events ?? null,
        });
    }
}

export default new EventServices(EventModel);

