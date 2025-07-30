import express from 'express';
import { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } from "../controllers/income.controller.js";

import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/add", protectRoute, addIncome);
router.get("/get", protectRoute, getAllIncome);
router.delete("/delete/:id", protectRoute, deleteIncome);
router.get("/downloadexcel", protectRoute, downloadIncomeExcel);

export default router;