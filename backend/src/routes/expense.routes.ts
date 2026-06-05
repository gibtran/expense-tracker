import { Router } from "express";
import { createExpense, getExpenses, updateExpense, deleteExpense } from "../controllers/expense.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
router.use(authenticate); // all routes require authentication
router.get('/', getExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;