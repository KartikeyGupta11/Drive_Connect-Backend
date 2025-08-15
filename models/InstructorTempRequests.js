import mongoose from 'mongoose';

const instructorRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  firstName:{
    type: String,
    required: true,
    trim: true
  },
  lastName:{
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
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

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reason: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('InstructorRequest', instructorRequestSchema);