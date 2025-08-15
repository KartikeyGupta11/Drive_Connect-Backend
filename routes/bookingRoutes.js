import express from 'express';
import {
  createBooking,
  getMyBookings,
  getInstructorBookings,
  getAllBookings
} from "../controllers/bookingController.js";
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/instructor', protect, getInstructorBookings);
router.get('/admin', protect, getAllBookings);

export default router;
