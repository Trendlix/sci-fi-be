"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_model_1 = require("../../models/contact/contact.model");
const home_model_1 = require("../../models/home/home.model");
const footer_model_1 = require("../../models/footer/footer.model");
const seo_model_1 = require("../../models/seo/seo.model");
const brand_model_1 = __importDefault(require("../../models/brand/brand.model"));
const error_services_1 = require("../../../services/error.services");
const format_services_1 = __importDefault(require("../../../services/format.services"));
class ContactServices {
    constructor(contactModel) {
        this.contactModel = contactModel;
        this.contactModel = contactModel;
    }
    async getContact(lang) {
        const contact = await this.contactModel.findOne().select(lang).lean();
        const contactBase = contact?.[lang];
        if (!contactBase) {
            throw new error_services_1.ServerError("Contact not found", 404);
        }
        return (0, format_services_1.default)(200, "Contact fetched successfully", contactBase);
    }
    async getContactAll(lang) {
        const seoProjection = {
            [`${lang}.contact`]: 1,
            _id: 0,
        };
        const footerProjection = {
            [lang]: 1,
            _id: 0,
        };
        const [contact, home, seo, footer, brand] = await Promise.all([
            this.contactModel.findOne().select(lang).lean(),
            home_model_1.HomeModel.findOne().select(`${lang}.locations`).lean(),
            seo_model_1.SeoModel.findOne().select(seoProjection).lean(),
            footer_model_1.FooterModel.findOne().select(footerProjection).lean(),
            brand_model_1.default.findOne().lean(),
        ]);
        const contactBase = contact?.[lang];
        if (!contactBase) {
            throw new error_services_1.ServerError("Contact not found", 404);
        }
        const locations = home?.[lang]?.locations ?? null;
        return (0, format_services_1.default)(200, "Contact fetched successfully", {
            ...contactBase,
            locations,
            footer: footer?.[lang] ?? null,
            seo: seo?.[lang]?.contact ?? null,
            brand: brand ?? null,
        });
    }
    async patchContact(lang, contact) {
        const normalizedCards = (contact.getInTouch?.cards ?? [])
            .map((card) => ({
            ...card,
            lines: (card.lines ?? []).map((line) => line.trim()).filter(Boolean),
        }))
            .filter((card) => card.lines.length > 0);
        const normalizedContact = {
            ...contact,
            hero: {
                ...contact.hero,
                description: contact.hero?.description?.trim?.() ?? contact.hero?.description,
            },
            getInTouch: {
                ...contact.getInTouch,
                description: contact.getInTouch?.description?.trim?.() ?? contact.getInTouch?.description,
                cards: normalizedCards,
            },
        };
        const updatedContact = await this.contactModel
            .findOneAndUpdate({}, { $set: { [lang]: normalizedContact } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
            .select(lang)
            .lean();
        const updatedContactBase = updatedContact?.[lang];
        if (!updatedContactBase) {
            throw new error_services_1.ServerError("Contact not found", 404);
        }
        return (0, format_services_1.default)(200, "Contact updated successfully", updatedContactBase);
    }
}
exports.default = new ContactServices(contact_model_1.ContactModel);
