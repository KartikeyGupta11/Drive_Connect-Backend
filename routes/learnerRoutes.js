import express from 'express';
import { getAllLearners } from '../controllers/learnerController.js';

const router = express.Router();
router.get('/', getAllLearners);

export default router;