import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  fullName:{
    type: String,
  },
  lastName:{
    type: String,
  },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'instructor', 'learner'], default: 'learner' },
  phone: String,
  location: String,
  isApproved: { type: Boolean, default: false },
  experience: String,
  availableSlots: [String],
  fee: Number
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
