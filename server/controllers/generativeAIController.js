import { errorHandler } from "../utils/errorHandler.js";
import GeminiResponse from "../models/geminiModel.js";

import { GoogleGenerativeAI } from '@google/generative-ai';


export const generativeGeminiAI = async (req, res, next) => {
    const { prompt } = req.body;

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        if (!prompt || prompt === "") {
            return next(errorHandler(400, 'Please enter a prompt'));
        }
        
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return res.status(200).json({ message: text });

    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}
