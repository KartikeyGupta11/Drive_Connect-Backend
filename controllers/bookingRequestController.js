import BookingRequest from "../models/BookingRequest.js";

export const createBookingRequest = async (req, res) => {
    try {
      const {
        learner,
        learnerEmail,
        learnerContact,
        instructor,
        slots,
        totalFee,
      } = req.body;
  
      const newRequest = new BookingRequest({
        learner,
        learnerEmail,
        learnerContact,
        instructor,
        slots,
        totalFee,
      });
  
      await newRequest.save();
      res.status(201).json({ message: "Booking request created", request: newRequest });
    } catch (error) {
      res.status(500).json({ message: "Error creating request", error });
    }
};

export const getInstructorRequests = async (req, res) => {
  try {
    const { instructorId } = req.params;

    const requests = await BookingRequest.find({ instructor: instructorId });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const updated = await BookingRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    res.status(200).json({ message: "Status updated", request: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};
