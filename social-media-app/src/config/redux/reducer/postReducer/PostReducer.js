import {createSlice} from "@reduxjs/toolkit";
import { getAllPosts } from "../../action/postAction/PostAction";

const initialState = {
    posts: [],
    comments: [],  
    isError: false, 
    postFetched: false, 
    isLoading: false, 
    isLoggedIn: false, 
    message: "", 
    postId: "",
};

const postSlice = createSlice({
    name: "post", 
    initialState,
    reducers: {
        reset: () => initialState,
        resetPostId: (state) => {
            state.postId = "";
        },  
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPosts.pending, (state) => {
            state.isLoading = true; 
            state.isError = false; 
            state.message = "Fetching posts....";
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.isError = false; 
            state.isLoading = false; 
            state.postFetched = true; 
            state.message = action.payload.posts; 
        })
        .addCase(getAllPosts.rejected, (state, action) => {
            state.isError = true; 
            state.isLoading = false; 
            state.message = {
                message: action.payload.message, 
            };
        });
    },
});

export const {reset, resetPostId} = postSlice.actions;
export default postSlice.reducer; 