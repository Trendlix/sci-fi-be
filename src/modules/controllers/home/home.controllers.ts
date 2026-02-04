import type { Request, Response } from "express";
import CatchAsyncError from "../../../services/error.services";
import homeServices from "../../services/home/home.services";

export const getHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.getHomeHero(req.lang ?? "en");
    res.status(response.status).json(response);
})

export const getAboutController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.getHomeAbout(req.lang ?? "en");
    res.status(response.status).json(response);
})

export const getHomeHorizontalController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.getHomeHorizontal(req.lang ?? "en");
    res.status(response.status).json(response);
})

export const getHomeTestimonialsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.getHomeTestimonials(req.lang ?? "en");
    res.status(response.status).json(response);
})

export const getHomeLocationsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.getHomeLocations(req.lang ?? "en");
    res.status(response.status).json(response);
})

export const updateHomeHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.updateHomeHero(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
})

export const updateHomeAboutController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.updateHomeAbout(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
})

export const updateHomeHorizontalController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.updateHomeHorizontal(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
})

export const updateHomeTestimonialsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.updateHomeTestimonials(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
})

export const updateHomeLocationsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.updateHomeLocations(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
})  

export const getHomeAllController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await homeServices.getHomeAll(req.lang ?? "en");
    res.status(response.status).json(response);
})