"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const CatchAsyncError = (fn) => {
    return (req, res, next) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
};
class ServerError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.ServerError = ServerError;
exports.default = CatchAsyncError;
