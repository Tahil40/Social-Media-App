import userModel from "../models/user.model";
import profileModel from "../models/profile.model";
import bcrypt from "bcrypt";
import crypto from "crypto";

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
    const {email, password} = req.body; 

    if(!email || !password) {
        return res.status(400).json({error: "All fields are required"});
    };

    const user = userModel.findOne({email});

    if(!user){
        return res.status(404).json({error: "User not found"});
    }; 

    const is_password_match = await bcrypt.compare(password, user.password);
    
    if(!is_password_match){
        return res.status(400).json({error: "Invalid credentials"});
    };

    const token = crypto.randomBytes(32).toString("hex");
    // user.token = token;    
    // await user.save();
    await userModel.updateOne({_id: user._id}, {token});

    return res.status(200).json({message: "Login Successfull", token});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};