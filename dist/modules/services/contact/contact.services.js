"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_model_1 = require("../../models/contact/contact.model");
const home_model_1 = require("../../models/home/home.model");
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
        const [contact, home] = await Promise.all([
            this.contactModel.findOne().select(lang).lean(),
            home_model_1.HomeModel.findOne().select(`${lang}.locations`).lean(),
        ]);
        const contactBase = contact?.[lang];
        if (!contactBase) {
            throw new error_services_1.ServerError("Contact not found", 404);
        }
        const locations = home?.[lang]?.locations ?? [];
        return (0, format_services_1.default)(200, "Contact fetched successfully", {
            ...contactBase,
            locations,
        });
    }
    async patchContact(lang, contact) {
        const updatedContact = await this.contactModel
            .findOneAndUpdate({}, { $set: { [lang]: contact } }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false })
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
