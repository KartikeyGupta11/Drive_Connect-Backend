import mongoose from 'mongoose';

const instructorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  contactNumber: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid contact number!`
    }
  },
  profilePic: { type: String, default: '' },
  isApproved: { type: Boolean, default: false },
  isProfileCompleted: { type: Boolean, default: false },
  drivingExperience: { type: Number, required: true },
  citizenIdImage: { type: String },
  drivingLicenseImage: { type: String },

  // ✅ Vehicle Fields
  vehicleNumber: { type: String, default: '' },
  vehicleName: { type: String, default: '' },
  vehicleType: {
    type: String,
    enum: ['bike', 'scooty', 'car', ''],
    default: ''
  },
  vehicleImage: { type: String, default: '' },
  vehiclePaperwork: { type: String, default: '' },

  availableSlots: [
    {
      day: String,
      slots: [String]
    }
  ],
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number
    }
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model('InstructorProfile', instructorProfileSchema);
