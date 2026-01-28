"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodCompoValidator = exports.zodValidator = void 0;
const error_services_1 = __importDefault(require("../../services/error.services"));
const zodValidator = (schema) => {
    return (0, error_services_1.default)(async (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = zodErrorMessagesFormatter(result.error.issues);
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Validation Error",
                errors,
            });
        }
        req.body = result.data;
        next();
    });
};
exports.zodValidator = zodValidator;
const zodCompoValidator = (schemas) => {
    return (0, error_services_1.default)(async (req, res, next) => {
        const errors = [];
        if (schemas.headers) {
            const result = schemas.headers.safeParse(req.headers);
            if (!result.success)
                errors.push(...result.error.issues);
            else
                req.headers = result.data;
        }
        if (schemas.params) {
            const result = schemas.params.safeParse(req.params);
            if (!result.success)
                errors.push(...result.error.issues);
            else
                req.params = result.data;
        }
        if (schemas.query) {
            const result = schemas.query.safeParse(req.query);
            if (!result.success)
                errors.push(...result.error.issues);
            else
                req.query = result.data;
        }
        if (schemas.body) {
            const result = schemas.body.safeParse(req.body);
            if (!result.success)
                errors.push(...result.error.issues);
            else
                req.body = result.data;
        }
        if (errors.length > 0) {
            const formatted = zodErrorMessagesFormatter(errors);
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Validation Error",
                errors: formatted,
            });
        }
        next();
    });
};
exports.zodCompoValidator = zodCompoValidator;
const zodErrorMessagesFormatter = (zodErrors) => {
    return zodErrors.map((err) => {
        const pathString = err.path.map(String).join(".");
        return pathString ? `${pathString}: ${err.message}` : err.message;
    });
};
