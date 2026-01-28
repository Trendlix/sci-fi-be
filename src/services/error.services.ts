import type { NextFunction, Request, Response } from "express";

const CatchAsyncError = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    }
}

export class ServerError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}
export default CatchAsyncError;