import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';

export const userMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
        try {
            // verify the jwt token

            const decoded = jwt.verify(token, process.env.JWT_TOKEN);

            req.user = { userId: decoded.userId }
        } catch (error) {
            // Handle JWT verification errors
            if (error instanceof jwt.JsonWebTokenError) {
                return next(errorHandler(401, 'Invalid token'));
            } else if (error instanceof jwt.TokenExpiredError) {
                return next(errorHandler(401, 'Token expired'));
            } else {
                // Handle other types of errors
                return next(errorHandler(500, 'Internal server error'));
            }
        }
    }
}