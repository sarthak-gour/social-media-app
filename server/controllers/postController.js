import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
    try{
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);

        const newPost = await Post.create({
            userId,
            fName: user.fName,
            lName: user.lName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {}
        });

        const post = await Post.find();
        res.status(201).json(post);  
    }
    catch(err){
        res.status(409).json({message: err.essage});
    }
};

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch(err){
        res.status(409).json({message: err.message});
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const posts = await Post.find({userId});
        res.status(200).json(posts);
    }
    catch(err){
        res.status(409).json({message: err.essage});
    }
}

// UPDATE
export const likePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        // like or dislike
        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId, true);
        }

        // update post with new set of likes
        const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true});

        res.status(200).json(updatedPost);
    }
    catch(err){
        res.status(409).json({message: err.essage});
    }
}