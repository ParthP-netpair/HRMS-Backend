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
exports.providerDetailsForManageCt = exports.manageSearchProviderCtl = exports.providerDetailsCtl = exports.mainSearchProviderCtl = void 0;
const provider_1 = require("../services/provider");
const mainSearchProviderCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, provider_1.mainSearchProviderService)(req, res, next);
    return res.json(result);
});
exports.mainSearchProviderCtl = mainSearchProviderCtl;
const providerDetailsCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, provider_1.providerDetailsService)(req, res, next);
    return res.json(result);
});
exports.providerDetailsCtl = providerDetailsCtl;
const manageSearchProviderCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, provider_1.manageSearchProviderService)(req, res, next);
    return res.json(result);
});
exports.manageSearchProviderCtl = manageSearchProviderCtl;
const providerDetailsForManageCt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, provider_1.providerDetailsForManageService)(req, res, next);
    return res.json(result);
});
exports.providerDetailsForManageCt = providerDetailsForManageCt;
