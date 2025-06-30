import express from 'express';
import {getPendingInstructorRequests, approveInstructorRequest, rejectInstructorRequest} from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/pending-instructors', getPendingInstructorRequests);
router.post('/approve-instructor/:id', approveInstructorRequest);
router.post('/reject-instructor/:id', rejectInstructorRequest);

export default router;
