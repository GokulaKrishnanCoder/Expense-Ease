import { Schema, model } from "mongoose";
const transactionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["Income", "Expense"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdmail: { type: Schema.Types.String, ref: "User" },
});
const Transaction = model("Transaction", transactionSchema);

export default Transaction;
