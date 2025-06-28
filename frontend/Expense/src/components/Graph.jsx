import React from "react";
import { useTransactions } from "../store/Transactions";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "../App.css";

const Graph = () => {
  const { Transactions } = useTransactions();
  const dateCountMap = {};
  Transactions.forEach((t) => {
    const date = new Date(t.date).toISOString().split("T")[0];
    dateCountMap[date] = (dateCountMap[date] || 0) + 1;
  });
  const heatmapData = Object.entries(dateCountMap).map(([date, count]) => {
    return {
      date,
      count,
    };
  });
  console.log(heatmapData);

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  return (
    <>
      <div className="container p-0" >
        <div className="card p-3 mb-4">
          <h6 className="fw-semibold text-left mb-3">Transaction Heatmap</h6>
          <CalendarHeatmap
            startDate={oneYearAgo}
            endDate={today}
            values={heatmapData}
            classForValue={(value) => {
              if (!value) return "color-empty";
              if (value.count < 2) return "color-scale-1";
              if (value.count < 4) return "color-scale-2";
              if (value.count < 10) return "color-scale-3";
              return "color-scale-4";
            }}
            tooltipDataAttrs={(value) => ({
              "data-tooltip-id": "heatmap-tooltip",
              "data-tooltip-content": `${value.date} - ${
                value.count || 0
              } Transactions`,
            })}
            showWeekdayLabels={true}
          />
          <Tooltip id="heatmap-tooltip" />
        </div>
      </div>
    </>
  );
};

export default Graph;
