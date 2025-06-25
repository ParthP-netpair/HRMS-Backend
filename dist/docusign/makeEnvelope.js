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
const path_1 = __importDefault(require("path"));
const docusign_esign_1 = __importDefault(require("docusign-esign"));
const fs_1 = __importDefault(require("fs"));
const env_config_1 = __importDefault(require("../config/env.config"));
const tempEmpanelment_1 = __importDefault(require("../model/tempEmpanelment"));
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const logger_1 = __importDefault(require("../helpers/logger"));
const docusign = docusign_esign_1.default;
const replaceDocusignDocVariables = ({ tempEmpanelId, doc }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    let docBytes = doc;
    try {
        const x = yield tempEmpanelment_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.Types.ObjectId(tempEmpanelId),
                },
            },
            {
                $lookup: {
                    from: constants_1.COLLECTIONS.OwnershipType,
                    localField: 'ownershipDetails.ownershipTypeId',
                    foreignField: '_id',
                    as: 'ownershipDetails.ownershipType',
                },
            },
            {
                $lookup: {
                    from: constants_1.COLLECTIONS.TempProspectiveProvider,
                    localField: 'tempProspectiveProviderId',
                    foreignField: '_id',
                    as: 'tempProspectiveProvider',
                },
            },
            {
                $unwind: {
                    path: '$ownershipDetails.ownershipType',
                    preserveNullAndEmptyArrays: true,
                },
            },
            { $unwind: '$tempProspectiveProvider' },
        ]);
        const tempEmpanelment = x[0];
        const variables = {
            Owner_name: (_a = tempEmpanelment === null || tempEmpanelment === void 0 ? void 0 : tempEmpanelment.ownershipDetails) === null || _a === void 0 ? void 0 : _a.ownershipName,
            address1: (_b = tempEmpanelment === null || tempEmpanelment === void 0 ? void 0 : tempEmpanelment.ownershipDetails) === null || _b === void 0 ? void 0 : _b.officeAddressLineOne,
            state: (_c = tempEmpanelment === null || tempEmpanelment === void 0 ? void 0 : tempEmpanelment.ownershipDetails) === null || _c === void 0 ? void 0 : _c.officeState,
            FirmType: (_e = (_d = tempEmpanelment === null || tempEmpanelment === void 0 ? void 0 : tempEmpanelment.ownershipDetails) === null || _d === void 0 ? void 0 : _d.ownershipType) === null || _e === void 0 ? void 0 : _e.name,
            providerName: (_f = tempEmpanelment === null || tempEmpanelment === void 0 ? void 0 : tempEmpanelment.tempProspectiveProvider) === null || _f === void 0 ? void 0 : _f.providerName,
            stamp_year: (0, moment_1.default)().year(),
            stamp_month: (0, moment_1.default)().format('MMM'),
            stamp_day: (0, moment_1.default)().date(),
        };
        docBytes = docBytes.replace(/{{(.*?)}}/g, (match, key) => {
            const trimmedKey = key.trim();
            return variables[trimmedKey] || '-';
        });
        return docBytes;
    }
    catch (error) {
        logger_1.default.error('Error while replaceDocusignDocVariables: ' + (error === null || error === void 0 ? void 0 : error.message), {
            log: 'error',
            data: error,
        });
        return docBytes;
    }
});
const makeEnvelope = (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const docPath = path_1.default.join(__dirname, 'docusign-agreement.html');
    const doc = fs_1.default.readFileSync(docPath, 'utf8');
    const docBytes = yield replaceDocusignDocVariables({
        tempEmpanelId: args === null || args === void 0 ? void 0 : args.tempEmpanelId,
        doc,
    });
    const documentId = '1';
    const numberOfPages = 7;
    const fileExtension = path_1.default.extname(docPath);
    const document = docusign.Document.constructFromObject({
        documentBase64: Buffer.from(docBytes).toString('base64'),
        documentId,
        fileExtension,
        name: path_1.default.basename(docPath, fileExtension),
    });
    const signerData = [
        ...args.signers.map(x => (Object.assign(Object.assign({}, x), { xPosition: '390', yPosition: '737' }))),
        {
            signerEmail: (0, env_config_1.default)('DOCUSIGN_AUTHORITY_SIGNER_EMAIL'),
            signerName: (0, env_config_1.default)('DOCUSIGN_AUTHORITY_SIGNER_NAME'),
            xPosition: '500',
            yPosition: '737',
        },
    ];
    const signers = signerData.map((s, i) => {
        const recipientId = (i + 1).toString();
        const { signerEmail, signerName, xPosition, yPosition } = s;
        const signer = docusign.Signer.constructFromObject({
            email: signerEmail,
            name: signerName,
            recipientId,
            routingOrder: (i + 1).toString(),
        });
        const signHereTabs = Array.from({ length: numberOfPages }, (_, i) => {
            const def = { documentId, recipientId, xPosition, yPosition };
            const pageNumber = i + 1;
            return docusign.SignHere.constructFromObject(Object.assign(Object.assign({}, def), { pageNumber: pageNumber.toString(), tabLabel: `signHerePage${pageNumber}`, tooltip: `Click here to sign page ${pageNumber}` }));
        });
        signer.tabs = docusign.Tabs.constructFromObject({
            signHereTabs,
        });
        return signer;
    });
    const customFields = docusign.CustomFields.constructFromObject({
        textCustomFields: [
            {
                name: 'EnvelopeInfo',
                value: 'my data',
            },
        ],
    });
    const ccEmail = 'yuvraj.parmar@alineahealthcare.in';
    const ccName = 'Yuvraj';
    const cc1 = docusign.CarbonCopy.constructFromObject({
        email: ccEmail,
        name: ccName,
        routingOrder: '1',
        recipientId: (_g = ((signerData === null || signerData === void 0 ? void 0 : signerData.length) + 1)) === null || _g === void 0 ? void 0 : _g.toString(),
    });
    const recipients = docusign.Recipients.constructFromObject({
        carbonCopies: [cc1],
        signers,
    });
    const envelopeDefinition = docusign.EnvelopeDefinition.constructFromObject({
        customFields,
        documents: [document],
        emailSubject: 'Please sign this document',
        recipients,
        status: 'sent',
    });
    return envelopeDefinition;
});
exports.default = makeEnvelope;
