import GeminiResponse from "../models/geminiModel.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { errorHandler } from "../utils/errorHandler.js";

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

export const saveResponse = async (req, res, next) => {
    const { saveInstantly, text } = req.body;
    try {
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
                message: savedGeminiResponse.response,
            });
        }
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}

export const getResponse = async (req, res, next) => {
    try {
        const geminiResponses = await GeminiResponse.find();
        res.status(200).json(geminiResponses);
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));        
    }
}

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
