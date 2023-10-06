import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER
export const register = async(req, res) => {
    try{
        const {fName, lName, email, password, picturePath, friends, location, profession} = req.body;

        // PASSWORD HASHING
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fName,
            lName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            profession
        }); 

        res.status(201).json(newUser);

    }

    catch(err){
        res.status(500).json({error: err.message});
    }
};

// LOG IN
export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({msg: "User does not exist"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({msg: "Incorrect password"});
        }

        // GENERATE TOKEN
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({user, token});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};
