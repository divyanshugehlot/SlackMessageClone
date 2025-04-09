
import { StatusCodes } from "http-status-codes";
import Workspace from "../schema/workspace.js";
import User from "../schema/user.js";
import ClientError from "../utils/error/clientError.js";
import crudRepository from "./crudReposetory.js";
import channelRepository from "./channelRepository.js";

const workspaceRepository = {
    ...crudRepository(Workspace),
   getWorkSpaceByName: async function (workspaceName) {
    const workspace =  await Workspace.findOne({name:workspaceName});
    if(!workspace){
        throw new ClientError({
            explanation:"Invalid data sent from the client",
            message:"Workspace not found",
            statusCode:StatusCodes.NOT_FOUND
        });
    }
    return workspace;
   },
   getWorkspaceByJoinCode :  async function (joinCode) {
    const workspace =  await Workspace.findOne({joinCode});
    if(!workspace){
        throw new ClientError({
            explanation:"Invalid data sent from the client",
            message:"workspace not found",
            statusCode:StatusCodes.NOT_FOUND
        });
    }
    return workspace;
    },
    addMemberToWorkspace: async function (workspaceId,memberId,role){
        const workspace =  await Workspace.findById({workspaceId});
        if(!workspace){
            throw new ClientError({
                explanation:"Invalid data sent from the client",
                message:"workspace not found",
                statusCode:StatusCodes.NOT_FOUND
            });
        }
        const isValidUser = await User.findById(memberId);
        const isMemberAlreadyPartOfWorkspace = workspace.members.find(
        (member) => member.memberId === memberId
    
    );
   if(isMemberAlreadyPartOfWorkspace){
    throw new ClientError({
        explanation:"Invalid data sent from the client",
        message:"user is already part of the workspace",
        statusCode:StatusCodes.FORBIDDEN
    });

   }
        workspace.members.push({
            memberId,
            role
        });
        if(!isValidUser){
            throw new ClientError({
                explanation:"Invalid data sent from the client",
                message:"user not found",
                statusCode:StatusCodes.NOT_FOUND
            });
        }
        await workspace.save();
        return workspace;
    },
    addChannelToWorkspace: async function (workspaceId,channelName){
        const workspace =  await Workspace.findById({workspaceId})
        .populate("channels");
        if(!workspace){
            throw new ClientError({
                explanation:"Invalid data sent from the client",
                message:"workspace not found",
                statusCode:StatusCodes.NOT_FOUND
            });
        }
        const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
            (channel) => channel.name === channelName
        );
       
        if(isChannelAlreadyPartOfWorkspace){
            throw new ClientError({
                explanation:"Invalid data sent from the client",
                message:"channel is already part of the workspace",
                statusCode:StatusCodes.FORBIDDEN
            });
        }
        const channel = channelRepository.create({
            name:channelName
        });
        workspace.channels.push(channel);
        await workspace.save();
        return workspace;
    },
    fetchAllWorkspaceByMemberId: async function(memberId){
        const workspaces = await Workspace.find({
            'members.memberId':memberId
        }).populate("members.memberId", "username email avatar");
        
        return workspaces;

    }
}

export default workspaceRepository;