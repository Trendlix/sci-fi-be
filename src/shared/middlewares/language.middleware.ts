import type { Request, Response, NextFunction } from "express";
import CatchAsyncError, { ServerError } from "../../services/error.services";

const allowedLanguages = ["ar", "en"] as const;
export type Language = (typeof allowedLanguages)[number];

const normalizeLang = (value?: string): Language | undefined => {
    if (!value) return undefined;
    const normalized = value.toLowerCase();
    return (allowedLanguages as readonly string[]).includes(normalized)
        ? (normalized as Language)
        : undefined;
};

export const languageMiddleware = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const candidate =
        (typeof req.query.lang === "string" ? req.query.lang : undefined) ??
        (typeof req.body?.lang === "string" ? req.body.lang : undefined) ??
        (typeof req.headers["x-lang"] === "string" ? req.headers["x-lang"] : undefined);

    const lang = normalizeLang(candidate);
    const isWriteMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);

    if (!lang) {
        if (isWriteMethod) {
            throw new ServerError("Language is required (ar or en)", 400);
        }
        req.lang = "en";
        return next();
    }

    req.lang = lang;
    if (req.body && typeof req.body === "object" && "lang" in req.body) {
        delete (req.body as Record<string, unknown>).lang;
    }
    next();
});

