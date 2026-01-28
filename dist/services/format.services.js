"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseFormatter = (status, message, data) => ({
    ok: status >= 200 && status < 300,
    status,
    message,
    data
});
exports.default = responseFormatter;
