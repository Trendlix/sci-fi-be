import type { Request, Response } from "express";
import CatchAsyncError from "../../../services/error.services";
import eventServices from "../../services/events/events.services";

export const getEventHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getHero(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateEventHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.patchHero(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getEventAboutController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getAbout(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateEventAboutController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.patchAbout(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getEventPartnersController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getPartners(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateEventPartnersController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.patchPartners(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getEventProgramController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getProgram(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateEventProgramController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.patchProgram(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getEventNewsLetterController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getNewsLetter(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateEventNewsLetterController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.patchNewsLetter(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getEventHowController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getHow(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateEventHowController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.patchHow(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getEventReadyController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getReady(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateEventReadyController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.patchReady(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getEventFeaturedController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getFeatured(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateEventFeaturedController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.patchFeatured(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getEventUpcomingController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getUpcoming(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const getEventUpcomingTypesController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getUpcomingTypes(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateEventUpcomingController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.patchUpcoming(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getEventAllController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await eventServices.getEventAll(req.lang ?? "en");
    res.status(response.status).json(response);
});

