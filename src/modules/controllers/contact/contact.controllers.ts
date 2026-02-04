import type { Request, Response } from "express";
import CatchAsyncError from "../../../services/error.services";
import contactServices from "../../services/contact/contact.services";

export const getContactController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await contactServices.getContact(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const getContactAllController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await contactServices.getContactAll(req.lang ?? "en");
    res.status(response.status).json(response);
});

export const patchContactController = CatchAsyncError(async (req: Request, res: Response) => {
    const response = await contactServices.patchContact(req.lang ?? "en", req.body);
    res.status(response.status).json(response);
});

