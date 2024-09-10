"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = () => {
    const [hitData, setHitData] = useState(35);
    const [missData, setMissData] = useState(5)

  const pieChart = {
    series: [hitData, missData],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Hit", "Miss"], // Labels for the pie slices
      colors: [ 
        "#008FFB",
        "#00E396", 
      ],
      legend: {
        position: "right", // Position of the legend
        horizontalAlign: "center", // Aligns legend horizontally
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
        },
      },
    },
  };
  return (
    <div className="w-[803px] h-[502px] rounded-[6px] flex flex-col overflow-auto shadow-lg">
      <div className="flex items-center pl-[18px] h-[53px] w-full border-b-2 text-[16px]">
        <h1>FFP Hit vs Miss: 01/01/2024 - 08/14/2024</h1>
      </div>
      <div className="h-full w-full flex justify-center items-center">
        <Chart
          options={pieChart.options}
          series={pieChart.series}
          type="pie"
          width="539px"
          height="389px"
        />
      </div>
    </div>
  );
};

export default PieChart;
