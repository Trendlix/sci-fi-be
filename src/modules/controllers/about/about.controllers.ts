import type { Request, Response } from "express";
import CatchAsyncError from "../../../services/error.services";
import aboutServices from "../../services/about/about.services";

export const getAboutController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.getAbout(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const patchAboutController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.patchAbout(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

