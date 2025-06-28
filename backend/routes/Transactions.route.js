import express from 'express';
import { getTransactions, addTransaction, deleteTransaction,updateTransaction } from '../controllers/Transactions.controller.js';
const router = express.Router();

router.get('/', getTransactions);
router.post('/add', addTransaction);
router.delete('/delete/:id', deleteTransaction);
router.put('/update/:id', updateTransaction);

export default router;