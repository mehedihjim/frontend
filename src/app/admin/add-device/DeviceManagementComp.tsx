import React from "react";
import AddDeviceForm from "./AddDeviceForm";

const DeviceManagementComp = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Add IoT Device</h1>

      <div className="w-full">
        <AddDeviceForm />
      </div>
    </div>
  );
};

export default DeviceManagementComp;
