"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFdAssociationType = exports.EFdPriority = exports.EFdSource = exports.EFdStatus = exports.ERequestType = void 0;
var ERequestType;
(function (ERequestType) {
    ERequestType["Empanel"] = "Empanel";
    ERequestType["Delist"] = "Delist";
    ERequestType["Activate"] = "Activate";
    ERequestType["Deactivate"] = "Deactivate";
})(ERequestType || (exports.ERequestType = ERequestType = {}));
var EFdStatus;
(function (EFdStatus) {
    EFdStatus[EFdStatus["Open"] = 2] = "Open";
    EFdStatus[EFdStatus["Pending"] = 3] = "Pending";
    EFdStatus[EFdStatus["Resolved"] = 4] = "Resolved";
    EFdStatus[EFdStatus["Closed"] = 5] = "Closed";
    EFdStatus[EFdStatus["ForwardedToDC"] = 48] = "ForwardedToDC";
    EFdStatus[EFdStatus["DocumentSubmittedByDC"] = 49] = "DocumentSubmittedByDC";
    EFdStatus[EFdStatus["ForwardedToLegalAfterQC1"] = 50] = "ForwardedToLegalAfterQC1";
    EFdStatus[EFdStatus["DocumentVerifiedByLegal"] = 51] = "DocumentVerifiedByLegal";
    EFdStatus[EFdStatus["IssueInDocumentLegal"] = 52] = "IssueInDocumentLegal";
    EFdStatus[EFdStatus["EmpanelmentSuccessful"] = 53] = "EmpanelmentSuccessful";
    EFdStatus[EFdStatus["ManualEmpanelmentStart"] = 54] = "ManualEmpanelmentStart";
    EFdStatus[EFdStatus["ManualEmpanelmentSubmitted"] = 55] = "ManualEmpanelmentSubmitted";
    EFdStatus[EFdStatus["IssueInDocumentNw"] = 56] = "IssueInDocumentNw";
    EFdStatus[EFdStatus["DocusignProcessStarted"] = 57] = "DocusignProcessStarted";
    EFdStatus[EFdStatus["DocusignProcessCompleted"] = 58] = "DocusignProcessCompleted";
    EFdStatus[EFdStatus["IssueInDocumentByLegalForProvider"] = 59] = "IssueInDocumentByLegalForProvider";
})(EFdStatus || (exports.EFdStatus = EFdStatus = {}));
var EFdSource;
(function (EFdSource) {
    EFdSource[EFdSource["Email"] = 1] = "Email";
    EFdSource[EFdSource["Portal"] = 2] = "Portal";
    EFdSource[EFdSource["Phone"] = 3] = "Phone";
    EFdSource[EFdSource["Chat"] = 7] = "Chat";
    EFdSource[EFdSource["FeedbackWidget"] = 9] = "FeedbackWidget";
    EFdSource[EFdSource["OutboundEmail"] = 10] = "OutboundEmail";
})(EFdSource || (exports.EFdSource = EFdSource = {}));
var EFdPriority;
(function (EFdPriority) {
    EFdPriority[EFdPriority["Low"] = 1] = "Low";
    EFdPriority[EFdPriority["Medium"] = 2] = "Medium";
    EFdPriority[EFdPriority["High"] = 3] = "High";
    EFdPriority[EFdPriority["Urgent"] = 4] = "Urgent";
})(EFdPriority || (exports.EFdPriority = EFdPriority = {}));
var EFdAssociationType;
(function (EFdAssociationType) {
    EFdAssociationType[EFdAssociationType["Parent"] = 1] = "Parent";
    EFdAssociationType[EFdAssociationType["Child"] = 2] = "Child";
    EFdAssociationType[EFdAssociationType["Tracker"] = 3] = "Tracker";
    EFdAssociationType[EFdAssociationType["Related"] = 4] = "Related";
})(EFdAssociationType || (exports.EFdAssociationType = EFdAssociationType = {}));
