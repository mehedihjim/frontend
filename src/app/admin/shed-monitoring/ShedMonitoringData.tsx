"use client";
import React from "react";
import ShedDataTable from "./ShedDataTable";

const ShedMonitoringData = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Shed Monitoring Data</h1>
      <div className="w-full">
        <ShedDataTable />
      </div>
    </div>
  );
};

export default ShedMonitoringData;
