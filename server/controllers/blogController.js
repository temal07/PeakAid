import Blog from "../models/blogModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createBlog = async (req, res, next) => {
    console.log(req.user);
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    // add a slug for seo purposes.
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newBlog = new Blog({
        userId: req.user.id,
        ...req.body,
        slug,
   });
    try {
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}