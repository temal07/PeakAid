import { errorHandler } from "../utils/errorHandler.js";

import { GoogleGenerativeAI } from '@google/generative-ai';


export const generativeGeminiAI = async (req, res, next) => {
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { prompt } = req.body;

    try {
        if (!prompt || prompt === "") {
            return next(errorHandler(400, 'Please enter a prompt'));
        }

        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const result = await model.generateContent(prompt);

        const response = result.response;
        const text = response.text();
        res.status(200).json({message: text});
    } catch (error) {
        next(errorHandler(500, 'Internal Server Error'));
    }
}
