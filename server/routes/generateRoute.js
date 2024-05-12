/*
    This is the route where I 
    will let Gemini AI create
    a weekly plan
*/  
import express from 'express';
import { generativeGeminiAI } from '../controllers/generativeAIController.js';

const router = express.Router();

router.post('/generate-plan', generativeGeminiAI);

export default router;