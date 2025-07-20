import express from 'express';
import { getTransactions, addTransaction, deleteTransaction,updateTransaction } from '../controllers/Transactions.controller.js';
const router = express.Router();
import auth from '../middleware/auth.js';


router.get('/get', auth,getTransactions);
router.post('/add',auth,addTransaction);
router.delete('/delete/:id',auth, deleteTransaction);
router.put('/update/:id',auth, updateTransaction);

export default router;