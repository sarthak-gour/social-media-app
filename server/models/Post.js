import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    fName: {
        type: String,
        require: true
    },
    lName: {
        type: String,
        require: true
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes:{
        type: Map,
        of: Boolean,
    }
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;