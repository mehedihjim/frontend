import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import DeviceManagementComp from "./DeviceManagementComp";

const page = () => {
  return (
    <DefaultLayout>
      <DeviceManagementComp />
    </DefaultLayout>
  );
};

export default page;
