"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageMiddleware = void 0;
const error_services_1 = __importStar(require("../../services/error.services"));
const allowedLanguages = ["ar", "en"];
const normalizeLang = (value) => {
    if (!value)
        return undefined;
    const normalized = value.toLowerCase();
    return allowedLanguages.includes(normalized)
        ? normalized
        : undefined;
};
exports.languageMiddleware = (0, error_services_1.default)(async (req, res, next) => {
    const candidate = (typeof req.query.lang === "string" ? req.query.lang : undefined) ??
        (typeof req.body?.lang === "string" ? req.body.lang : undefined) ??
        (typeof req.headers["x-lang"] === "string" ? req.headers["x-lang"] : undefined);
    const lang = normalizeLang(candidate);
    const isWriteMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);
    if (!lang) {
        if (isWriteMethod) {
            throw new error_services_1.ServerError("Language is required (ar or en)", 400);
        }
        req.lang = "en";
        return next();
    }
    req.lang = lang;
    if (req.body && typeof req.body === "object" && "lang" in req.body) {
        delete req.body.lang;
    }
    next();
});
