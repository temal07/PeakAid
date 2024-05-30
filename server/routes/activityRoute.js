import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { getActivity } from '../controllers/activityController.js';

const router = express.Router();

router.get('/get-activity', verifyUser, getActivity);

export default router;