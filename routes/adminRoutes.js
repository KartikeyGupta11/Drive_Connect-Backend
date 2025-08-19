import express from 'express';
import {getPendingInstructorRequests, approveInstructorRequest, rejectInstructorRequest, getAdminProfile, createOrUpdateAdminProfile, checkProfileCompleteness} from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/pending-instructors', getPendingInstructorRequests);
router.post('/approve-instructor/:id', approveInstructorRequest);
router.post('/reject-instructor/:id', rejectInstructorRequest);
router.get('/ShowAdmin/:id', getAdminProfile);
router.post('/updateAdmin/:id', createOrUpdateAdminProfile);
router.get('/profile-completeness-Admin/:id', checkProfileCompleteness);

export default router;
