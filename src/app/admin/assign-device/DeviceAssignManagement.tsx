import React from "react";
import AssignDeviceForm from "./AssignDeviceForm";

const DeviceAssignManagement = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Assign IoT Device</h1>

      <div className="w-full">
        <AssignDeviceForm />
      </div>
    </div>
  );
};

export default DeviceAssignManagement;
