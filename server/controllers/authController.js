import User from '../models/userModel.js';
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    // save the username, email and password 
    // that come from req.body
    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password || 
        username === "" || 
        email ==="" || 
        password === ""
    ) {
        next(errorHandler(400, {message: 
            'All Fields are required'
        }));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    try {
        await newUser.save();
        res.status(201).json('Signup successful');
    } catch (error) {
        next(error);
    }
}