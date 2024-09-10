"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const HorizontalChart = () => {

  // Horizontal Chart data

  // data[0] = Maintech data
  // data[1] = ParkPlace data
  const [dataHorizontalChart, setData] = useState([23, 68]);
  const [sumHorizontal, setSumHorizontal] = useState(
    dataHorizontalChart.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
  );

  const barChartX = {
    options: {
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "88px",
          distributed: false,
          endingShape: "flat",
          colors: {
            barOpacity: "20%",
          },
        },
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      xaxis: {
        min: 0,
        max: 100,
        stepSize: 10,
      },
      colors: ["rgba(84, 122, 55, 0.85)", "rgba(226, 32, 64, 0.85)"],
      yaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: "Maintech",
          data: [((dataHorizontalChart[0] / sumHorizontal) * 100).toFixed(2)],
        },
        {
          name: "Parkplace",
          data: [((dataHorizontalChart[1] / sumHorizontal) * 100).toFixed(2)],
        },
      ],
    },
  };

  return (
      <div className="flex flex-col mb-[28px] overflow-auto flex-c b-0 shadow-lg rounded-[6px] h-[435px] w-[803px] mt-4">
        {/* horizontal bar chart component */}
        <div className="w-full border-b-2 p-3">
          <h1>SLA Hit Comparision 01/01/2024 - 08/14/2024</h1>
        </div>
        <div id="chart" className="p-4 inline-block">
          <Chart
            options={barChartX.options}
            series={barChartX.options.series}
            type="bar"
            width="744px"
            height="244spx"
          />
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-[50px] bottom-0 ">
          <div className="w-[13px] h-[13px] bg-[#547A37] rounded-[3px] mr-[4px] opacity-85"></div>
          <p className="text-[#ADB5BD] text-[12px] mr-[24px]">Maintech</p>
          <div className="w-[13px] h-[13px] bg-[#E22040] rounded-[3px] mr-[4px]"></div>
          <p className="text-[#ADB5BD] text-[12px] opacity-85">ParkPlace</p>
        </div>
      </div>
  );
};

export default HorizontalChart;
