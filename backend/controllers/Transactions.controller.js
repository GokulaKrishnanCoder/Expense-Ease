import Transaction from '../models/Transaction.model.js';

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) { 
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Server error" });
    }  
}
export const addTransaction = async (req, res) => {
    const {title,amount,type,date} = req.body;
    try {
        const newTransaction = new Transaction({title, amount, type, date});
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ message: "Server error" });
    }};
export const deleteTransaction = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Server error" });
    }
}
export const updateTransaction = async (req, res) => {
    const {id} = req.params;
    const {title, amount, type, date} = req.body;
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            {title, amount, type, date},
            {new: true}
        );
        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ message: "Server error" });
    }
}