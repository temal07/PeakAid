import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to the Database

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB is connected to the app...');
}).catch((err) => {
    console.log(err);
})


const app = express();

app.listen(3000, () => {
    console.log('Server is up and listening on port 3000...');
});
