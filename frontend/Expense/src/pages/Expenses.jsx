import React, { useEffect,useState } from "react";
import { useTransactions } from "../store/Transactions";
import UpdateTransaction from "./UpdateTransaction";

const Expenses = () => {
  const { Transactions, fetchTransactions,deleteTransaction,updateTransactions } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedTransaction, setUpdatedTransaction] = useState(null);

  const handleDelete=async(item)=>{
    console.log(item);
    const res = await deleteTransaction(item._id);
    console.log(res);
    if(res && res.success){
        fetchTransactions();
    }
  }



  const handleUpdate = async(item)=>{
  console.log(item);
  setShowUpdateModal(true);
  setUpdatedTransaction(item);
  }

  

  return (
    <>{showUpdateModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <UpdateTransaction
        transaction={updatedTransaction}
        onClose={() => setShowUpdateModal(false)}
      />
    </div>
  </div>
)}
    <div className="card" style={{ width: "60rem" }}>
      <div className="card-header bg-dark text-light">All Transactions</div>
      <ul className="list-group list-group-flush">
        {/* Table Heading */}
        <li className="list-group-item">
          <div className="row fw-bold">
            <div className="col">Title</div>
            <div className="col">Type</div>
            <div className="col ">Amount</div>
            <div className="col">Date</div>
            <div className="col-auto"></div>
            <div className="col-auto"></div>
            <div className="col-auto"></div>
            <div className="col-auto"></div>
            <div className="col-auto"></div>
            <div className="col-auto"></div>
          </div>
        </li>
        {/*Table Body*/}
        {Array.isArray(Transactions) && Transactions.length === 0 ? (
          <li className="list-group-item">No transactions found.</li>
        ) : (
          Transactions.map((t) => (
            <li className="list-group-item" key={t._id}>
              <div className="row align-items-center">
                <div className="col">{t.title}</div>
                <div className="col">{t.type}</div>
                <div className="col">₹{t.amount}</div>
                <div className="col">{new Date(t.date).toLocaleDateString()}</div>
                <div className="col-auto">
                  <div className="btn btn-danger" onClick={()=>handleDelete(t)}>Delete</div>
                </div>
                <div className="col-auto">
                  <div className="btn btn-success"onClick={()=>{handleUpdate(t)}}>Edit</div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
    </>
  );
};
export default Expenses;
