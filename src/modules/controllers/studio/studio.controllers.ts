import type { Request, Response } from "express";
import CatchAsyncError from "../../../services/error.services";
import studioServices from "../../services/studio/studio.services";

export const getStudioHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await studioServices.getStudioHero(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const getStudioAboutController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await studioServices.getStudioAbout(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const getStudioPartnersController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await studioServices.getStudioPartners(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const getStudioWhyUsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await studioServices.getStudioWhyUs(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const getStudioAllController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await studioServices.getStudioAll(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateStudioHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await studioServices.updateStudioHero(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const updateStudioAboutController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await studioServices.updateStudioAbout(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const updateStudioPartnersController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await studioServices.updateStudioPartners(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const updateStudioWhyUsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await studioServices.updateStudioWhyUs(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

