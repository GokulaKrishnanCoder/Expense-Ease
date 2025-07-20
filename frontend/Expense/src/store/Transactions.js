import { useEffect } from "react";
import { create } from "zustand";
import UpdateTransaction from "../pages/UpdateTransaction";
import API from "../api";

export const useTransactions = create((set) => ({
  Transactions: [],
  

  setTransactions: (Transactions) => set({ Transactions }),

  createTransaction: async (newTransaction) => {
    if (
      !newTransaction.title ||
      !newTransaction.amount ||
      !newTransaction.type
    ) {
      return { success: false, message: "Please fill all fields" };
    }
    const res = await API.post("/transactions/add", newTransaction);
    const data = res.data;
    set((state) => ({ Transactions: [...state.Transactions, data] }));
   
    return { success: true, message: "Successfully added" };
  },
  fetchTransactions: async () => {
    try {
      const res = await API.get("/transactions/get");

      const data = res.data;
      set({ Transactions: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteTransaction: async (tid) => {
    try {
      console.log(tid);
      const res = await API.delete(`/transactions/delete/${tid}`);
      const data = res.data;
      set((state) => ({
        Transactions: state.Transactions.filter((T) => T._id != tid),
      }));
      return { success: true, message: data.message };
    } catch (err) {
      console.log(err);
    }
  },
  updateTransaction: async (tid, updatedTransaction) => {
    const res = await API.put(
      `/transactions/update/${tid}`,
      updatedTransaction
    );
    const data = res.data;
    if (!data || !data._id) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      Transactions: state.Transactions.map((T) => (T._id === tid ? data : T)),
    }));
    return { success: true, message: "Updated Successfully" };
  },
}));

