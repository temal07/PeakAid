/*
    This is the route where I 
    will let Gemini AI create
    a weekly plan
*/  
import express from 'express';
import { generativeGeminiAI } from '../controllers/generativeAIController.js';
import { saveResponse } from '../controllers/saveResponse.js';
import { deleteResponse } from '../controllers/deleteResponse.js';

const router = express.Router();

router.post('/generate-plan', generativeGeminiAI);
router.post('/save-response', saveResponse);
router.delete('/save-response', deleteResponse);

export default router;