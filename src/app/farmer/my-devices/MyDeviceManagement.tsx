import React from "react";
import MyDeviceTable from "./MyDeviceTable";

const MyDeviceManagement = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">My Devices</h1>

      <div className="w-full">
        <MyDeviceTable />
      </div>
    </div>
  );
};

export default MyDeviceManagement;
