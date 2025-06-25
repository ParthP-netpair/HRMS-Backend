"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const zod_1 = __importDefault(require("zod"));
const user_1 = require("../types/user");
const tempEmpanelment_1 = require("../types/tempEmpanelment");
const childTicket_1 = require("../types/childTicket");
const PincodeSchema = new mongoose_1.Schema(Object.assign({ tempProspectiveProviderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: constants_1.COLLECTIONS.TempProspectiveProvider,
        required: true,
    }, empanelType: String, basicDetails: mongoose_1.Schema.Types.Mixed, contactDetails: mongoose_1.Schema.Types.Mixed, ownershipDetails: mongoose_1.Schema.Types.Mixed, bankDetails: mongoose_1.Schema.Types.Mixed, staff: mongoose_1.Schema.Types.Mixed, availableTestIds: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: constants_1.COLLECTIONS.TempProspectiveProvider,
        default: [],
    } }, constants_1.commonDbFields), constants_1.schemaOptions);
const PartialEmpanelment = (0, mongoose_1.model)('PartialEmpanelment', PincodeSchema, constants_1.COLLECTIONS.PartialEmpanelment);
exports.default = PartialEmpanelment;
exports.schemaValidation = zod_1.default.object({
    basicDetails: zod_1.default
        .object({
        providerName: zod_1.default.string().optional(),
        pincodeId: zod_1.default.string().optional(),
        pincode: zod_1.default.string().optional(),
        state: zod_1.default.string().optional(),
        city: zod_1.default.string().optional(),
        zone: zod_1.default.nativeEnum(user_1.EZones),
        addressLineOne: zod_1.default.string().optional(),
        addressLineTwo: zod_1.default.string().optional(),
        landmark: zod_1.default.string().optional(),
        telephone: zod_1.default.string().optional(),
        website: zod_1.default.string().optional(),
        fax: zod_1.default.string().optional(),
        longitude: zod_1.default.string().optional(),
        latitude: zod_1.default.string().optional(),
        googlePlusCode: zod_1.default.string().optional(),
    })
        .optional(),
    contactDetails: zod_1.default
        .object({
        primaryContactName: zod_1.default.string().optional(),
        primaryContactEmail: zod_1.default.string().optional(),
        secondaryContactName: zod_1.default.string().optional(),
        secondaryContactEmail: zod_1.default.string().optional(),
    })
        .optional(),
    ownershipDetails: zod_1.default
        .object({
        ownershipTypeId: zod_1.default.string().optional(),
        ownershipName: zod_1.default.string().optional(),
        ownerContactNo: zod_1.default.string().optional(),
        cuin: zod_1.default.string().optional(),
        panName: zod_1.default.string().optional(),
        panNo: zod_1.default.string().optional(),
        panDob: zod_1.default.string().optional(),
        panVerificationId: zod_1.default.string().optional(),
        aadharName: zod_1.default.string().optional(),
        aadharNo: zod_1.default.string().optional(),
        aadharVerificationId: zod_1.default.string().optional(),
        officeAddressLineOne: zod_1.default.string().optional(),
        officeAddressLineTwo: zod_1.default.string().optional(),
        officeState: zod_1.default.string().optional(),
        officeCity: zod_1.default.string().optional(),
        officePincode: zod_1.default.string().optional(),
        authorizedSignatoryName: zod_1.default.string().optional(),
        authorizedSignatoryDesignation: zod_1.default.string().optional(),
        authorizedSignatoryEmail: zod_1.default.string().optional(),
    })
        .optional(),
    bankDetails: zod_1.default
        .object({
        bankAccName: zod_1.default.string().optional(),
        bankAccNo: zod_1.default.string().optional(),
        bankAccIFSC: zod_1.default.string().optional(),
        bankName: zod_1.default.string().optional(),
        bankBranch: zod_1.default.string().optional(),
        bankBranchCity: zod_1.default.string().optional(),
        bankAccType: zod_1.default.nativeEnum(tempEmpanelment_1.EBankAccTypes),
        bankVerificationId: zod_1.default.string().optional(),
    })
        .optional(),
    tempProspectiveProviderId: zod_1.default.string(),
    staff: zod_1.default
        .array(zod_1.default.object({
        staffType: zod_1.default.nativeEnum(tempEmpanelment_1.EStaffType),
        name: zod_1.default.string(),
        gender: zod_1.default.nativeEnum(tempEmpanelment_1.EGender).optional(),
        qualificationId: zod_1.default.string().optional(),
        otherQualification: zod_1.default.string().optional(),
        registrationNo: zod_1.default.string(),
        councilId: zod_1.default.string().optional(),
        otherCouncil: zod_1.default.string().optional(),
        isAvailable: zod_1.default.boolean().optional(),
    }))
        .optional(),
    empanelType: zod_1.default.nativeEnum(childTicket_1.EEmpanelmentType),
    availableTestIds: zod_1.default.array(zod_1.default.string()).optional(),
});
