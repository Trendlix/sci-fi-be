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

export const getAboutAllController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.getAboutAll(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const getAboutHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.getHero(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const patchAboutHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.patchHero(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getAboutSectionController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.getAboutSection(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const patchAboutSectionController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.patchAboutSection(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getAboutServiceController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.getService(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const patchAboutServiceController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.patchService(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getAboutPreValueController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.getPreValue(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const patchAboutPreValueController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.patchPreValue(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getAboutValueController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.getValue(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const patchAboutValueController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await aboutServices.patchValue(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

