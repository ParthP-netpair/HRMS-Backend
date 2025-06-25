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
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("../route"));
const route_enums_1 = require("../utils/route.enums");
const cors_1 = __importDefault(require("cors"));
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const app = (0, express_1.default)();
const corsOpts = {
    origin: '*',
};
app.use((0, cors_1.default)(corsOpts));
app.use(express_1.default.json());
const handleSyntaxErrors = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        const r = (0, responseWrapper_1.default)(false, err === null || err === void 0 ? void 0 : err.message, 400, null, err);
        return res.status(400).send(r);
    }
    next();
});
app.use(handleSyntaxErrors);
app.get('/api/ping', (req, res, next) => res.send('PONG'));
app.use(route_enums_1.COMMON_ROUTE.api, route_1.default);
const handleNotFound = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        method: req.method,
        url: req.url,
    };
    const r = (0, responseWrapper_1.default)(false, 'CHECK API ROUTE AND METHOD.', 404, null, data);
    return res.json(r);
});
app.use('/', handleNotFound);
exports.default = app;
