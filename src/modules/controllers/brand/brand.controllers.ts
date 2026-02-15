import type { Request, Response } from "express";
import CatchAsyncError from "../../../services/error.services";
import brandServices from "../../services/brand/brand.services";

export const getBrandController = CatchAsyncError(async (_req: Request, res: Response) => {
    const response = await brandServices.getBrand();
    res.status(response.status).json(response);
});

export const patchBrandController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await brandServices.patchBrand(req.body);
    res.status(response.status).json(response);
});

