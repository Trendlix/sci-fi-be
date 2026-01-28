"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controllers_1 = require("../../controllers/admin/admin.controllers");
const admin_validation_schemas_1 = require("../../../shared/validation/admin/admin.validation.schemas");
const zod_util_1 = require("../../../shared/utils/zod.util");
const adminRouter = (0, express_1.Router)();
adminRouter.post("/account", (0, zod_util_1.zodValidator)(admin_validation_schemas_1.adminAccountValidationSchema), admin_controllers_1.adminController);
exports.default = adminRouter;
