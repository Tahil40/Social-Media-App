import express from "express"; 
import mongoose from "mongoose";
import cors from "cors"; 
import dotenv from "dotenv"; 
import postRoutes from "./routes/posts.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();
const app = express(); 
app.use(cors());
app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3000; 
const MONGOOSE_URI = process.env.MONGOOSE_URI || ""; 

const startServer = async () => {
    await mongoose.connect(MONGOOSE_URI);

    app.listen(3000, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
};

startServer();