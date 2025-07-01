import express from 'express';
import commonRoute from './common';
import userRoute from './user';
import authRoute from './auth';
import designationRoute from './designation';
import dropDownRoute from './dropDown';

const appRoute = express.Router();

appRoute.use(authRoute);
appRoute.use(commonRoute);
appRoute.use(userRoute);
appRoute.use(designationRoute);
appRoute.use(dropDownRoute);

export default appRoute;
