import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';

export const verifyUser = (req, res, next) => {
    // We need this function to put the user's id 
    // to req.user so that we can access the user 
    // from other middlewares 

    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            return next(errorHandler(401, 'Unauthorized'));
        }
        
        req.user = user;
        next();
    });
}