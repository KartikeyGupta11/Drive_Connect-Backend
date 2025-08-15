import {User} from '../models/User.js';
import InstructorProfile from '../models/InstructorProfile.js';
import InstructorRequest from '../models/InstructorTempRequests.js';

export const getAllInstructors = async (req, res) => {
    try {
        const instructors = await InstructorProfile.find({isApproved: true});
        res.json(instructors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createInstructorProfile = async (req, res) => {
    try {
        const profile = await InstructorProfile.create(req.body);
        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getInstructorProfile = async (req, res) => {
    try {
        const profile = await InstructorProfile.findOne({ userId: req.params.userId }).populate('userId', 'name email');
        if (!profile) return res.status(404).json({ message: 'Instructor profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateInstructorProfile = async (req, res) => {
    try {
        const updated = await InstructorProfile.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createInstructorRequest = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      email,
      contactNumber,
      countryState,
      bio,
      vehicleName,
      vehicleType,
      vehicleNumber,
    } = req.body;

    const existingRequest = await InstructorRequest.findOne({ userId });
    if (existingRequest) {
      return res.status(400).json({ message: "A request is already in process." });
    }

    const profilePic = req.files?.profilePic?.[0]?.filename;
    const citizenIDFile = req.files?.citizenIDFile?.[0]?.filename;
    const licenseFile = req.files?.licenseFile?.[0]?.filename;

    if (!profilePic || !citizenIDFile || !licenseFile) {
      return res.status(400).json({ message: "All required documents must be uploaded." });
    }

    // Optional vehicle files
    const vehicleImage = req.files?.vehicleImage?.[0]?.filename || '';
    const vehiclePaperwork = req.files?.vehiclePaperwork?.[0]?.filename || '';

    const newRequest = new InstructorRequest({
      userId,
      firstName,
      lastName,
      email,
      contactNumber,
      profilePic,
      citizenIdImage: citizenIDFile,
      drivingLicenseImage: licenseFile,
      vehicleName: vehicleName || '',
      vehicleType: vehicleType || '',
      vehicleNumber: vehicleNumber || '',
      vehicleImage,
      vehiclePaperwork,
      status: "pending",
    });

    await newRequest.save();
    res.status(201).json({ message: "Request submitted successfully." });
  } catch (err) {
    console.error("Error in createInstructorRequest:", err);
    res.status(500).json({ message: "Failed to submit request." });
  }
};




