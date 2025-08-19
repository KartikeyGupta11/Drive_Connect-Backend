// models/AdminProfile.js
import mongoose from "mongoose";

const adminProfileSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    aadhaarCard: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
  },
  { timestamps: true }
);

const AdminProfile = mongoose.model("AdminProfile", adminProfileSchema);
export default AdminProfile;
