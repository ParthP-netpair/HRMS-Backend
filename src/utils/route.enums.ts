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

export enum DROPDOWN_LIST {
  department = '/ddl/department',
  role = '/ddl/role',
  leaveType = '/ddl/leave-type',
  designation = '/ddl/designation/:id',
  leaveManagement = '/ddl/leave-managment',
}

export enum USER_ROUTE {
  create = '/user/create',
  list = '/user/list',
  getone = '/user/getOne',
  update = '/user/update',
}

export enum DESIGNATION_ROUTE {
  create = '/designation/create',
  list = '/designation/list',
  getone = '/designation/getOne',
  update = '/designation/update',
}

export enum LEAVE_MANGEMENT_ROUTE {
  create = '/leave-mangement/create',
  list = '/leave-mangement/list',
  getone = '/leave-mangement/getOne',
  update = '/leave-mangement/update',
  delete = '/leave-mangement/delete',
}
export enum LEAVE_MASTER_ROUTE {
  create = '/leave-master/create',
  list = '/leave-master/list',
  getone = '/leave-master/getOne',
  update = '/leave-master/update',
  delete = '/leave-master/delete',
}
