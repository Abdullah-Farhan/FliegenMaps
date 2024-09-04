"use client";
import React, { useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { usAea } from "@react-jvectormap/unitedstates";
import { worldMill } from "@react-jvectormap/world";

const Maps = () => {
  const countryNames = {
    US: 'United States',
    CA: 'Canada',
    GB: 'United Kingdom',
    DE: 'Germany',
    FR: 'France',
    IT: 'Italy',
    ES: 'Spain',
  };

  const regionStyle = {
    initial: {
      fill: "#00448C",
      "fill-opacity": 0.2,
      stroke: "none",
      "stroke-width": 0,
      "stroke-opacity": 0,
    },
    selected: {
      fill: '#00448C',
      "fill-opacity": 1.0,
    },
  };

  const [mapData, setMapData] = useState({
    "US-AL": 100,
    "US-AK": 200,
    "US-AZ": 300,
    "US-AR": 400,
  });
  
  const selectedRegionsUS = Object.keys(mapData).reduce((acc, key) => {
    acc[key] = { zoom: true };
    return acc;
  }, {});

  const [worldData, setWorldData] = useState({
    US: 100,
    CA: 200,
    GB: 300,
    DE: 400,
    FR: 500,
    IT: 600,
    ES: 700,
  });

  const selectedRegions = Object.keys(worldData).reduce((acc, key) => {
    acc[key] = { zoom: true };
    return acc;
  }, {});

  const series = {
    regions: [
      {
        values: mapData,
        scale: ["rgba(0, 68, 140, 0.2)", "rgba(0, 68, 140, 1.0)"],
        normalizeFunction: "polynomial",
      },
    ],
  };

  const worldSeries = {
    regions: [
      {
        values: worldData,
        scale: ["rgba(0, 68, 140, 0.2)", "rgba(0, 68, 140, 1.0)"],
        normalizeFunction: "polynomial",
      },
    ],
  };

  return (
    <div className="p-3">
      {/* div containing USA and the table of its data */}
      <div className="w-full h-[600px] flex flex-col md:flex-row mb-80 md:mb-5 ">
        {/* div containing the map side of USA */}
        <div className="md:w-[60%] h-full rounded-[6px] shadow-lg">
          <div className="w-full">
            <h1 className="p-3">Domestic Assets</h1>
            <div className="w-full h-[1px] bg-[#C9C9C9] "></div>
          </div>
          <div className="relative h-[444px] w-full">
            <VectorMap
              className="mt-3"
              map={usAea}
              backgroundColor="transparent"
              zoomOnScroll={false}
              containerStyle={{ width: "100%", height: "100%" }}
              regionStyle={regionStyle}
              series={series}
              selectedRegions={selectedRegionsUS}
            />
          </div>
        </div>
        {/* div containing the table side of USA */}
        <div className="md:w-[39%] mt-5 md:mt-0 shadow-lg rounded-[6px] h-full">
          <h1 className="p-3">States</h1>
          <div className="w-full h-[1px] bg-[#C9C9C9] "></div>
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                <th className="bg-[#15498A] text-white p-3 text-left w-[200px]">
                  States
                </th>
                <th className="bg-[#15498A] text-white p-3 text-left">
                  # of Devices
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(mapData).map(([key, value]) => {
                const stateCode = key.replace("US-", "");
                return (
                  <tr key={key} className="hover:bg-gray-100 border-b">
                    <td className="p-3 w-[200px]">{stateCode}</td>
                    <td className="p-3">{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Similar structure as above for the world map */}
      <div className="w-full h-[600px] flex flex-col md:flex-row mb-5">
        <div className="md:w-[60%] h-full rounded-[6px] shadow-lg">
          <div className="w-full">
            <h1 className="p-3">International Assets</h1>
            <div className="w-full h-[1px] bg-[#C9C9C9] "></div>
          </div>
          <div className="relative h-[444px] w-full">
            <VectorMap
              className="mt-3"
              map={worldMill}
              backgroundColor="transparent"
              zoomOnScroll={false}
              containerStyle={{ width: "100%", height: "100%" }}
              regionStyle={regionStyle}
              series={worldSeries}
              selectedRegions={selectedRegions}
            />
          </div>
        </div>
        <div className="md:w-[39%] mt-5 md:mt-0 shadow-lg rounded-[6px] h-full">
          <h1 className="p-3">Countries</h1>
          <div className="w-full h-[1px] bg-[#C9C9C9] "></div>
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                <th className="bg-[#15498A] text-white p-3 text-left w-[200px]">
                  Countries
                </th>
                <th className="bg-[#15498A] text-white p-3 text-left">
                  # of Devices
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(worldData).map(([key, value]) => {
                return (
                  <tr key={key} className="hover:bg-gray-100 border-b">
                    <td className="p-3 w-[200px]">{countryNames[key]}</td>
                    <td className="p-3">{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Maps;