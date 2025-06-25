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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicketService = exports.createTicketService = exports.getTicketService = void 0;
const axiosRequest_1 = __importDefault(require("../helpers/axiosRequest"));
const env_config_1 = __importDefault(require("../config/env.config"));
const freshdeskUrl = (0, env_config_1.default)('FRESHDESK_URL');
const freshdeskEndpoints = {
    getTicket: freshdeskUrl + '/api/v2/tickets/',
    createTicket: freshdeskUrl + '/api/v2/tickets/',
    updateTicket: freshdeskUrl + '/api/v2/tickets/',
};
const freshdeskUsername = (0, env_config_1.default)('FRESHDESK_USERNAME');
const freshdeskPassword = (0, env_config_1.default)('FRESHDESK_PASSWORD');
const authEncoded = btoa(`${freshdeskUsername}:${freshdeskPassword}`);
const headers = {
    Authorization: `Basic ${authEncoded}`,
    'Content-Type': 'application/json',
};
const getTicketService = (ticketId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, axiosRequest_1.default)({
        method: 'get',
        url: `${freshdeskEndpoints.getTicket}${ticketId}`,
        headers,
    });
    return response;
});
exports.getTicketService = getTicketService;
const createTicketService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, axiosRequest_1.default)({
        method: 'post',
        url: freshdeskEndpoints.createTicket,
        headers,
        data: payload,
    });
    return response;
});
exports.createTicketService = createTicketService;
const updateTicketService = (ticketId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, axiosRequest_1.default)({
        method: 'put',
        url: `${freshdeskEndpoints.updateTicket}${ticketId}`,
        headers,
        data: payload,
    });
    return response;
});
exports.updateTicketService = updateTicketService;
