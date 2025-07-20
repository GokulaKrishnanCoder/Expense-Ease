import Transaction from "../models/Transaction.model.js";

export const getTransactions = async (req, res) => {
  try {
    const query = {createdBy: req.user._id};
    const transactions = await Transaction.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const addTransaction = async (req, res) => {
  const { title, amount, type, date } = req.body;
  try {
    const newTransaction = await Transaction.create({
      title,
      amount,
      type,
      date,
      createdBy: req.user._id,
      createdmail: req.user.email,
    });
   
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
  
        const trans = await Transaction.findById(id);
        if(!trans) return res.status(404).json({message:"Transaction not found"});

        if( trans.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: 'Not allowed' });
        }
        await trans.deleteOne();
        res.json({message:"Transaction Deleted"})
  }catch(err){
    res.status(400).json({message:"Delete failed"});
  }
};
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount, type, date } = req.body;
  try {
    const trans = await Transaction.findById(id);
    if(!trans) return res.status(404).json({message:'Transaction not found'});
    if(trans.createdBy.toString()!== req.user._id.toString()){
        return res.status(403).json({ message: 'Not allowed' });
    }
    trans.title = title;
    trans.amount = amount;
    trans.type =type;
    trans.date = date;
    await trans.save();

    res.json(trans);
   
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
};
