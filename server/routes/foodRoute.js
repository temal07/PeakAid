import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { addFood, getFood, updateFood, deleteFood } from "../controllers/foodController.js";

const router = express.Router();

router.get('/get-food', verifyUser, getFood);
router.post('/add-food/:userId', verifyUser, addFood);
router.put('/update-food/:foodId/:userId', verifyUser, updateFood);
router.delete('/delete-food/:foodId/:userId', verifyUser, deleteFood);

export default router;