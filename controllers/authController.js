import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER CONTROLLER
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      location,
      experience,
      availableSlots,
      fee,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      location,
      experience,
      availableSlots,
      fee,
    });

    if(role != "instructor") {
      user.isApproved = true;
    }
    
    await user.save();

    res.status(201).json({
      message: "Registered successfully, wait for admin approval",
      user: {
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User doesn't exist" });

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove password from user object
    const { password: pw, ...rest } = user._doc;

    res.status(200).json({
      message: "Login successful",
      token,
      user: rest,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
