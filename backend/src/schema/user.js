import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
       
    },
    username:{
        type:String,
        required:[true,"User name is required"],
        unique:[true,"User name already exists"],
        match:[/^[a-zA-Z0-9]+$/, "Please enter a valid user name"]
    },
    avatar:{
        type:String
    }
},{timestamps:true});

userSchema.pre("save", function(next) {
    const user = this;
    user.avatar=`https://robohash.org/${user.username}?size=200x200`;
    next();
});

const User = mongoose.model("User", userSchema);

export default User;