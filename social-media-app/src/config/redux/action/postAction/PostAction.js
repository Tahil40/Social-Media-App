import {createAsyncThunk} from "@reduxjs/toolkit";
import { clientServer } from "@/config/axiosConfig/axioxConfig";

export const getAllPosts = createAsyncThunk("/posts/get-posts", async (_, thunkAPI) => {
    try{
        const response = await clientServer.get("post/get-posts"); 

        if(response.data.ok){
            return thunkAPI.fulfillWithValue(response.data);
        };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    };
});

export const createPost = createAsyncThunk("/posts/create-post", async (userData, thunkAPI) => {
    const {file, body} = userData;

    try{
        const formData = new FormData(); 
        formData.append("token", localStorage.getItem("token"));
        formData.append("body", body);
        formData.append("file", file); 

        const response = await clientServer.post("/post/create-post", formData, {
            "Content-Type": "multipart/form-data",
        });

        if(response.status == 200){
            return thunkAPI.fulfillWithValue("Post Uploaded");
        } else {
            return thunkAPI.rejectWithValue("Post Uploading Failed");
        };

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data); 
    }
});