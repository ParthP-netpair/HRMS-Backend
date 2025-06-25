"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordCtl = exports.currentUserCtl = exports.changePasswordCtl = exports.loginCtl = void 0;
const auth_1 = require("../services/auth");
const loginCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_1.loginService)(req, res, next);
    return res.json(result);
});
exports.loginCtl = loginCtl;
const changePasswordCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_1.changePasswordService)(req, res, next);
    return res.json(result);
});
exports.changePasswordCtl = changePasswordCtl;
const currentUserCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_1.currentUserService)(req, res, next);
    return res.json(result);
});
exports.currentUserCtl = currentUserCtl;
const forgotPasswordCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_1.forgotPasswordService)(req, res, next);
    return res.json(result);
});
exports.forgotPasswordCtl = forgotPasswordCtl;
