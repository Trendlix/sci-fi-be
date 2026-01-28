"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const v1_router_1 = __importDefault(require("./routers/v1.router"));
const format_services_1 = __importDefault(require("./services/format.services"));
const error_services_1 = require("./services/error.services");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "TypeScript + Express is working 🚀" });
});
app.use("/api/v1", v1_router_1.default);
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const status = err instanceof error_services_1.ServerError ? err.status : 500;
    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(status).json((0, format_services_1.default)(status, message));
});
exports.default = app;
