/*
    This is the route where I 
    will let Gemini AI create
    a weekly plan
*/  
import express from 'express';
import { generativeGeminiAI, saveResponse, deleteResponse, getResponse } from '../controllers/geminiController.js';

const router = express.Router();

router.post('/generate-plan', generativeGeminiAI);
router.post('/save-response', saveResponse);
router.delete('/delete-response/:id', deleteResponse);
router.get('/view-responses', getResponse);

export default router;