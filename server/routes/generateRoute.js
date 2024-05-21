/*
    This is the route where I 
    will let Gemini AI create
    a weekly plan
*/  
import express from 'express';
import { generativeGeminiAI, saveResponse, deleteResponse, getResponse } from '../controllers/geminiController.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/generate-plan', generativeGeminiAI);
router.post('/save-response/:responseId/:userId', verifyUser, saveResponse);
router.delete('/delete-response/:responseId/:userId', verifyUser, deleteResponse);
router.get('/view-responses/:userId', verifyUser, getResponse);

export default router;