import {createSlice} from "@reduxjs/toolkit";
import { getAllPosts, createPost } from "../../action/postAction/PostAction";

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
        })
        .addCase(createPost.pending, (state) => {
            state.isLoading = true; 
            state.isError = false; 
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.isLoading = false; 
            state.isError = false; 
            state.message = action.payload;
        })
        .addCase(createPost.rejected, (state) => {
            state.isError = true; 
            state.isLoading = false; 
            state.message = "Error: Post Uploading Failed";
        });
    },
});

export const {reset, resetPostId} = postSlice.actions;
export default postSlice.reducer; 