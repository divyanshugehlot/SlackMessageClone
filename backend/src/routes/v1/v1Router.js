import express from 'express';

import usersRouter from './users.js';
import workspaceRouter from './workspaces.js';

const v1Router = express.Router();


v1Router.use('/users',usersRouter);
v1Router.use('/workspaces',workspaceRouter);



export default v1Router;
