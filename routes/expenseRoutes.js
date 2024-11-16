import express from 'express';

import { createExpense,getAllExpenses,getFriendTransactions } from '../controllers/expenseontroller.js';

const router = express.Router();

router.post('/create', createExpense);
router.get('/get', getAllExpenses);
router.get('/friend-transactions', getFriendTransactions);

export default router;
