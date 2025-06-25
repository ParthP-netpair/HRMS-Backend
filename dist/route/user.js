"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const schemaValidator_1 = __importDefault(require("../middleware/schemaValidator"));
const user_2 = require("../model/user");
const route_enums_1 = require("../utils/route.enums");
const userRoute = express_1.default.Router();
userRoute.post(route_enums_1.USER_ROUTE.create, (0, schemaValidator_1.default)(user_2.schemaValidation), user_1.createUser);
exports.default = userRoute;
