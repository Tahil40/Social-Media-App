import {configureStore} from "@reduxjs/toolkit";
import authReducer from  "./reducer/authReducer/AuthReducer.js";
import postReducer from "./reducer/postReducer/PostReducer.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
    }, 
});