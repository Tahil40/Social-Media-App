import userModel from "../models/user.model";
import postsModel from "../models/posts.model";

export const activeCheck = (req, res) => {
    return res.status(200).json({message: "Running"});
};

export const createPost = async (req, res) => {
    const {token} = req.body; 
    
    try{
        const user = await userModel.findOne({token});

        if(!user){
            return res.status(404).json({message: "user not found"});
        }; 

        const posts_object = new postsModel({
            userId: user._id, 
            body: req.body.body, 
            media: req.file != "undefined" ? req.file.filename : "", 
            fileType: req.file != "undefined" ? req.file.mimetype.split("/")[1] : "",  
        });

        await posts_object.save(); 

        return res.status(200).json({message: "post created"});
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    };
};

export const getAllPosts = async (req, res) => {
    try{
        const posts_data = await postsModel.find().populate("userId", "name username email profilePicture");

        return res.status(200).json({posts_data});
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    };
}; 