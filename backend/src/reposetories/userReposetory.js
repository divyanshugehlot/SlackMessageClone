import User from "../schema/user.js";
import crudRepository from "./crudReposetory.js";

const userRepository = {
    ...crudRepository(User),
    getByEmail: async function (email) {
        const user = await this.model.findOne({ email });
        return user;
    },
    getByUsername: async function (username) {
        const user = await this.model.findOne({ username }).select("-password");//exclude password
        return user;
    },
}

export default userRepository;