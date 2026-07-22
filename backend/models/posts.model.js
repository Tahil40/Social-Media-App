import mongoose from "mongoose"; 

const postsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
    likes: {
        type: Number, 
        default: 0, 
    },
    body: {
        type: String, 
        required: true, 
    }, 
    createdAt: {
        type: Date, 
        default: Date.now, 
    }, 
    updatedAt: {
        type: Date, 
        default: Date.now, 
    }, 
    media: {
        type: String, 
        default: "",
    }, 
    active: {
        type: Boolean, 
        default: true, 
    }, 
    fileType: {
        type: String, 
        default: "",
    }, 
});

const postsModel = mongoose.model("Posts", postsSchema);
export default postsModel;