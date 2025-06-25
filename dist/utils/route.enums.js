"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOCUSIGN_ROUTE = exports.PARTIAL_EMPANELMENT_ROUTE = exports.PROVIDER_INSURER_MANAGE_ROUTE = exports.DELIST_REQUEST_ROUTE = exports.PROVIDER_ROUTE = exports.INSURANCE_COMPANY_ROUTE = exports.OWNERSHIP_TYPE_ROUTE = exports.TEST_MASTER_ROUTE = exports.TEST_CATEGORY_ROUTE = exports.QUALIFICATION_ROUTE = exports.COUNCIL_ROUTE = exports.TEMP_EMPANELMENT_ROUTE = exports.PROSPECTIVE_PROVIDER_ROUTE = exports.TICKET_ROUTE = exports.PINCODE_DC_REQUEST_ROUTE = exports.EXTERNAL_VERIFICATION_ROUTE = exports.OTHER_EXTERNAL_ROUTE = exports.USER_ROUTE = exports.AUTH_ROUTE = exports.COMMON_ROUTE = void 0;
var COMMON_ROUTE;
(function (COMMON_ROUTE) {
    COMMON_ROUTE["api"] = "/api";
})(COMMON_ROUTE || (exports.COMMON_ROUTE = COMMON_ROUTE = {}));
var AUTH_ROUTE;
(function (AUTH_ROUTE) {
    AUTH_ROUTE["login"] = "/auth/login";
    AUTH_ROUTE["currentUser"] = "/auth/current-user";
    AUTH_ROUTE["forgotPassword"] = "/auth/forgot-password";
    AUTH_ROUTE["resetPassword"] = "/auth/reset-password";
})(AUTH_ROUTE || (exports.AUTH_ROUTE = AUTH_ROUTE = {}));
var USER_ROUTE;
(function (USER_ROUTE) {
    USER_ROUTE["create"] = "/user/create";
})(USER_ROUTE || (exports.USER_ROUTE = USER_ROUTE = {}));
var OTHER_EXTERNAL_ROUTE;
(function (OTHER_EXTERNAL_ROUTE) {
    OTHER_EXTERNAL_ROUTE["ifscSearch"] = "/other/search-ifsc";
    OTHER_EXTERNAL_ROUTE["pincodeSearch"] = "/other/search-pincode";
})(OTHER_EXTERNAL_ROUTE || (exports.OTHER_EXTERNAL_ROUTE = OTHER_EXTERNAL_ROUTE = {}));
var EXTERNAL_VERIFICATION_ROUTE;
(function (EXTERNAL_VERIFICATION_ROUTE) {
    EXTERNAL_VERIFICATION_ROUTE["verifyAadhar"] = "/verification/verify-aadhar";
    EXTERNAL_VERIFICATION_ROUTE["verifyPan"] = "/verification/verify-pan";
    EXTERNAL_VERIFICATION_ROUTE["verifyCompany"] = "/verification/verify-company";
    EXTERNAL_VERIFICATION_ROUTE["verifyBank"] = "/verification/verify-bank";
    EXTERNAL_VERIFICATION_ROUTE["verifyPanFrs"] = "/verification/verify-pan-frs";
    EXTERNAL_VERIFICATION_ROUTE["verifyBankFrs"] = "/verification/verify-bank-frs";
})(EXTERNAL_VERIFICATION_ROUTE || (exports.EXTERNAL_VERIFICATION_ROUTE = EXTERNAL_VERIFICATION_ROUTE = {}));
var PINCODE_DC_REQUEST_ROUTE;
(function (PINCODE_DC_REQUEST_ROUTE) {
    PINCODE_DC_REQUEST_ROUTE["create"] = "/pincode-dc-req/create";
    PINCODE_DC_REQUEST_ROUTE["list"] = "/pincode-dc-req/list";
})(PINCODE_DC_REQUEST_ROUTE || (exports.PINCODE_DC_REQUEST_ROUTE = PINCODE_DC_REQUEST_ROUTE = {}));
var TICKET_ROUTE;
(function (TICKET_ROUTE) {
    TICKET_ROUTE["create"] = "/ticket/create";
    TICKET_ROUTE["listNewReq"] = "/ticket/list/new-requests";
    TICKET_ROUTE["listClosedReq"] = "/ticket/list/closed-requests";
    TICKET_ROUTE["details"] = "/ticket/closed-details";
})(TICKET_ROUTE || (exports.TICKET_ROUTE = TICKET_ROUTE = {}));
var PROSPECTIVE_PROVIDER_ROUTE;
(function (PROSPECTIVE_PROVIDER_ROUTE) {
    PROSPECTIVE_PROVIDER_ROUTE["create"] = "/prospective-provider/create";
    PROSPECTIVE_PROVIDER_ROUTE["add"] = "/prospective-provider/add";
    PROSPECTIVE_PROVIDER_ROUTE["delete"] = "/prospective-provider/delete";
    PROSPECTIVE_PROVIDER_ROUTE["get"] = "/prospective-provider/get";
    PROSPECTIVE_PROVIDER_ROUTE["list"] = "/prospective-provider/open-req/list";
    PROSPECTIVE_PROVIDER_ROUTE["getDetails"] = "/prospective-provider/details";
})(PROSPECTIVE_PROVIDER_ROUTE || (exports.PROSPECTIVE_PROVIDER_ROUTE = PROSPECTIVE_PROVIDER_ROUTE = {}));
var TEMP_EMPANELMENT_ROUTE;
(function (TEMP_EMPANELMENT_ROUTE) {
    TEMP_EMPANELMENT_ROUTE["selfCreate"] = "/temp-empanelment/self-create";
    TEMP_EMPANELMENT_ROUTE["manualCreate"] = "/temp-empanelment/manual-create";
    TEMP_EMPANELMENT_ROUTE["changeStatusByLegal"] = "/temp-empanelment/change-status-legal";
    TEMP_EMPANELMENT_ROUTE["changeStatusByNw"] = "/temp-empanelment/change-status-nw";
    TEMP_EMPANELMENT_ROUTE["count"] = "/temp-empanelment/count";
    TEMP_EMPANELMENT_ROUTE["nwList"] = "/temp-empanelment/list";
    TEMP_EMPANELMENT_ROUTE["legalList"] = "/temp-empanelment/legal-list";
    TEMP_EMPANELMENT_ROUTE["getOne"] = "/temp-empanelment/get-one";
    TEMP_EMPANELMENT_ROUTE["editByDc"] = "/temp-empanelment/edit/dc";
    TEMP_EMPANELMENT_ROUTE["editByNw"] = "/temp-empanelment/edit/nw";
    TEMP_EMPANELMENT_ROUTE["proceedDocusign"] = "/temp-empanelment/proceed-docusign";
    TEMP_EMPANELMENT_ROUTE["empanel"] = "/temp-empanelment/empanel-provider";
})(TEMP_EMPANELMENT_ROUTE || (exports.TEMP_EMPANELMENT_ROUTE = TEMP_EMPANELMENT_ROUTE = {}));
var COUNCIL_ROUTE;
(function (COUNCIL_ROUTE) {
    COUNCIL_ROUTE["create"] = "/council/create";
    COUNCIL_ROUTE["dropdown"] = "/council/dropdown";
})(COUNCIL_ROUTE || (exports.COUNCIL_ROUTE = COUNCIL_ROUTE = {}));
var QUALIFICATION_ROUTE;
(function (QUALIFICATION_ROUTE) {
    QUALIFICATION_ROUTE["create"] = "/qualification/create";
    QUALIFICATION_ROUTE["dropdown"] = "/qualification/dropdown";
})(QUALIFICATION_ROUTE || (exports.QUALIFICATION_ROUTE = QUALIFICATION_ROUTE = {}));
var TEST_CATEGORY_ROUTE;
(function (TEST_CATEGORY_ROUTE) {
    TEST_CATEGORY_ROUTE["create"] = "/test-category/create";
    TEST_CATEGORY_ROUTE["dropdown"] = "/test-category/dropdown";
})(TEST_CATEGORY_ROUTE || (exports.TEST_CATEGORY_ROUTE = TEST_CATEGORY_ROUTE = {}));
var TEST_MASTER_ROUTE;
(function (TEST_MASTER_ROUTE) {
    TEST_MASTER_ROUTE["create"] = "/test-master/create";
    TEST_MASTER_ROUTE["dropdown"] = "/test-master/dropdown";
    TEST_MASTER_ROUTE["list"] = "/test-master/list";
})(TEST_MASTER_ROUTE || (exports.TEST_MASTER_ROUTE = TEST_MASTER_ROUTE = {}));
var OWNERSHIP_TYPE_ROUTE;
(function (OWNERSHIP_TYPE_ROUTE) {
    OWNERSHIP_TYPE_ROUTE["create"] = "/ownership-type/create";
    OWNERSHIP_TYPE_ROUTE["dropdown"] = "/ownership-type/dropdown";
})(OWNERSHIP_TYPE_ROUTE || (exports.OWNERSHIP_TYPE_ROUTE = OWNERSHIP_TYPE_ROUTE = {}));
var INSURANCE_COMPANY_ROUTE;
(function (INSURANCE_COMPANY_ROUTE) {
    INSURANCE_COMPANY_ROUTE["create"] = "/insurance-company/create";
    INSURANCE_COMPANY_ROUTE["dropdown"] = "/insurance-company/dropdown";
})(INSURANCE_COMPANY_ROUTE || (exports.INSURANCE_COMPANY_ROUTE = INSURANCE_COMPANY_ROUTE = {}));
var PROVIDER_ROUTE;
(function (PROVIDER_ROUTE) {
    PROVIDER_ROUTE["mainSearch"] = "/provider/main-search";
    PROVIDER_ROUTE["manageSearch"] = "/provider/manage-search";
    PROVIDER_ROUTE["manageDetails"] = "/provider/manage-details";
    PROVIDER_ROUTE["details"] = "/provider/details";
})(PROVIDER_ROUTE || (exports.PROVIDER_ROUTE = PROVIDER_ROUTE = {}));
var DELIST_REQUEST_ROUTE;
(function (DELIST_REQUEST_ROUTE) {
    DELIST_REQUEST_ROUTE["create"] = "/delist-request/create";
    DELIST_REQUEST_ROUTE["changeStatus"] = "/delist-request/change-status";
    DELIST_REQUEST_ROUTE["changeStatusNw"] = "/delist-request/change-status-nw";
})(DELIST_REQUEST_ROUTE || (exports.DELIST_REQUEST_ROUTE = DELIST_REQUEST_ROUTE = {}));
var PROVIDER_INSURER_MANAGE_ROUTE;
(function (PROVIDER_INSURER_MANAGE_ROUTE) {
    PROVIDER_INSURER_MANAGE_ROUTE["create"] = "/provider-insurer-manage-req/create";
    PROVIDER_INSURER_MANAGE_ROUTE["changeStatus"] = "/provider-insurer-manage-req/change-status";
    PROVIDER_INSURER_MANAGE_ROUTE["changeStatusNw"] = "/provider-insurer-manage-req/change-status-nw";
})(PROVIDER_INSURER_MANAGE_ROUTE || (exports.PROVIDER_INSURER_MANAGE_ROUTE = PROVIDER_INSURER_MANAGE_ROUTE = {}));
var PARTIAL_EMPANELMENT_ROUTE;
(function (PARTIAL_EMPANELMENT_ROUTE) {
    PARTIAL_EMPANELMENT_ROUTE["save"] = "/partial-empanelment/save";
})(PARTIAL_EMPANELMENT_ROUTE || (exports.PARTIAL_EMPANELMENT_ROUTE = PARTIAL_EMPANELMENT_ROUTE = {}));
var DOCUSIGN_ROUTE;
(function (DOCUSIGN_ROUTE) {
    DOCUSIGN_ROUTE["envelopeDetails"] = "/docusign/envelope-details";
    DOCUSIGN_ROUTE["downloadDoc"] = "/docusign/download-doc";
})(DOCUSIGN_ROUTE || (exports.DOCUSIGN_ROUTE = DOCUSIGN_ROUTE = {}));
