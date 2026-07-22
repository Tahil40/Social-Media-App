import mongoose from "mongoose";

const  connectionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    }, 
    connectionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    }, 
    status: {
        type: Boolean, 
        default: null, 
    },
});

const connectionsModel = mongoose.model("Connections", connectionsSchema);
export default connectionsModel;