import type { Request, Response } from "express";
import CatchAsyncError from "../../../services/error.services";
import footerServices from "../../services/footer/footer.services";

export const getFooterController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await footerServices.getFooter(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const patchFooterController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await footerServices.patchFooter(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

