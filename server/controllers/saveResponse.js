import GeminiResponse from "../models/geminiModel.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { errorHandler } from "../utils/errorHandler.js";

export const saveResponse = async (req, res, next) => {
    try {
        const { saveInstantly, text } = req.body;
        // only save the response if the flag from frontend is true
        // before generating the actual text, save the text inside 
        // the MongoDB

        const savedGeminiResponse = new GeminiResponse({
            response: text,
        });

        if (saveInstantly === true) { 
            await savedGeminiResponse.save();
            res.status(200).json({ message: "The response has been successfully saved!"});
        } else {
            // Just provide the text:
            res.status(200).json({
                message: 'There was an error during the saving process. Please try again.',
            });
        }
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}