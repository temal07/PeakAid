import express from 'express';
import { createBlog, deleteBlogs, getBlogs } from '../controllers/blogController.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create-blog', verifyUser, createBlog);
router.get('/get-blogs', verifyUser, getBlogs);
router.delete('/delete-blog/:blogId/:userId', verifyUser, deleteBlogs);

export default router;