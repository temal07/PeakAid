import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { getActivity, addActivity, updateActivity, deleteActivity } from '../controllers/activityController.js';

const router = express.Router();

router.get('/get-activity', verifyUser, getActivity);
router.post('/add-activity/:userId', verifyUser, addActivity);
router.put('/update-activity/:activityId/:userId', verifyUser, updateActivity);
router.delete('/delete-activity/:activityId/:userId', verifyUser, deleteActivity);

export default router;