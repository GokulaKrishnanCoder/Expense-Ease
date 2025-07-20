import React, { useEffect, useState } from "react";
import { useTransactions } from "../store/Transactions";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "../App.css";

const Graph = () => {
  const { Transactions } = useTransactions();
  const dateCountMap = {};

  const [startDate,serStartDate] = useState(new Date());

  useEffect(()=>{
    const today = new Date();
    const newStartDate = new Date();
    if(window.innerWidth<768){
      newStartDate.setMonth(today.getMonth()-6);
    }else{
      newStartDate.setFullYear(today.getFullYear()-1);
    }
    serStartDate(newStartDate);
  },[]);
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

  

  const today = new Date();
  
  
  return (
    <>
      <div className="container-fluid px-1 mt-2">
        <div className="card p-1 p-md-2 mb-4">
          <h5 className="fw-semibold text-left mb-3">Transaction Heatmap</h5>
          <CalendarHeatmap
            startDate={startDate}
            endDate={today}
            values={heatmapData}
            classForValue={(value) => {
              if (!value) return "color-empty";
              if (value.count < 2) return "color-scale-1";
              if (value.count < 4) return "color-scale-2";
              if (value.count < 10) return "color-scale-3";
              return "color-scale-4";
            }}
            tooltipDataAttrs={(value) => {
              if (!value || !value.date) {
                return {
                  "data-tooltip-id": "heatmap-tooltip",
                  "data-tooltip-content": "",
                };
              }
              return {
                "data-tooltip-id": "heatmap-tooltip",
                "data-tooltip-content": `${value.date} - ${
                  value.count || 0
                } Transactions`,
              };
            }}
            showWeekdayLabels={true}
          />
          <Tooltip id="heatmap-tooltip" />
        </div>
      </div>
    </>
  );
};

export default Graph;
