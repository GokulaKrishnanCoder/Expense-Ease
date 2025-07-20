import React, { useEffect, useState } from "react";
import { useTransactions } from "../store/Transactions";
import UpdateTransaction from "./UpdateTransaction";

const Expenses = () => {
  const { Transactions, fetchTransactions, deleteTransaction } =
    useTransactions();

  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedTransaction, setUpdatedTransaction] = useState(null);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [type, date, month, year, searchValue, Transactions]);

  const applyFilters = () => {
    let filtered = Transactions;

    if (type && type !== "all") {
      filtered = filtered.filter((t) => t.type === type);
    }

    if (date) {
      filtered = filtered.filter(
        (t) => new Date(t.date).getDate() === parseInt(date)
      );
    }

    if (month) {
      filtered = filtered.filter(
        (t) => new Date(t.date).getMonth() + 1 === parseInt(month)
      );
    }

    if (year) {
      filtered = filtered.filter(
        (t) => new Date(t.date).getFullYear() === parseInt(year)
      );
    }

    if (searchValue.trim()) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setResult(filtered);
  };

  const handleDelete = async (item) => {
    const res = await deleteTransaction(item._id);
    if (res?.success) {
      fetchTransactions();
    }
  };

  const handleSearch = (value) => {
    const filtered = result.filter((trans) =>
      trans.title.toLowerCase().includes(value.toLowerCase())
    );
    setResult(filtered);
  };

  const clearFilters = () => {
    fetchTransactions();
    setResult(Transactions);
    setDate("");
    setMonth("");
    setYear("");
    setSearchValue("");
    setType("");
  };

  const handleUpdate = (item) => {
    setShowUpdateModal(true);
    setUpdatedTransaction(item);
  };

  return (
    <div className="container-fluid px-1 ">
      {showUpdateModal && (
        <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
          <div className="modal-content p-4 rounded shadow">
            <UpdateTransaction
              transaction={updatedTransaction}
              onClose={() => setShowUpdateModal(false)}
            />
          </div>
        </div>
      )}
      <div className="row mb-3">
        <h5 className="col  ">Manage Your Transactions</h5>

        <div className=" col-md-4 offset-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="all">Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m, i) => (
              <option key={i + 1} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6 col-md-2">
          <select
            className="form-select mb-3"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-12 col-md-3">
          <button className="btn btn-dark w-100" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white fw-semibold">
          All Transactions
        </div>
        <ul className="list-group list-group-flush">
          {result.length === 0 ? (
            <li className="list-group-item text-center text-muted">
              No transactions found.
            </li>
          ) : (
            result.map((t) => (
              <li className="list-group-item" key={t._id}>
                <div className="row align-items-center">
                  <div className="col-md-3 mb-1 d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">{t.title}</span>
                    <span
                      className={`badge ${
                        t.type === "Income" ? "bg-success" : "bg-danger"
                      }`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {t.type}
                    </span>
                  </div>

                  <div className="col-md-3 mb-1 text-md-center">
                    ₹{t.amount}
                  </div>
                  <div className="col-md-3 mb-1 text-md-center">
                    {new Date(t.date).toLocaleDateString()}
                  </div>
                  <div className="col-md-3 d-flex  gap-2 mb-1 justify-content-start justify-content-md-center align-items-center">
                    <button
                      className="btn btn-sm btn-outline-dark text-md-center "
                      onClick={() => handleDelete(t)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-outline-dark text-md-center"
                      onClick={() => handleUpdate(t)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
