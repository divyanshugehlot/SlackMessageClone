import Channel from "../models/Channel.js";
import crudRepository from "./crudReposetory.js";

const channelRepository = {
    ...crudRepository(Channel),
   
}

export default channelRepository;