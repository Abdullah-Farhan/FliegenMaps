'use client'
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const VerticalChart = () => {
  // Vertical Chart Data
  const [ratingsMaintech, setRatingsMaintech] = useState([1, 2, 3, 4, 5]);
  const avgMaintechRating =
    ratingsMaintech.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / ratingsMaintech.length;

  const [ratingsParPlace, setRatingsParkPlace] = useState([5, 4, 5, 5]);
  const avgParkPlaceRating =
    ratingsParPlace.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / ratingsParPlace.length;
  const barChartY = {
    options: {
      plotOptions: {
        bar: {
          columnWidth: "60px",
        },
      },
      series: [
        {
          name: "Ratings",
          data: [
            {
              x: "Maintech",
              y: avgMaintechRating,
              fillColor: "rgba(109, 142, 85, 1.0)",
            },
            {
              x: "ParkPlace",
              y: avgParkPlaceRating,
              fillColor: "rgba(230, 65, 92, 1.0)",
            },
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
          },
        },
      },
      colors: ["rgba(109, 142, 85, 0.85)", "rgba(230, 65, 92, 0.85)"],
      
      xaxis: {
        type: "category",
      },
      chart: {
        toolbar:{
            show:false
        }
      }
    },
  };

  return (
      <div className="flex-col b-0 shadow-lg rounded-[6px] mb-10 h-[435px] w-[802px] mt-4 overflow-auto flex">
        <div className="w-full border-b-2 p-3 h-[53px] flex items-center">
          <h1>Overall Communication</h1>
        </div>
        <div className="p-4 inline-block mt-[16px]">
          <Chart
            options={barChartY.options}
            series={barChartY.options.series}
            type="bar"
            width="774px"
            height="295px"
          />
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-[-25px] bottom-0 mb-[28px]">
          <div className="w-[13px] h-[13px] bg-[#6D8E55] rounded-[3px] mr-[4px] opacity-85"></div>
          <p className="text-[#ADB5BD] text-[12px] mr-[24px]">Maintech</p>
          <div className="w-[13px] h-[13px] bg-[#E6415C] rounded-[3px] mr-[4px]"></div>
          <p className="text-[#ADB5BD] text-[12px] opacity-85">ParkPlace</p>
        </div>
      </div>
  );
};

export default VerticalChart;
