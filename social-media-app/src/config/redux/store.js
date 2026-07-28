import {configureStore} from "@reduxjs/toolkit";
import authReducer from  "./reducer/authReducer/AuthReducer.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }, 
});