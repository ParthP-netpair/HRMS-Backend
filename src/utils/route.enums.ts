export enum COMMON_ROUTE {
  api = '/api',
}

export enum AUTH_ROUTE {
  signup = '/auth/signup',
  login = '/auth/login',
  currentUser = '/auth/current-user',
  forgotPassword = '/auth/forgot-password',
  resetPassword = '/auth/reset-password',
}
export enum USER_ROUTE {
  create = '/user/create',
}

export enum OTHER_EXTERNAL_ROUTE {
  ifscSearch = '/other/search-ifsc',
  pincodeSearch = '/other/search-pincode',
}
export enum EXTERNAL_VERIFICATION_ROUTE {
  verifyAadhar = '/verification/verify-aadhar',
  verifyPan = '/verification/verify-pan',
  verifyCompany = '/verification/verify-company',
  verifyBank = '/verification/verify-bank',
  verifyPanFrs = '/verification/verify-pan-frs',
  verifyBankFrs = '/verification/verify-bank-frs',
}

export enum PINCODE_DC_REQUEST_ROUTE {
  create = '/pincode-dc-req/create',
  list = '/pincode-dc-req/list',
}

export enum TICKET_ROUTE {
  create = '/ticket/create',
  listNewReq = '/ticket/list/new-requests',
  listClosedReq = '/ticket/list/closed-requests',
  details = '/ticket/closed-details',
}

export enum PROSPECTIVE_PROVIDER_ROUTE {
  create = '/prospective-provider/create',
  add = '/prospective-provider/add',
  delete = '/prospective-provider/delete',
  get = '/prospective-provider/get',
  list = '/prospective-provider/open-req/list',
  getDetails = '/prospective-provider/details',
}

export enum TEMP_EMPANELMENT_ROUTE {
  selfCreate = '/temp-empanelment/self-create',
  manualCreate = '/temp-empanelment/manual-create',
  changeStatusByLegal = '/temp-empanelment/change-status-legal',
  changeStatusByNw = '/temp-empanelment/change-status-nw',
  count = '/temp-empanelment/count',
  nwList = '/temp-empanelment/list',
  legalList = '/temp-empanelment/legal-list',
  getOne = '/temp-empanelment/get-one',
  editByDc = '/temp-empanelment/edit/dc',
  editByNw = '/temp-empanelment/edit/nw',
  proceedDocusign = '/temp-empanelment/proceed-docusign',
  empanel = '/temp-empanelment/empanel-provider',
}

export enum COUNCIL_ROUTE {
  create = '/council/create',
  dropdown = '/council/dropdown',
}
export enum QUALIFICATION_ROUTE {
  create = '/qualification/create',
  dropdown = '/qualification/dropdown',
}

export enum TEST_CATEGORY_ROUTE {
  create = '/test-category/create',
  dropdown = '/test-category/dropdown',
}
export enum TEST_MASTER_ROUTE {
  create = '/test-master/create',
  dropdown = '/test-master/dropdown',
  list = '/test-master/list',
}

export enum OWNERSHIP_TYPE_ROUTE {
  create = '/ownership-type/create',
  dropdown = '/ownership-type/dropdown',
}

export enum INSURANCE_COMPANY_ROUTE {
  create = '/insurance-company/create',
  dropdown = '/insurance-company/dropdown',
}
export enum PROVIDER_ROUTE {
  mainSearch = '/provider/main-search',
  manageSearch = '/provider/manage-search',
  manageDetails = '/provider/manage-details',
  details = '/provider/details',
}

export enum DELIST_REQUEST_ROUTE {
  create = '/delist-request/create',
  changeStatus = '/delist-request/change-status',
  changeStatusNw = '/delist-request/change-status-nw',
}
export enum PROVIDER_INSURER_MANAGE_ROUTE {
  create = '/provider-insurer-manage-req/create',
  changeStatus = '/provider-insurer-manage-req/change-status',
  changeStatusNw = '/provider-insurer-manage-req/change-status-nw',
}

export enum PARTIAL_EMPANELMENT_ROUTE {
  save = '/partial-empanelment/save',
}
export enum DOCUSIGN_ROUTE {
  envelopeDetails = '/docusign/envelope-details',
  downloadDoc = '/docusign/download-doc/:id',
  webhook = '/docusign/webhook',
}

export enum DISPOSITION_REMARK_ROUTE {
  create = '/disposition-remark/create',
  dropdown = '/disposition-remark/dropdown',
}
