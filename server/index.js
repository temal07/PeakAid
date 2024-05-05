import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import { errorHandler } from './utils/errorHandler.js';

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
// create an error handler middleware;
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
