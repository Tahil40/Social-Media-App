import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, fetchUserProfile } from "../../action/authAction/AuthAction";

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
    },
    emptyMessage: (state) => {
      state.message = ""; 
    },
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
        state.message = {
          message: "login successfull",
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.loggedIn = false;
        state.message = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = {
          message: "Registration Successfull, Please login",
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.loggedIn = false;
        state.message = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isError = false; 
        state.isSuccess = false;
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = {
          message: "Profile fetched",
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});


export const {reset, handleLoginUser, emptyMessage} = authSlice.actions; 
export default authSlice.reducer;