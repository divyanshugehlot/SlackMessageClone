import { StatusCodes } from "http-status-codes";
import { customErrorResponse, internalErrorResponse } from "../utils/common/responseObjects.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../config/serverConfig.js";
import userRepository from "../reposetories/userReposetory.js";

export const isAuthenticated = async (req, res, next) => {
 try{
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
          customErrorResponse({
              explanation: 'Invalid data sent from the client',
              message: 'No auth token provided',
              
          })
      );
    }
  
     const response =  jwt.verify(token, JWT_SECRET);
     if (!response) {
      return res.status(StatusCodes.FORBIDDEN).json(
          customErrorResponse({
              explanation: 'Invalid data sent from the client',
              message: 'Invalid auth token provided',
              
          })
      );      
  }
  const user =  await userRepository.getById(response.id);
  req.user = user.id;
  next();
 }
 catch(error){
    console.log("auth middleware error",error);
    if(error.name === 'JsonWebTokenError') {
        return res.status(StatusCodes.FORBIDDEN).json(
            customErrorResponse({
                explanation: 'Invalid data sent from the client',
                message: 'Invalid auth token provided',
                
            })
        );      
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        internalErrorResponse(error)
    );
 }
}