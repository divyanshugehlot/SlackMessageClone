import User from "../schema/user";
import crudRepository from "./crudRepository";

const userRepository = {
    ...crudRepository(User),
    getByEmail: async function (email) {
        const user = await this.model.findOne({ email });
        return user;
    },
    getByUsername: async function (username) {
        const user = await this.model.findOne({ username });
        return user;
    },
}

export default userRepository;