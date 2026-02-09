"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchFooterController = exports.getFooterController = void 0;
const error_services_1 = __importDefault(require("../../../services/error.services"));
const footer_services_1 = __importDefault(require("../../services/footer/footer.services"));
exports.getFooterController = (0, error_services_1.default)(async (req, res) => {
    const response = await footer_services_1.default.getFooter(req.lang ?? "en");
    res.status(response.status).json(response);
});
exports.patchFooterController = (0, error_services_1.default)(async (req, res) => {
    const response = await footer_services_1.default.patchFooter(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});
