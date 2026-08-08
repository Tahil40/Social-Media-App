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
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/create-account",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/auth/register-user", {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
      });

      if (response.data.ok) {
        return thunkAPI.fulfillWithValue(response.data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserProfile = createAsyncThunk(
  "user/get-userProfile",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get("/user/get-userProfile", {
        params: {
          token: user.token,
        },
      });

      if (response.data.ok) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchAllUser = createAsyncThunk(
  "user/get-all-users",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/user/get-user-profiles");

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const sendConnectionRequest = createAsyncThunk(
  "user/sendConnectionRequest",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post(
        "/user/send-connection-request",
        {
          token: user.token,
          connectionId: user.connectionId,
        },
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getConnectionRequest = createAsyncThunk(
  "user/getConnectionRequest",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get(
        "/user/get-my-connections-requests",
        {
          params: { token: user.token },
        },
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getMyConnectionsRequests = createAsyncThunk(
  "user/getMyConnectionsRequest",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get(
        "/user/get-my-connections-requests",
        {
          params: {
            token: user.token,
          },
        },
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const acceptConnectionRequest = createAsyncThunk(
  "user/acceptConnectionRequest",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post(
        "/user/connection-request-status",
        {
          token: user.token,
          connectionId: user.connectionId,
          action_type: user.action,
        },
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);