import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    picturePath: {
        type: String, 
        default: "default-user-image.png"
    },
    friends: {
        type: Array,
        default: []
    },
    location: String,
    profession: String

}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

export default User;
