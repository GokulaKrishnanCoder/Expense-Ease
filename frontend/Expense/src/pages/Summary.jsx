import React from "react";
import { useTransactions } from "../store/Transactions";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Summary = () => {
  const { Transactions } = useTransactions();

  const income = Transactions.filter((t) => t.type === "income").reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const expense = Transactions.filter((t) => t.type === "expense").reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const BarData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [income, expense],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };
  const dataByDate = {};
  Transactions.forEach(({ date, type, amount }) => {
    const d = new Date(date).toISOString().split("T")[0];
    if (!dataByDate[d]) {
      dataByDate[d] = { income: 0, expense: 0 };
    }
    dataByDate[d][type] += amount;
  });
  const SortedDates = Object.keys(dataByDate).sort();

  const incomeLine = SortedDates.map((date) => dataByDate[date].income);
  const expenseLine = SortedDates.map((date) => dataByDate[date].expense);

  const LineData = {
    labels: SortedDates,
    datasets: [
      {
        label: "Income",
        data: incomeLine,
        borderColor: "#4caf50",
        backgroundColor: "#4caf5066",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expense",
        data: expenseLine,
        borderColor: "#f44336",
        backgroundColor: "#f4433666",
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const incomeTitleMap = {};
  Transactions.filter((t) => t.type === "income").forEach((t) => {
    incomeTitleMap[t.title] = (incomeTitleMap[t.title] || 0) + Number(t.amount);
  });
  const backgroundColors = [
    "#4caf50",
    "#f44336",
    "#2196f3",
    "#ff9800",
    "#9c27b0",
    "#00bcd4",
    "#e91e63",
    "#8bc34a",
    "#ffc107",
    "#795548",
    "#607d8b",
    "#3f51b5",
  ];

  const incomeLabels = Object.keys(incomeTitleMap);
  const incomeData = Object.values(incomeTitleMap);

  const IncomePieData = {
    labels: incomeLabels,
    datasets: [
      {
        label: "Titles By Income ",
        data: incomeData,
        backgroundColor: backgroundColors.slice(0, incomeLabels.length),
        borderWidth: 1,
      },
    ],
  };

  const expenseTitleMap = {};
  Transactions.filter((t) => t.type === "expense").forEach((t) => {
    expenseTitleMap[t.title] =
      (expenseTitleMap[t.title] || 0) + Number(t.amount);
  });

  const expenseLabels = Object.keys(expenseTitleMap);
  const expenseData = Object.values(expenseTitleMap);

  const ExpensePieData = {
    labels: expenseLabels,
    datasets: [
      {
        label: "Titles By Expense",
        data: expenseData,
        backgroundColor: backgroundColors.slice(0, expenseLabels.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <>
      <h5 className="font-semibold">Transaction Trend By Date</h5>
      <div
        className="card p-2 mb-2 w-100"
        style={{
          
          minWidth: 0,
          height: 350, 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Line data={LineData} options={{ maintainAspectRatio: false }} />
      </div>
      <div className="row g-4">
        <div className="col-12 col-md-6 ">
          <h5 className="font-semibold">Income vs Expense</h5>
          <div
            className="card p-2 chart-container"
            style={{
              height: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bar data={BarData} options={options} style={{ height: "100%" }} />
          </div>
        </div>
        <div className="col-12 col-md-6 ">
          <div className="row h-100">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <h5 className="font-semibold">Income By Titles</h5>
              <div
                className="card p-2 chart-container"
                style={{
                  height: 250,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pie
                  data={IncomePieData}
                  options={options}
                  style={{ height: "100%" }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <h5 className="font-semibold">Expense By Titles</h5>
              <div
                className="card p-2 chart-container"
                style={{
                  height: 250,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pie
                  data={ExpensePieData}
                  options={options}
                  style={{ height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
