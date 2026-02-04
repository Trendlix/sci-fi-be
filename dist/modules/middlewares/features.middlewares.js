"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachingMiddleware = void 0;
const error_services_1 = __importDefault(require("../../services/error.services"));
exports.CachingMiddleware = (0, error_services_1.default)(async (req, res, next) => {
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
    next();
});
