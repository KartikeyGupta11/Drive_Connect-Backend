import transporter from '../config/mail.js';
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

// In-memory OTP store (used for temporary storage)
const otpStore = {};

// 1. Send OTP to user's email
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate OTP and expiration
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now

  // Store OTP in-memory
  otpStore[email] = { otp, expiresAt, verified: false };

  try {
    // Send email with OTP
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "OTP for Password Reset",
      html: `<p>Hello,</p><p>Your OTP for resetting your password is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP Send Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// 2. Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  // Check if OTP record exists
  if (!record) {
    return res.status(404).json({ message: "OTP not found or expired" });
  }

  // Check if OTP is expired
  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  // Check if OTP matches (string comparison)
  if (record.otp !== otp.toString()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Mark as verified
  otpStore[email].verified = true;

  res.status(200).json({ message: "OTP verified" });
};

// 3. Reset password (after successful OTP verification)
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const record = otpStore[email];

  // Check if OTP was verified
  if (!record || !record.verified) {
    return res.status(403).json({ message: "OTP not verified or expired" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Clean up OTP record
    delete otpStore[email];

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Error:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};
