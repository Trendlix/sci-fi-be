import type { Request, Response } from "express";
import CatchAsyncError from "../../../services/error.services";
import seoServices from "../../services/seo/seo.services";

export const getSeoController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await seoServices.getSeo(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const patchSeoController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await seoServices.patchSeo(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

