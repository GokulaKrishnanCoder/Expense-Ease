import React, { useEffect, useState } from "react";
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
  const { Transactions, fetchTransactions } = useTransactions();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("None");

  useEffect(() => {
    fetchTransactions();
  }, []);
  const FilteredTransactions = Transactions.filter((t) => {
    const date = new Date();
    const txyear = date.getFullYear();
    const txmonth = date.getMonth() + 1;
    if (selectedMonth != "None") {
      return txyear === selectedYear && txmonth === Number(selectedMonth);
    }
    return txyear === selectedYear;
  });

  const income = FilteredTransactions.filter((t) => t.type === "Income").reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const expense = FilteredTransactions.filter(
    (t) => t.type === "Expense"
  ).reduce((sum, t) => sum + t.amount, 0);

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
  FilteredTransactions.forEach(({ date, type, amount }) => {
    const d = new Date(date).toISOString().split("T")[0];
    if (!dataByDate[d]) {
      dataByDate[d] = { Income: 0, Expense: 0 };
    }
    dataByDate[d][type] += amount;
  });
  const SortedDates = Object.keys(dataByDate).sort();

  const incomeLine = SortedDates.map((date) => dataByDate[date].Income);
  const expenseLine = SortedDates.map((date) => dataByDate[date].Expense);

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
  FilteredTransactions.filter((t) => t.type === "Income").forEach((t) => {
    incomeTitleMap[t.title] = (incomeTitleMap[t.title] || 0) + Number(t.amount);
  });

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const backgroundColors = (length) => {
    return Array.from({ length }, () => getRandomColor());
  };

  const incomeLabels = Object.keys(incomeTitleMap);
  const incomeData = Object.values(incomeTitleMap);

  const IncomePieData = {
    labels: incomeLabels,
    datasets: [
      {
        label: "Titles By Income ",
        data: incomeData,
        backgroundColor: backgroundColors(incomeLabels.length),
        borderWidth: 1,
      },
    ],
  };

  const expenseTitleMap = {};
  FilteredTransactions.filter((t) => t.type === "Expense").forEach((t) => {
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
        backgroundColor: backgroundColors(expenseLabels.length),
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
    <div className="container-fluid px-1">
      <div className="d-md-flex justify-content-between align-items-center mb-3">
        <h5 className=" font-semibold mb-2">
          Transaction Trend By Date
        </h5>
        <div className="d-flex row g-2 justify-content-between align-items-center">
          <div className="col-6">
            <select
              className="form-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="None">Month</option>
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
          <div className="col-6 ">
            <select
              className="form-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
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
        </div>
      </div>

      <div
        className="card p-md-2 mb-2 "
        style={{
          minWidth: 0,
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Line
          data={LineData}
          options={{
            scales: {
              x: {
                display: false,
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="row g-3 align-items-stretch">
        {/* Bar Chart - 6/10 */}
        <div className="col-12 col-md-6 d-flex">
          <div className="w-100 h-100 d-flex flex-column">
            <h5 className="font-semibold mb-2">Income vs Expense</h5>
            <div className="card p-md-2 flex-fill d-flex flex-column">
              <div
                style={{
                  flex: 1,
                  minHeight: 250,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bar
                  data={BarData}
                  options={options}
                  style={{ height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Income Pie Chart - 2/10 */}
        <div className="col-12 col-md-3 d-flex">
          <div className="w-100 h-100 d-flex flex-column">
            <h5 className="font-semibold mb-2">Income By Titles</h5>
            <div className="card p-md-2 flex-fill d-flex flex-column">
              <div
                style={{
                  flex: 1,
                  minHeight: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {FilteredTransactions && FilteredTransactions.length > 0 ? (
                  <Pie
                    data={IncomePieData}
                    options={options}
                    style={{ height: "100%" }}
                  />
                ) : (
                  <span className="font-semibold">No Transactions found</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Expense Pie Chart - 2/10 */}
        <div className="col-12 col-md-3 d-flex">
          <div className="w-100 h-100 d-flex flex-column">
            <h5 className="font-semibold mb-2">Expense By Titles</h5>
            <div className="card p-md-2  flex-fill d-flex flex-column">
              <div
                style={{
                  flex: 1,
                  minHeight: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {FilteredTransactions && FilteredTransactions.length > 0 ? (
                  <Pie
                    data={ExpensePieData}
                    options={options}
                    style={{ height: "100%" }}
                  />
                ) : (
                  <span className="font-semibold">No Transactions found</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
