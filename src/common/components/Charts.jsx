"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = () => {

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

  // Vertical Chart Data
  const [ratingsMaintech, setRatingsMaintech] = useState([1, 2, 3, 4, 5]);
  const avgMaintechRating = ratingsMaintech.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )/ratingsMaintech.length;

  const [ratingsParPlace, setRatingsParkPlace] = useState([5, 5 , 5, 5]);
  const avgParkPlaceRating = ratingsParPlace.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )/ratingsParPlace.length;

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
      colors: ["rgba(109, 142, 85, 0.85)", "rgba(230, 65, 92, 0.85)"],
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

  const barChartY = {
    options: {
      plotOptions:{
        bar: {
          columnWidth: '60px'
        }
      },
      series: [
        {
          name: "Ratings",
          data: [
            { x: "Maintech", y: avgMaintechRating, fillColor: "rgba(109, 142, 85, 1.0)" },
            { x: "ParkPlace", y: avgParkPlaceRating, fillColor: "rgba(230, 65, 92, 1.0)" },
          ],
        },
      ],
      yaxis: {
        min: 0,
        max: 5,
        labels: {
          formatter: function (value) {
            // Return custom label based on the value
            switch (value) {
              case 0:
                return "";
              case 1:
                return "Very Dissatisfied (1)";
              case 2:
                return "Dissatisfied (2)";
              case 3:
                return "Indifferent (3)";
              case 4:
                return "Satisfied (4)";
              case 5:
                return "Very Satisfied (5)";
              default:
                return value;
            }
        }
      },
    },
      colors: ["rgba(109, 142, 85, 0.85)", "rgba(230, 65, 92, 0.85)"],
      legend: {
        show: false,
      },
      xaxis: {
        type: "category",
      },
    },
  };

  return (
    <div>
      {/* horizontal bar chart component */}
      <div className="inline-block b-0 shadow-lg rounded-[6px] h-[435px]">
        <div className="w-full border-b-2 p-3">
          <h1>SLA Hit Comparision 01/01/2024 - 08/14/2024</h1>
        </div>
        <div className="p-4 inline-block">
          <Chart
            options={barChartX.options}
            series={barChartX.options.series}
            type="bar"
            width="802px"
            height="244spx"
          />
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-[40px] bottom-0 ">
          <div className="w-[13px] h-[13px] bg-[#6D8E55] rounded-sm mr-[4px] opacity-85"></div>
          <p className="text-[#ADB5BD] text-[12px] mr-[24px]">Maintech</p>
          <div className="w-[13px] h-[13px] bg-[#E6415C] rounded-sm mr-[4px]"></div>
          <p className="text-[#ADB5BD] text-[12px] opacity-85">ParkPlace</p>
        </div>
      </div>
      {/* vertical bar chart component - review chart */}
      <div className="inline-block b-0 shadow-lg rounded-[6px] mb-10 h-[444px] mt-4">
        <div className="w-full border-b-2 p-3 h-[53px] flex items-center">
          <h1>Overall Communication</h1>
        </div>
        <div className="p-4 inline-block mt-[16px]">
          <Chart
            options={barChartY.options}
            series={barChartY.options.series}
            type="bar"
            width="802px"
            height="295px"
          />
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-[-25px] bottom-0 mb-[28px]">
          <div className="w-[13px] h-[13px] bg-[#6D8E55] rounded-sm mr-[4px] opacity-85"></div>
          <p className="text-[#ADB5BD] text-[12px] mr-[24px]">Maintech</p>
          <div className="w-[13px] h-[13px] bg-[#E6415C] rounded-sm mr-[4px]"></div>
          <p className="text-[#ADB5BD] text-[12px] opacity-85">ParkPlace</p>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
