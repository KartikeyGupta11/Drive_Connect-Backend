import express from 'express';
import {
  getAllInstructors,
  createInstructorProfile,
  getInstructorProfile,
  updateInstructorProfile,
  createInstructorRequest
} from '../controllers/instructorController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// 📘 Instructor profile routes
router.get('/', getAllInstructors);
router.post('/create-profile', createInstructorProfile);
router.get('/get-profile/:userId', getInstructorProfile);
router.put('/update-profile/:userId', updateInstructorProfile);

// 📘 Instructor request with profile and vehicle file uploads
router.post(
  '/create-request',
  upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'citizenIDFile', maxCount: 1 },
    { name: 'licenseFile', maxCount: 1 },
    { name: 'vehicleImage', maxCount: 1 },
    { name: 'vehiclePaperwork', maxCount: 1 }
  ]),
  createInstructorRequest
);

export default router;
