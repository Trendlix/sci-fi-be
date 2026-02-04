import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../../services/error.services";

export const CachingMiddleware = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
    next();
})