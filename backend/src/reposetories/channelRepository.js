import Channel from "../schema/channel.js";
import crudRepository from "./crudReposetory.js";

const channelRepository = {
    ...crudRepository(Channel),
   
   
}

export default channelRepository;