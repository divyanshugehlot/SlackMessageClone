import express from 'express';

import { signUp } from '../../controllers/userController.js';
import { userSignupSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const usersRouter = express.Router();


usersRouter.post('/signup',validate(userSignupSchema),signUp);




export default usersRouter;
