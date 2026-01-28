import type { ZodSchema, ZodIssue } from "zod";
import type { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../../services/error.services";

type ZodSchemas = {
    headers?: ZodSchema<any>;
    params?: ZodSchema<any>;
    query?: ZodSchema<any>;
    body?: ZodSchema<any>;
};

const zodValidator = (schema: ZodSchema<any>) => {
    return CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
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

const zodCompoValidator = (schemas: ZodSchemas) => {
    return CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const errors: ZodIssue[] = [];

        if (schemas.headers) {
            const result = schemas.headers.safeParse(req.headers);
            if (!result.success) errors.push(...result.error.issues);
            else req.headers = result.data;
        }

        if (schemas.params) {
            const result = schemas.params.safeParse(req.params);
            if (!result.success) errors.push(...result.error.issues);
            else req.params = result.data;
        }

        if (schemas.query) {
            const result = schemas.query.safeParse(req.query);
            if (!result.success) errors.push(...result.error.issues);
            else req.query = result.data;
        }

        if (schemas.body) {
            const result = schemas.body.safeParse(req.body);
            if (!result.success) errors.push(...result.error.issues);
            else req.body = result.data;
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

const zodErrorMessagesFormatter = (zodErrors: ZodIssue[]): string[] => {
    return zodErrors.map((err) => {
        const pathString = err.path.map(String).join(".");
        return pathString ? `${pathString}: ${err.message}` : err.message;
    });
};

export { zodValidator, zodCompoValidator };
