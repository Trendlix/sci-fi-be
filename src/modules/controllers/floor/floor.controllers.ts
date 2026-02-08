import type { Request, Response } from "express";
import mongoose from "mongoose";
import CatchAsyncError, { ServerError } from "../../../services/error.services";
import floorServices from "../../services/floor/floor.services";

const resolveFloorLookup = (floorId?: string, floorIndex?: string, floorTitle?: string) => {
    if (floorId && mongoose.Types.ObjectId.isValid(floorId)) {
        return { floorId };
    }
    const normalizedIndex = typeof floorIndex === "string" && floorIndex.trim() !== ""
        ? Number.parseInt(floorIndex, 10)
        : Number.NaN;
    if (Number.isFinite(normalizedIndex)) {
        return { floorIndex: normalizedIndex, floorTitle: floorTitle?.trim() };
    }
    if (floorId && /^\d+$/.test(floorId)) {
        return { floorIndex: Number.parseInt(floorId, 10), floorTitle: floorTitle?.trim() };
    }
    throw new ServerError("Floor id is invalid", 400);
};

export const getFloorHeaderController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.getFloorHeader(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const updateFloorHeaderController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.updateFloorHeader(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const getFloorHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.getFloorHero(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const updateFloorHeroController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.updateFloorHero(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const getFloorFeaturesController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.getFloorFeatures(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const updateFloorFeaturesController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.updateFloorFeatures(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const getFloorServicesController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.getFloorServices(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const updateFloorServicesController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.updateFloorServices(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const updateFloorServicesHiddenController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.updateFloorServicesHidden(
        req.lang ?? "en",
        req.body.hidden,
        floorId,
        floorIndex,
        floorTitle
    );
    res.status(response.status).json(response);
});

export const getFloorGroundsController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.getFloorGrounds(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const updateFloorGroundsController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.updateFloorGrounds(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const updateFloorGroundsHiddenController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.updateFloorGroundsHidden(
        req.lang ?? "en",
        req.body.hidden,
        floorId,
        floorIndex,
        floorTitle
    );
    res.status(response.status).json(response);
});

export const getFloorSliderController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.getFloorSlider(req.lang ?? "en", floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

export const getFloorOptionsController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await floorServices.getFloorOptions(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const updateFloorSliderController = CatchAsyncError(async (req: Request, res: Response) => {
    const { floorId, floorIndex, floorTitle } = resolveFloorLookup(
        req.query.floorId as string | undefined,
        req.query.floorIndex as string | undefined,
        req.query.floorTitle as string | undefined
    );
    const response = await floorServices.updateFloorSlider(req.lang ?? "en", req.body, floorId, floorIndex, floorTitle);
    res.status(response.status).json(response);
});

