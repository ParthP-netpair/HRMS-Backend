"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EGender = exports.EStaffType = exports.EDCEmpanelmentStatus = exports.EVerificationProcess = exports.EBankAccTypes = void 0;
var EBankAccTypes;
(function (EBankAccTypes) {
    EBankAccTypes["Savings"] = "Savings";
    EBankAccTypes["Current"] = "Current";
})(EBankAccTypes || (exports.EBankAccTypes = EBankAccTypes = {}));
var EVerificationProcess;
(function (EVerificationProcess) {
    EVerificationProcess["Pending"] = "Pending";
    EVerificationProcess["PartialVerified"] = "PartialVerified";
    EVerificationProcess["Verified"] = "Verified";
    EVerificationProcess["ReturnedByLegal"] = "ReturnedByLegal";
    EVerificationProcess["ReturnedByLegalProvider"] = "ReturnedByLegalProvider";
})(EVerificationProcess || (exports.EVerificationProcess = EVerificationProcess = {}));
var EDCEmpanelmentStatus;
(function (EDCEmpanelmentStatus) {
    EDCEmpanelmentStatus["Pending"] = "Pending";
    EDCEmpanelmentStatus["Registered"] = "Registered";
    EDCEmpanelmentStatus["Rejected"] = "Rejected";
})(EDCEmpanelmentStatus || (exports.EDCEmpanelmentStatus = EDCEmpanelmentStatus = {}));
var EStaffType;
(function (EStaffType) {
    EStaffType["Pathologist"] = "Pathologist";
    EStaffType["Cardiologist"] = "Cardiologist";
    EStaffType["Radiologist"] = "Radiologist";
    EStaffType["Gynecologist"] = "Gynecologist";
    EStaffType["MBBS"] = "MBBS";
})(EStaffType || (exports.EStaffType = EStaffType = {}));
var EGender;
(function (EGender) {
    EGender["Male"] = "Male";
    EGender["Female"] = "Female";
    EGender["Other"] = "Other";
})(EGender || (exports.EGender = EGender = {}));
