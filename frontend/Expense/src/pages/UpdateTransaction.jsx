import React, { useState } from "react";
import { useTransactions } from "../store/Transactions";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateTransaction = ({ onClose ,transaction}) => {
  const { updateTransaction } = useTransactions();
  
  
  const [trans, setTrans] = useState(transaction ||{
    title: "",
    amount: "",
    type: "",
    date: "",
  });

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const tid = trans._id;
    const res = await updateTransaction(tid,trans);
    console.log(res);
    {res && onClose()};
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setTrans((prevTrans) => {
      return {
        ...prevTrans,
        [name]: value,
      };
    });
  }

  return (
    <>
      <div className="container ">
        <div className="row justify-content-center ">
          <div className="bg-light col-10 over">
            <form className="p-4 ">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  id="title"
                  value={trans.title}
                  onChange={handleChange}
                  
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  id="amount"
                  value={trans.amount}
                  onChange={handleChange}
                  
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  className="form-select"
                  id="type"
                  name="type"
                  value={trans.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={trans.date? trans.date.slice(0,10):""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-between gap-2 mt-3">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-dark"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTransaction;
