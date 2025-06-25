import express from 'express';
import {
  currentUserCtl,
  loginCtl,
  changePasswordCtl,
  forgotPasswordCtl,
  signupCtl,
} from '../controller/auth';
import { AUTH_ROUTE } from '../utils/route.enums';
import authMw from '../middleware/auth';

const authRoute = express.Router();
authRoute.post(AUTH_ROUTE.signup, signupCtl);
authRoute.post(AUTH_ROUTE.login, loginCtl);
authRoute.post(AUTH_ROUTE.forgotPassword, forgotPasswordCtl);
authRoute.post(AUTH_ROUTE.resetPassword, changePasswordCtl);
authRoute.post(AUTH_ROUTE.currentUser, authMw, currentUserCtl);

export default authRoute;
