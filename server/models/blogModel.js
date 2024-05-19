import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    blogImage: {
        type: String, 
        default: `https://green.org/wp-content/uploads/2024/01/
        bodyshot-bodyshotperformance-health-fitness-nutrition-personalisation-
        successtips-focus-findyourwhy-performance-1-1-o8zgc66du6n5t2nyqpo5gebwdp7gz3uvenck4w3ncw.jpg`
    },
    title: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true,
});

const Blog = mongoose.Model('Blog', blogSchema);

export default Blog;