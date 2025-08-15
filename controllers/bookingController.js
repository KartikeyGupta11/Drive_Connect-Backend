import BookingRequest from "../models/BookingRequest.js";
import {User} from "../models/User.js";
import InstructorProfile from "../models/InstructorProfile.js";

export const createBooking = async (req, res) => {
    try {
        const {instructorId, totalFee} = req.body;
        console.log(instructorId);

        if (!instructorId) {
            return res.status(400).json({ 
                message: "Missing required fields" 
            });
        }

        const instructor = await InstructorProfile.findOne({ _id: instructorId});
        if (!instructor) {
            return res.status(404).json({ 
                message: "Instructor not found or not approved" 
            });
        }

        const booking = new BookingRequest({
            learner: req.user._id,
            learnerName: req.user.name,
            learnerEmail: req.user.email,
            instructor: instructorId,
        });

        await booking.save();

        res.status(201).json({
            message: "Booking request created successfully",
            booking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ 
            message: "Server error" 
        });
    }
}

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await BookingRequest.find({ learner: req.user._id })
      .populate("instructor", "name fullName lastName email phone location fee experience")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching learner bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getInstructorBookings = async (req, res) => {
  try {
    const bookings = await BookingRequest.find({ instructor: req.user._id })
      .populate("learner", "name fullName lastName email phone location")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching instructor bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingRequest.find()
      .populate("learner", "name fullName lastName email phone location")
      .populate("instructor", "name fullName lastName email phone location fee experience")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};