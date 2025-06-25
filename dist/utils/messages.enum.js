"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_MESSAGE = void 0;
var COMMON_MESSAGE;
(function (COMMON_MESSAGE) {
    COMMON_MESSAGE["Success"] = "Success";
    COMMON_MESSAGE["Error"] = "Something went wrong.";
    COMMON_MESSAGE["Unauthorized"] = "Unauthorized access detected.";
    COMMON_MESSAGE["SessionExpired"] = "Session expired, please login again.";
    COMMON_MESSAGE["NotFound"] = "{param} not found.";
    COMMON_MESSAGE["AlreadyExist"] = "{param} already exists.";
    COMMON_MESSAGE["InvalidPassword"] = "Invalid password.";
    COMMON_MESSAGE["InvalidToken"] = "Invalid link.";
    COMMON_MESSAGE["TokenExpired"] = "Link expired.";
    COMMON_MESSAGE["PasswordExpired"] = "Password expired, please reset it.";
    COMMON_MESSAGE["NotFoundWoParam"] = "Not found.";
})(COMMON_MESSAGE || (exports.COMMON_MESSAGE = COMMON_MESSAGE = {}));
