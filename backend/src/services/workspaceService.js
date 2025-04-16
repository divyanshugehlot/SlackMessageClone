import { v4 as uuidv4 } from "uuid";

import workspaceRepository from "../reposetories/workspaceRepository.js"


export const createWorkspaceService = async (workspaceData) => {
const joinCode = uuidv4().substring(0, 6);


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
       
     await workspaceRepository.addChannelToWorkspace(
            response._id,
            workspaceData.owner,
            "general",
            
        )
}