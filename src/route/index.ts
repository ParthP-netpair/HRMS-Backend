import express from 'express';
import commonRoute from './common';
import userRoute from './user';
import authRoute from './auth';


const appRoute = express.Router();

appRoute.use(authRoute);
appRoute.use(commonRoute);
appRoute.use(userRoute);


export default appRoute;
