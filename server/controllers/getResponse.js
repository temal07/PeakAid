import { errorHandler } from "../utils/errorHandler.js";
import GeminiResponse from "../models/geminiModel.js";

export const getResponse = async (req, res, next) => {
    try {
        const geminiResponses = await GeminiResponse.find();
        res.status(200).json(geminiResponses);
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));        
    }
}