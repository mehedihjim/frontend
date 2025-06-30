"use client";
import { useParams } from "next/navigation";
import React from "react";
import BasicPageInfo from "./BasicPageInfo";
import { useGetSingleDeviceByDeviceIDQuery } from "@/redux/api/iotDeviceApi";
import DeviceDataShow from "./DeviceDataShow";
import { useGetSingleShedMonitoringDataQuery } from "@/redux/api/shedDataApi";
import DeviceControlBox from "./DeviceControlBox";

const ShedMonitoringPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: singleDeviceData, isLoading: singleDeviceDataLoading } =
    useGetSingleDeviceByDeviceIDQuery({ device_id: id });
  const { data: shedDataByDeviceID, isLoading: shedDataByDeviceIDLoading } =
    useGetSingleShedMonitoringDataQuery(id);

  return (
    <div className="container mx-auto px-2 py-4 lg:px-4">
      <BasicPageInfo deviceData={singleDeviceData?.data} />
      <div className="mt-2">
        <DeviceDataShow latestReading={shedDataByDeviceID?.data[0]} />
      </div>
      <div className="mt-2">
        <DeviceControlBox deviceData={singleDeviceData?.data} />
      </div>
    </div>
  );
};

export default ShedMonitoringPage;
