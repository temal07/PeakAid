import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { addWater, deleteWater, getWater, deleteWaterAmount, addWaterAmount, getSingleWater } from "../controllers/waterController.js";

const router = express.Router();

router.post('/add-water/:userId', verifyUser, addWater);
router.get('/get-water', verifyUser, getWater);
router.get('/view-water-info/:waterId/:userId', verifyUser, getSingleWater);
router.delete('/delete-water/:waterId/:userId', verifyUser, deleteWater);
router.put('/delete-water-amount/:waterId/:userId', verifyUser, deleteWaterAmount);
router.put('/add-water-amount/:waterId/:userId', verifyUser, addWaterAmount);

export default router;