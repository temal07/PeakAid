import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';

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

app.listen(3000, () => {
    console.log('Server is up and listening on port 3000...');
});
