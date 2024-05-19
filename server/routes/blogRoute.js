import express from 'express';
import { createBlog } from '../controllers/blogController.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create-blog', verifyUser, createBlog);

export default router;