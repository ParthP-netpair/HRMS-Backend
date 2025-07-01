import express from 'express';
import { createUser, getUserOne, updateUserOne } from '../controller/user';
import schemaValidator from '../middleware/schemaValidator';
import { schemaValidation } from '../model/user';
import { USER_ROUTE } from '../utils/route.enums';
import authMw from '../middleware/auth';

const userRoute = express.Router();

userRoute.post(USER_ROUTE.create, authMw, schemaValidator(schemaValidation), createUser);
userRoute.post(USER_ROUTE.getone, authMw, getUserOne);
userRoute.post(USER_ROUTE.update, authMw, updateUserOne);

export default userRoute;
