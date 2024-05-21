import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createBlog = async (req, res, next) => {
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
        // Log the initial amountOfBlog
        const user = await User.findById(req.user.id);
        console.log(user);

        console.log("Initial amountOfBlog:", user.amountOfBlog);

        const updateResult = await User.updateOne(
            { _id: req.user.id },
            { $inc: { amountOfBlog: 1 } }
        );

        // Log the result of the update operation
        console.log("Update Result:", updateResult);

        // Verify the update by fetching the user
        const updatedUser = await User.findById(req.user.id);
        console.log("Updated User:", updatedUser);
        res.status(201).json(savedBlog);
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}

export const getBlogs = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        // Build the query object
        const query = {};

        if (req.query.userId) {
            query.userId = req.query.userId;
        }

        if (req.query.slug) {
            query.slug = req.query.slug;
        }

        if (req.query.postId) {
            query._id = req.query.postId;
        }

        if (req.query.searchTerm) {
            query.$or = [
                { title: { $regex: req.query.searchTerm, $options: 'i' } },
                { content: { $regex: req.query.searchTerm, $options: 'i' } }
            ];
        }

        const blogs = await Blog.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalBlogs = await Blog.countDocuments(query);

        res.status(200).json({ blogs, totalBlogs });
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    } 
}