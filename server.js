import { connectDB } from "./config/db.js";
import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from "./routes/authRoutes.js";
import instructorRoutes from './routes/instructorRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import otpRoutes from "./routes/otpVerificationRoutes.js";

const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
// app.use(cors({
//     origin: 'https://your-netlify-site.netlify.app', // your frontend domain
//     credentials: true
//   }));
app.use(express.json());

// ✅ Static file serving for uploaded images/docs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/otp', otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
