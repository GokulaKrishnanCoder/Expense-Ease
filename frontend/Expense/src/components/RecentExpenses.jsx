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
    <div className="card mx-1 w-100 h-100">
      <div className="card-header bg-dark text-light">RecentTransactions</div>
      <ul className="list-group list-group-flush h-100 align-items-stretch">
        {recentTransactions.length === 0 ? (
          <li className="list-group-item">No transactions found.</li>
        ) : (
          recentTransactions.map((t) => (
            <li className="list-group-item h-100" key={t._id}>
              <div className="row align-items-center h-100">
                {/* Title */}
                <div className=" fw-semibold col-4 px-1   h-100">
                  {t.title}
                </div>
                {/* Amount */}
                <div
                  className={`col-3 h-100 px-0  text-end ${
                    t.type === "Income" ? "text-success" : "text-danger"
                  }`}
                >
                  ₹{t.amount}
                </div>

                {/* Date */}
                <div className="col-5 h-100 px-1 text-end">
                  {new Date(t.date).toISOString().split("T")[0]}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentExpenses;
