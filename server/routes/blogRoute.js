import express from 'express';
import { createBlog, getBlogs } from '../controllers/blogController.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create-blog', verifyUser, createBlog);
router.get('/get-blogs', getBlogs);

export default router;