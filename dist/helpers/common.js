"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncDelay = void 0;
const env_config_1 = __importDefault(require("../config/env.config"));
const asyncDelay = (ms) => {
    const d = ms ? ms : Number((0, env_config_1.default)('TICKET_UPDATE_DELAY'));
    return new Promise(resolve => setTimeout(resolve, d));
};
exports.asyncDelay = asyncDelay;
