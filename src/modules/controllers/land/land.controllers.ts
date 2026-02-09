import type { Request, Response } from "express";
import CatchAsyncError from "../../../services/error.services";
import landServices from "../../services/land/land.services";

export const getLandHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.getLandHero(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateLandHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.updateLandHero(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getLandDiscoverFloorsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.getLandDiscoverFloors(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateLandDiscoverFloorsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.updateLandDiscoverFloors(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getLandFloorsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.getLandFloors(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const getLandFloorsOptionsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.getLandFloorsOptions(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateLandFloorsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.updateLandFloors(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getLandTestimonialsTitleController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.getLandTestimonialsTitle(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateLandTestimonialsTitleController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.updateLandTestimonialsTitle(req.lang ?? "en", req.body.title);
    res.status(response.status).json(response);
});

export const getLandServicesHeaderController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.getLandServicesHeader(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateLandServicesHeaderController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.updateLandServicesHeader(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getLandServicesBirthdayController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.getLandServicesBirthday(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateLandServicesBirthdayController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.updateLandServicesBirthday(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getLandServicesMembershipController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.getLandServicesMembership(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateLandServicesMembershipController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.updateLandServicesMembership(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getLandServicesSchoolNurseryController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.getLandServicesSchoolNursery(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateLandServicesSchoolNurseryController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.updateLandServicesSchoolNursery(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

export const getLandServicesWalkinController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.getLandServicesWalkin(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateLandServicesWalkinController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await landServices.updateLandServicesWalkin(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

