"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalApis = exports.schemaOptions = exports.commonDbFields = exports.COLLECTIONS = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var COLLECTIONS;
(function (COLLECTIONS) {
    COLLECTIONS["User"] = "user";
    COLLECTIONS["Pincode"] = "pincode";
    COLLECTIONS["Ticket"] = "ticket";
    COLLECTIONS["ChildTicket"] = "child_ticket";
    COLLECTIONS["TempProspectiveProvider"] = "temp_prospective_provider";
    COLLECTIONS["TempEmpanelment"] = "temp_empanelment";
    COLLECTIONS["Qualification"] = "qualification";
    COLLECTIONS["Council"] = "council";
    COLLECTIONS["ExternalVerification"] = "external_verification";
    COLLECTIONS["TestCategory"] = "test_category";
    COLLECTIONS["TestMaster"] = "test_master";
    COLLECTIONS["OwnershipType"] = "ownership_type";
    COLLECTIONS["InsuranceCompany"] = "insurance_company";
    COLLECTIONS["Provider"] = "provider";
    COLLECTIONS["ProviderLabTest"] = "provider_lab_test";
    COLLECTIONS["ProviderStaff"] = "provider_staff";
    COLLECTIONS["ProviderInsurer"] = "provider_insurer";
    COLLECTIONS["DelistRequest"] = "delist_request";
    COLLECTIONS["TempEmpanelEditTrack"] = "temp_empanel_edit_track";
    COLLECTIONS["ProviderInsurerRequest"] = "provider_insurer_request";
    COLLECTIONS["PartialEmpanelment"] = "partial_empanelment";
})(COLLECTIONS || (exports.COLLECTIONS = COLLECTIONS = {}));
exports.commonDbFields = {
    createdBy: { type: mongoose_1.default.Schema.ObjectId, ref: COLLECTIONS.User },
    updatedBy: { type: mongoose_1.default.Schema.ObjectId, ref: COLLECTIONS.User },
    deletedBy: { type: mongoose_1.default.Schema.ObjectId, ref: COLLECTIONS.User },
    deletedAt: { type: Date },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
};
exports.schemaOptions = { timestamps: true, toJSON: { versionKey: false } };
exports.externalApis = {
    ifsc: 'https://bank-apis.justinclicks.com/API/V1/IFSC/',
    pincode: 'https://api.postalpincode.in/pincode/',
};
