import express from 'express';
import { signout } from '../controllers/userController.js';

const router = express.Router();

router.post('/signout', signout);

export default router;