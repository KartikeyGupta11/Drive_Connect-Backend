import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,       // your email
    pass: process.env.MAIL_PASS,       // your email password or app password
  },
});

export default transporter;
