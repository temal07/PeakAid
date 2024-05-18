import GeminiResponse from "../models/geminiModel.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { errorHandler } from "../utils/errorHandler.js";

export const deleteResponse = async (req, res, next) => {
    const {id:responseID} = req.params;

    try {
        const response = await GeminiResponse.findByIdAndDelete(responseID);
        if (!response) {
            return next(errorHandler(404, `No responses with id ${responseID} found!`));
        }
        return res.status(200).json(`The response with the id number of ${responseID} has successfuly been deleted`);
    } catch (error) {
        console.error(error);
        next(errorHandler(error.statusCode, error.message));
    }
}