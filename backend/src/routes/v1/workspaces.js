import express from 'express';

import { createWorkspaceController,deleteWorkspaceController,getWorkspacesUserIsMemberOfController } from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createWorkspaceSchema } from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';


const workspaceRouter = express.Router();

workspaceRouter.post('/',
    isAuthenticated,
    validate(createWorkspaceSchema),
    createWorkspaceController)
workspaceRouter.get('/', 
    isAuthenticated, 
    getWorkspacesUserIsMemberOfController);

workspaceRouter.delete('/:workspaceId',
    isAuthenticated,
    deleteWorkspaceController
);
export default workspaceRouter;
