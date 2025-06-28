import React, { useEffect } from "react";
import { useTransactions } from "../store/Transactions";

const RecentExpenses = () => {
  const { Transactions, fetchTransactions } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const recentTransactions = Array.isArray(Transactions)
    ? [...Transactions]
        .sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt) -
            new Date(a.updatedAt || a.createdAt)
        )
        .slice(0, 5)
    : [];

  return (
    <div className="card" style={{ width: "45rem" }}>
      <div className="card-header bg-dark text-light">RecentTransactions</div>
      <ul className="list-group list-group-flush">
        {recentTransactions.length === 0 ? (
          <li className="list-group-item">No transactions found.</li>
        ) : (
          recentTransactions.map((t) => (
            <li className="list-group-item" key={t._id}>
              {t.title} - ₹{t.amount} ({t.type})
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentExpenses;
