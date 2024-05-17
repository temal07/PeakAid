import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import generateRoute from './routes/generateRoute.js';
import userRoute from './routes/userRoute.js';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB is connected to the app...');
}).catch((err) => {
    console.log(err);
})

const app = express();

// routes and middlewares
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/generate', generateRoute);
app.use('/api/user', userRoute);

// create an error handler middleware
// (the 'success' key is used in the frontend);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    }) 
});

app.listen(3000, () => {
    console.log('Server is up and listening on port 3000...');
});
