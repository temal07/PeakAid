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

        if (req.query.blogId) {
            query._id = req.query.blogId;
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

export const deleteBlogs = async (req, res, next) => {
    console.log(req.user.id);
    console.log(req.params.userId);
    console.log(req.params.blogId);

    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this blog.'));
    }
    
    try {
        // Get the blog's id
        const blog = await Blog.findById(req.params.blogId);

        if (!blog) {
            return next(errorHandler(404, 'Blog not found...'));
        }
        

        await Blog.findByIdAndDelete(req.params.blogId);
        // Decrement the amountOfBlog field in the user schema
        await User.updateOne(
            { _id: req.user.id },
            { $inc: { amountOfBlog: -1 } }
        );
        // Verify the update by fetching the user
        const updatedUser = await User.findById(req.user.id);
        console.log("Updated User:", updatedUser);

        res.status(200).json('The blog has been deleted successfully.');   
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}

export const updateBlog = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this blog...'));
    }

    try {
        const blogToUpdate = await Blog.findByIdAndUpdate(
            req.params.blogId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    image: req.body.image,
                }
            }, 
            { new: true }
        );
        res.status(200).json(blogToUpdate);
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}