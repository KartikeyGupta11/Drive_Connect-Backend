import { User } from "../models/User.js";
import InstructorRequest from "../models/InstructorTempRequests.js";
import InstructorProfile from '../models/InstructorProfile.js';

export const getPendingInstructorRequests = async (req, res) => {
  try {
    const requests = await InstructorRequest.find({
      status: { $in: ['pending', 'notApproved'] }
    }).populate('userId', 'name email');

    const updatedRequests = requests.map((req) => {
      // const baseUrl = "http://localhost:5000/uploads/";
      const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;
      return {
        ...req.toObject(),
        profilePicUrl: req.profilePic ? baseUrl + req.profilePic : null,
        licenseFileUrl: req.drivingLicenseImage ? baseUrl + req.drivingLicenseImage : null,
        citizenIDFileUrl: req.citizenIdImage ? baseUrl + req.citizenIdImage : null,
        // Optional if you add carImage, carPaperwork later:
        carImageUrl: req.carImage ? baseUrl + req.carImage : null,
        carPaperworkUrl: req.carPaperwork ? baseUrl + req.carPaperwork : null,
      };
    });

    res.status(200).json(updatedRequests);
  } catch (err) {
    console.error("Error fetching instructor requests:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const approveInstructorRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await InstructorRequest.findById(id).populate('userId');
    if (!request || request.status !== 'pending') {
      return res.status(404).json({ message: 'Pending request not found' });
    }

    const user = request.userId;
    user.isApproved = true;
    await user.save();

    const newProfile = new InstructorProfile({
      userId: user._id,
      contactNumber: request.contactNumber,
      profilePic: request.profilePic,
      citizenIdImage: request.citizenIdImage,
      drivingLicenseImage: request.drivingLicenseImage,
      drivingExperience: 0,
      isApproved: true,
      isProfileCompleted: false,
      availableSlots: [],
      ratings: [],
      comments: [],

      // ✅ Vehicle fields
      vehicleName: request.vehicleName || '',
      vehicleType: request.vehicleType || '',
      vehicleNumber: request.vehicleNumber || '',
      vehicleImage: request.vehicleImage || '',
      vehiclePaperwork: request.vehiclePaperwork || ''
    });

    await newProfile.save();

    request.status = 'approved';
    await request.save();

    res.status(200).json({ message: 'Instructor approved and profile created' });
  } catch (err) {
    console.error("Approval error:", err);
    res.status(500).json({ message: 'Approval failed' });
  }
};


export const rejectInstructorRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const request = await InstructorRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const userId = request.userId;

    await InstructorRequest.deleteOne({ _id: id });
    await User.deleteOne({ _id: userId });
    await InstructorProfile.deleteOne({ userId });

    res.status(200).json({ message: 'Instructor request rejected and all related data deleted' });
  } catch (err) {
    console.error("Rejection error:", err);
    res.status(500).json({ message: 'Rejection failed' });
  }
};

