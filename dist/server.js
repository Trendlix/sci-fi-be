"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./db/connection"));
const env_1 = __importDefault(require("./shared/config/env"));
(0, connection_1.default)().then(() => {
    app_1.default.listen(env_1.default.port, () => {
        console.log(`Server running on http://localhost:${env_1.default.port}`);
    });
});
