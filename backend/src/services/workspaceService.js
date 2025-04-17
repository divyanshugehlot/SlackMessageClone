import { v4 as uuidv4 } from "uuid";

import workspaceRepository from "../reposetories/workspaceRepository.js"
import  ValidationError  from "../utils/error/valdationError.js";
import channelRepository from "../reposetories/channelRepository.js";
import ClientError from "../utils/error/clientError.js";
import { StatusCodes } from "http-status-codes";


export const createWorkspaceService = async (workspaceData) => {

    try{
      const joinCode = uuidv4().substring(0, 6).toLocaleUpperCase();


const response = await workspaceRepository.create({
    name: workspaceData.name,
    description: workspaceData.description,
    joinCode
  });

    await workspaceRepository.addMemberToWorkspace(
        response._id,
         workspaceData.owner,
          "admin"
        );
       
    const updatedWorkspace=  await workspaceRepository.addChannelToWorkspace(
            response._id,
            workspaceData.owner,
            "general",
            
        )
        return updatedWorkspace;
    }
    catch (error) {
        console.log("Error in createWorkspaceService", error);
        if (error.name === 'MongoServerError' && error.code === 11000) {
          throw new ValidationError(
            {
              error: ['A workspace with same details already exists']
            },
            'A workspace with same details already exists'
          );
        }
    }

}

export const getWokspacesUserIsMemberOfService = async (userId) => {

  try{
    const response =  workspaceRepository.fetchAllWorkspaceByMemberId(userId);
    return response;
  }
  catch (error) {
    console.log(error)
    throw error;
  }
}

export const deleteWorkspaceService = async (workspaceId,userId) => {
 try{
  const workspace = await workspaceRepository.getById(workspaceId);
  if(!workspace) {
    throw new ClientError({
      explanation: 'Invalid data sent from the client',
      message: 'No registered workspace found with this id',
      statusCode:StatusCodes.NOT_FOUND
     })
  }
  const isAllowed=  workspace.members.
  find((member) => member.memberId.toString() === userId
   && member.role === "admin"); 
   // const channelIds= workspace.channels.map((channel) => channel._id);
  if(isAllowed) 
   {
     const channelDeleteResponse =  await channelRepository.deleteMany(
     workspace.channels
   );
   const response = await workspaceRepository.delete(workspaceId);
   return response
 }
 throw new ClientError({
  explanation: 'User is either not a member or not an admin',
  message: 'user is not allowed to delete workspace',
  statusCode:StatusCodes.UNAUTHORIZED
})
 }
 catch (error) {
  console.log(error);
  throw error;
 }
}