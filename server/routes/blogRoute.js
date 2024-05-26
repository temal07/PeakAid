import express from 'express';
import { createBlog, deleteBlogs, getBlogs, updateBlog } from '../controllers/blogController.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create-blog', verifyUser, createBlog);
router.get('/get-blogs', verifyUser, getBlogs);
router.delete('/delete-blog/:blogId/:userId', verifyUser, deleteBlogs);
router.put('/update-blog/:blogId/:userId', verifyUser, updateBlog);

export default router;