import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTransactions } from "../store/Transactions";

ChartJS.register(ArcElement, Tooltip, Legend);

const ThisMonth = () => {
  const { Transactions, fetchTransactions } = useTransactions();

  const monthName = new Date().toLocaleString("default", { month: "long" });

  // If transactions aren't loaded yet, render loading state
  if (!Transactions || Transactions.length === 0) {
    return (
      <div
        className="card mx-1 p-4 w-100 d-flex align-items-center justify-content-center"
        style={{ height: "300px" }}
      >
        <h5>{monthName} Month Transactions</h5>
        <p>No Transacitons found</p>
      </div>
    );
  }

  // Process the data directly in render
  const incomeTitleMap = {};
  const expenseTitleMap = {};

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  
  try {
    Transactions.filter((t) => {
      const txDate = new Date(t.date);
   
      return (
        t.type === "Income" &&
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    }).forEach((t) => {
      incomeTitleMap[t.title] =
        (incomeTitleMap[t.title] || 0) + Number(t.amount);
    });
  } catch (err) {
    console.error("Error processing income transactions:", err);
  }

  try {
    Transactions.filter((t) => {
      const txDate = new Date(t.date);
      return (
        t.type === "Expense" &&
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    }).forEach((t) => {
      expenseTitleMap[t.title] =
        (expenseTitleMap[t.title] || 0) + Number(t.amount);
    });
  } catch (err) {
    console.error("Error processing expense transactions:", err);
  }

  const incomeLabels = Object.keys(incomeTitleMap);
  const expenseLabels = Object.keys(expenseTitleMap);
  const incomeData = Object.values(incomeTitleMap);
  const expenseData = Object.values(expenseTitleMap);

  const incomeColors = [
    "#81c784",
    "#66bb6a",
    "#4caf50",
    "#388e3c",
    "#2e7d32",
    "#1b5e20",
    "#a5d6a7",
    "#c8e6c9",
    "#9ccc65",
    "#aed581",
  ];
  const expenseColors = [
    "#ef9a9a",
    "#e57373",
    "#f44336",
    "#d32f2f",
    "#b71c1c",
    "#ffcdd2",
    "#e53935",
    "#ff8a65",
    "#ff7043",
    "#ff5722",
  ];

  const doubleDoughnutData = {
    labels: [...incomeLabels, ...expenseLabels],
    datasets: [
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: expenseColors.slice(0, expenseData.length),
        borderWidth: 1,
      },
      {
        label: "Income",
        data: incomeData,
        backgroundColor: incomeColors.slice(0, incomeData.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "50%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      className="card mx-1 p-md-4 w-100 d-flex align-items-center justify-content-center"
      style={{ height: "300px" }}
    >
      <h5>{monthName} Month Transactions</h5>
      <Doughnut data={doubleDoughnutData} options={options} />
    </div>
  );
};

export default ThisMonth;
