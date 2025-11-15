import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import joi from "joi";

const registerSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const logInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { error } = registerSchema.validate({ username, email, password });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = await generateToken(newUser._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
        secure: false,
      });
      res.status(201).json({
        success: true,
        message: "Registration successful",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const LogInUser = async (req, res) => {
  const { email, password } = req.body;
  const { error } = logInSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  try {
    const getUser = await User.findOne({ email });
    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "This Email is worng",
      });
    }
    const checkPassword = await bcrypt.compare(password, getUser.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Worng Password",
      });
    }
    const token = generateToken(getUser._id);
    res.cookie("token", token, {
      httpOnly: false, 
      secure: false, 
      sameSite: "lax", 
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
    });

    return res.status(200).json({
      success: true,
      message: "User has been logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to log out",
    });
  }
};
