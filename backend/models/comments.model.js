import mongoose from "mongoose"; 

const commentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    }, 
    postId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Posts",
    },
    body: {
        type: String, 
        required: true, 
    },
});

const commentsModel = mongoose.model("Comments", commentsSchema);
export default commentsModel;