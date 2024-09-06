"use client";
import React, { useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { usAea } from "@react-jvectormap/unitedstates";
import { worldMill } from "@react-jvectormap/world";
import { Table, Popover, Button } from "antd";
import "./Maps.css";

const Maps = () => {
  const countryNames = {
    US: "United States",
    CA: "Canada",
    GB: "United Kingdom",
    DE: "Germany",
    FR: "France",
    IT: "Italy",
    ES: "Spain",
    PK: "Pakistan",
    SA: "Saudi Arabia",
    RU: "Russia",
    TR: "Turkey",
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
      fill: "#00448C",
      "fill-opacity": 1.0,
    },
  };

  const [mapData, setMapData] = useState({
    "US-AL": 100,
    "US-AK": 200,
    "US-AZ": 300,
    "US-AR": 400,
    "US-FL": 120,
    "US-TX": 150,
    "US-NY": 30,
    "US-NJ": 50,
    "US-CA": 65,
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
    PK: 450,
    SA: 300,
    RU: 500,
    TR: 69,
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

  const dataSource = Object.entries(mapData).map(([key, value]) => {
    const stateCode = key.replace("US-", "");
    return {
      key,
      States: stateCode,
      devices: mapData[key],
    };
  });

  const world = Object.entries(worldData).map(([key, value]) => {
    return {
      key,
      Countries: countryNames[key],
      devices: worldData[key],
    };
  });

  const renderPopoverContent = (record) => {
  
    return (
      <div>
        <p>Key: {record?.States} : {record?.devices}</p>
        <Button type="primary" onClick={() => console.log('Action 1')}>
          Show Data
        </Button>
        <Button type="default" onClick={() => console.log('Action 2')}>
          Download
        </Button>
      </div>
    )};


  return (
    <div className="p-3">
      {/* USA and the table of its data */}
      <div className="w-full h-[600px] flex flex-col md:flex-row mb-80 md:mb-5">
        {/* USA map */}
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
        {/* USA table */}
        <div className="md:w-[39%] mt-5 md:mt-0 shadow-lg rounded-[6px] h-full ml-[1%]">
          <h1 className="p-3">States</h1>
          <div className="w-full h-[1px] bg-[#C9C9C9] "></div>
          <Table
            className="mt-4"
            rowClassName="bg-white hover:bg-gray-100"
            columns={[
              {
                title: "States",
                dataIndex: "States",
                key: "States",
              },
              {
                title: "# of Devices",
                dataIndex: "devices",
                key: "devices",
              },
            ]}
            dataSource={dataSource}
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
            }}
          />
        </div>
      </div>
      {/* Similar structure for the world map */}
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
        <div className="md:w-[39%] mt-5 md:mt-0 shadow-lg rounded-[6px] h-full ml-[1%]">
          <h1 className="p-3">Countries</h1>
          <div className="w-full h-[1px] bg-[#C9C9C9] "></div>
          <Table
            className="mt-4"
            rowClassName="bg-white hover:bg-gray-100"
            columns={[
              {
                title: "Countries",
                dataIndex: "Countries",
                key: "Countries",
              },
              {
                title: "# of Devices",
                dataIndex: "devices",
                key: "devices",
              },
            ]}
            dataSource={world}
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
            }}
            components={{
              body: {
                row: ({ record, children, ...rest }) => (
                  <Popover
                    content={renderPopoverContent(record)}
                    trigger="click"
                    placement="top"
                  >
                    <tr {...rest}>{children}</tr>
                  </Popover>
                ),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Maps;