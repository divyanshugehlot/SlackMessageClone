import express from 'express';

import { signIn,signUp } from '../../controllers/userController.js';
import { userSigninSchema,userSignupSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const usersRouter = express.Router();


usersRouter.post('/signup',validate(userSignupSchema),signUp);
usersRouter.post('/signin',validate(userSigninSchema),signIn);



export default usersRouter;
