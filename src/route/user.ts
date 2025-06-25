import express from 'express';
import { createUser } from '../controller/user';
import schemaValidator from '../middleware/schemaValidator';
import { schemaValidation } from '../model/user';
import { USER_ROUTE } from '../utils/route.enums';

const userRoute = express.Router();

userRoute.post(USER_ROUTE.create, schemaValidator(schemaValidation), createUser);

export default userRoute;
