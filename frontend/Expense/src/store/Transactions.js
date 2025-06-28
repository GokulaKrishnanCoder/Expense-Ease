import { useEffect } from "react";
import { create } from "zustand";
import UpdateTransaction from "../pages/UpdateTransaction";

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
    const res = await fetch("/api/transactions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });
    const data = await res.json();
    set((state) => ({ Transactions: [...state.Transactions, data] }));
    return { success: true, message: "Successfully added" };
  },
  fetchTransactions: async () => {
    try {
      const res = await fetch("/api/transactions/");

      const data = await res.json();
      console.log(data);
      set({ Transactions: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteTransaction: async (tid) => {
    try {
      console.log(tid);
      const res = await fetch(`/api/transactions/delete/${tid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      set((state) => ({
        Transactions: state.Transactions.filter((T) => T._id != tid),
      }));
      return { success: true, message: data.message };
    } catch (err) {
      console.log(err);
    }
  },
  updateTransaction: async (tid, updatedTransaction) => {
    const res = await fetch(`/api/transactions/update/${tid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTransaction),
    });
    const data = await res.json();
    if (!data || !data._id) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      Transactions: state.Transactions.map((T) => (T._id === tid ? data : T)),
    }));
    return { success: true, message: "Updated Successfully" };
  },
}));
