import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "@/config/axiosConfig/axioxConfig";

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/auth/login-user", {
        email: user.email,
        password: user.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        return thunkAPI.rejectWithValue({ message: "token not found" });
      }

      return thunkAPI.fulfillWithValue(response.data.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    };
  },
);  

export const registerUser = createAsyncThunk("user/create-account", async (user, thunkAPI) => {
  try{
    const response = await clientServer.post("/auth/register-user", {
      name: user.name, 
      username: user.username, 
      email: user.email, 
      password: user.password, 
    });

    if(response.data.ok){
      return thunkAPI.fulfillWithValue(response.data.message);
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); 
  };
});

export const fetchUserProfile = createAsyncThunk("user/get-userProfile", async (user, thunkAPI) => {
  try{
    const response = await clientServer.get("/user/get-userProfile", {
      params: {
        token: user.token,    
      },   
    });

    if(response.data.ok){
      return thunkAPI.fulfillWithValue(response.data);
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  };
});