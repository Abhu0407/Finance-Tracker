import express from 'express';
import { addExpense, getAllExpense, deleteExpense, downloadExpenseExcel } from "../controllers/expense.controller.js";

import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/add", protectRoute, addExpense);
router.get("/all", protectRoute, getAllExpense);
router.delete("/:id", protectRoute, deleteExpense);
router.get("/downloadexcel", protectRoute, downloadExpenseExcel);

export default router;