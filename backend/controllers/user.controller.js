import userModel from "../models/user.model";
import profileModel from "../models/profile.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { convertUserProfileToPDF } from "../utils/profileToPDF.js";
import connectionsModel from "../models/connections.model.js";

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const register_user = new userModel({
      name,
      username,
      email,
      password: hashed_password,
    });
    const register_user_result = await register_user.save();

    const user_profile = new profileModel({ userId: register_user_result._id });
    await user_profile.save();

    return res.status(200).json({ message: "user registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const is_password_match = await bcrypt.compare(password, user.password);

    if (!is_password_match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    // user.token = token;
    // await user.save();
    await userModel.updateOne({ _id: user._id }, { token });

    return res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadProfilePicture = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await userModel.findOne({ token: token });

    if (!user) {
      return res.status(500).json({ error: "user not found" });
    }

    user.profilePicture = req.file.filename;
    await user.save();

    return res.status(200).json({ message: "Profile Picture Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { token, ...newUserData } = req.body;

    const user_token = await userModel.findOne({ token: token });

    if (!user_token) {
      return res.status(404).json({ message: "user not found invalid token" });
    }

    const { email, username } = newUserData;

    const user_email_username = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (user_email_username) {
      if (
        user_email_username ||
        String(user_email_username._id) !== String(user_token._id)
      ) {
        return res.status(400).json({ message: "user already exists" });
      }
    }

    Object.assign(user_token, newUserData);
    await user_token.save();

    return res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserAndProfile = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await userModel.findOne({ token: token });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const userProfile = await profileModel
      .findOne({ userId: user._id })
      .populate("userId", "name username email profilePicture");

    return res.json(userProfile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfileData = async (req, res) => {
  try {
    const { token, ...newProfileData } = req.body;

    const user = await userModel.findOne({ token: token });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const user_profile = await profileModel.findOne({ userId: user._id });

    Object.assign(user_profile, newProfileData);

    await user_profile.save();

    return res.status(200).json({ message: "profile updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUserProfiles = async (req, res) => {
  try {
    const profiles = await profileModel
      .find()
      .populate("userId", "name username email profilePicture");

    return res.status(200).json({ profiles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const downloadUserProfile = async (req, res) => {
  try {
    const userId = req.query.id;

    const userProfile = await profileModel
      .findOne({ userId: userId })
      .populate("userId", "name email username profilePicture");

    const user_profile_pdf = await convertUserProfileToPDF(userProfile);

    return res.status(200).json({ output_path: user_profile_pdf });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const sendConnectionRequest = async (req, res) => {
  try {
    const { token, connectionId } = req.body;

    const user = await userModel.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const connection_user = await userModel.findOne({ _id: connectionId });

    if (!connection_user) {
      return res.status(404).json({ message: "connection user not found" });
    }

    const existingRequest = await connectionsModel.findOne({
      userId: user._id,
      connectionId: connection_user._id,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already send" });
    }

    const newRequest = new connectionsModel({
      userId: user._id,
      connectionId: connection_user._id,
    });
    await newRequest.save();

    return res.status(200).json({ message: "Request send" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getMyConnectionsRequests = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await userModel.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const connections = await connectionsModel
      .find({ userId: user._id })
      .populate("connectionId", "name username email profilePicture");

    return res.status(200).json({ connections });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const fetchMyConnections = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await userModel.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const fetch_connections = await connectionsModel
      .find({ connectionId: user._id })
      .populate("userId", "name username email profilePicture");

    return res.status(200).json({ fetch_connections });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const connectionRequestStatus = async (req, res) => {
  try {
    const { token, status_type, requestId } = req.body;

    const user = await userModel.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const connection_user = await connectionsModel.findOne({ _id: requestId });

    if (!connection_user) {
      return res.status(404).json({ message: "connection not found" });
    }

    if (status_type == "accept") {
      connection_user.status = true;
    } else {
      connection_user.status = false;
    }

    await connection_user.save();

    return res.status(200).json({ message: "Request updated" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};