"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const route_enums_1 = require("../utils/route.enums");
const auth_2 = __importDefault(require("../middleware/auth"));
const authRoute = express_1.default.Router();
authRoute.post(route_enums_1.AUTH_ROUTE.login, auth_1.loginCtl);
authRoute.post(route_enums_1.AUTH_ROUTE.forgotPassword, auth_1.forgotPasswordCtl);
authRoute.post(route_enums_1.AUTH_ROUTE.resetPassword, auth_1.changePasswordCtl);
authRoute.post(route_enums_1.AUTH_ROUTE.currentUser, auth_2.default, auth_1.currentUserCtl);
exports.default = authRoute;
