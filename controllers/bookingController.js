import { Booking } from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const { instructorId, date, time } = req.body;
  try {
    const newBooking = new Booking({
      learnerId: req.user._id,
      instructorId,
      date,
      time
    });
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking" });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ learnerId: req.user._id }).populate('instructorId', 'name email phone');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
