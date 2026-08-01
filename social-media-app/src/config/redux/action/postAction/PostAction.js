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