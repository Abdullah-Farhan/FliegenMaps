'use client'
import React, { useState } from "react";
import CircleImg from "../../../public/roundarr.svg";
import Image from "next/image";

const Circle = () => {
    const [value, setValue] = useState(78)
  return (
    <div className="flex justify-center items-center relative">
      <Image src={CircleImg} width={500} height={500} />
      <div className="absolute text-5xl mb-10">{value}</div>
    </div>
  );
};

export default Circle;
