"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchContactController = exports.getContactController = void 0;
const error_services_1 = __importDefault(require("../../../services/error.services"));
const contact_services_1 = __importDefault(require("../../services/contact/contact.services"));
exports.getContactController = (0, error_services_1.default)(async (req, res) => {
    const response = await contact_services_1.default.getContact(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.patchContactController = (0, error_services_1.default)(async (req, res) => {
    const response = await contact_services_1.default.patchContact(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
