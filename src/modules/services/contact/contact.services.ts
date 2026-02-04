import { Model } from "mongoose";
import { ContactModel, IContactModel } from "../../models/contact/contact.model";
import { IContact, IContactBase } from "../../models/contact/types/model.types";
import { HomeModel } from "../../models/home/home.model";
import { IHome } from "../../models/home/types/model.types";
import { ServerError } from "../../../services/error.services";
import responseFormatter from "../../../services/format.services";

class ContactServices {
    constructor(private readonly contactModel: Model<IContactModel>) {
        this.contactModel = contactModel;
    }

    async getContact(lang: "ar" | "en") {
        const contact = await this.contactModel.findOne().select(lang).lean<IContact | null>();
        const contactBase = contact?.[lang];
        if (!contactBase) {
            throw new ServerError("Contact not found", 404);
        }
        return responseFormatter(200, "Contact fetched successfully", contactBase);
    }

    async getContactAll(lang: "ar" | "en") {
        const [contact, home] = await Promise.all([
            this.contactModel.findOne().select(lang).lean<IContact | null>(),
            HomeModel.findOne().select(`${lang}.locations`).lean<IHome | null>(),
        ]);
        const contactBase = contact?.[lang];
        if (!contactBase) {
            throw new ServerError("Contact not found", 404);
        }
        const locations = home?.[lang]?.locations ?? [];
        return responseFormatter(200, "Contact fetched successfully", {
            ...contactBase,
            locations,
        });
    }

    async patchContact(lang: "ar" | "en", contact: IContactBase) {
        const updatedContact = await this.contactModel
            .findOneAndUpdate(
                {},
                { $set: { [lang]: contact } },
                { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: false }
            )
            .select(lang)
            .lean<IContact | null>();
        const updatedContactBase = updatedContact?.[lang];
        if (!updatedContactBase) {
            throw new ServerError("Contact not found", 404);
        }
        return responseFormatter(200, "Contact updated successfully", updatedContactBase);
    }
}

export default new ContactServices(ContactModel);