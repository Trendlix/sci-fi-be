import { Model } from "mongoose";
import { ContactModel, IContactModel } from "../../models/contact/contact.model";
import { IContact, IContactBase } from "../../models/contact/types/model.types";
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