"use client";
import React from "react";
import Image from "next/image";

const BasicPageInfo = ({ deviceData }: any) => {
  return (
    <div className="flex justify-between text-black dark:text-white">
      <div>
        <div>
          {" "}
          <span className="font-bold">Farmer:</span>{" "}
          <span>{deviceData?.farmer}</span>
        </div>
        <div>
          {" "}
          <span className="font-bold">Shed:</span>{" "}
          <span>{deviceData?.shed_name}</span>
        </div>
      </div>
      <div>
        <Image
          className="mt-4"
          src={"/images/logo/poulex-logo.svg"}
          width={115}
          height={75}
          alt="profile"
        />
      </div>
    </div>
  );
};

export default BasicPageInfo;
