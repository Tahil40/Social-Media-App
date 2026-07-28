import {createSlice} from "@reduxjs/toolkit";
import { loginUser } from "../../action/authAction/AuthAction";

const initialState = {
    user: [], 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    loggedIn: false, 
    message: "", 
    profileFetched: false,
    connections: [], 
    connectionRequest: [], 
};

const authSlice = createSlice({
    name: "auth", 
    initialState, 
    reducers: {
        reset: () => initialState,
        handleLoginUser: (state) => {
            state.message = "login";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.isError = false; 
            state.isSuccess = false; 
            state.isLoading = true; 
            state.message = "loading...";
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isError = false; 
            state.isLoading = false; 
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "login successfull";
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isError = true; 
            state.isSuccess = false; 
            state.isLoading = false; 
            state.loggedIn = false;
            state.message = action.payload;
        })
    },
});

export default authSlice.reducer; 