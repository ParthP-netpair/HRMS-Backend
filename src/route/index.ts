import express from 'express';
import commonRoute from './common';
import userRoute from './user';
import authRoute from './auth';
import designationRoute from './designation';
import dropDownRoute from './dropDown';
import leaveMangementRoute from './leaveManagement';
import leaveMasterRoute from './leaveMaster';

const appRoute = express.Router();

appRoute.use(authRoute);
appRoute.use(commonRoute);
appRoute.use(userRoute);
appRoute.use(designationRoute);
appRoute.use(dropDownRoute);
appRoute.use(leaveMangementRoute);
appRoute.use(leaveMasterRoute);

export default appRoute;
