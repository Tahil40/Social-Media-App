import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, fetchUserProfile, fetchAllUser } from "../../action/authAction/AuthAction";

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  isTokenThere: false, 
  // profileFetched: false,
  profileFetched: true, //for testing purpose....
  allProfilesFetched: false, 
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
    setIsTokenThere: (state) => {
      state.isTokenThere = true; 
    },
    setNotIsTokenThere: (state) => {
      state.isTokenThere = false; 
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
        state.profileFetched = true; 
        state.user = action.payload.profile; 
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
      })
      .addCase(fetchAllUser.pending, (state) => {
        state.isLoading = true; 
        state.isError = false; 
        state.isSuccess = false; 
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.isError = false; 
        state.isSuccess = true; 
        state.allProfilesFetched = true; 
        state.user = action.payload.profiles; 
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.isError = true; 
        state.isLoading = false; 
        state.isSuccess = false; 
        state.message =  action.payload.message; 
      });
  },
});

export const {reset, handleLoginUser, emptyMessage, setIsTokenThere, setNotIsTokenThere} = authSlice.actions; 
export default authSlice.reducer;