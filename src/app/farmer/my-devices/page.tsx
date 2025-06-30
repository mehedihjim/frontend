import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import MyDeviceManagement from "./MyDeviceManagement";

const page = () => {
  return (
    <DefaultLayout>
      <MyDeviceManagement />
    </DefaultLayout>
  );
};

export default page;
