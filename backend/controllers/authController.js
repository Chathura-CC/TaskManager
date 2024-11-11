import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utills/jwt.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

// Signup controller: Register a new user
export const signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Save the user
    await user.save();

    // Generate a JWT token
    const token = generateToken(user._id, user.role);

    res.cookie("access_token", token, { httpOnly: true });

    // Send  response with user details
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Login controller:
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = generateToken(user._id, user.role);

    // Remove the password field
    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    res.cookie("access_token", token, { httpOnly: true, sameSite: "strict" });

    // Send success response with user details
    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token, // Add the token in the response
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Logout controller: Clear the JWT token cookie
export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logged out successfully" });
};

// Change Password controller
export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.userId;
  try {
    const dbUser = await User.findById(userId);
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the old password
    const isMatch = bcryptjs.compareSync(oldPassword, dbUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = bcryptjs.hashSync(newPassword, 10);

    // Update the user's password
    dbUser.password = hashedPassword;
    await dbUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error });
  }
};

// Get current user info
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user info", error });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
