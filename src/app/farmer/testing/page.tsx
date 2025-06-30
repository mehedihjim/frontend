import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import ShedManagement from "./ShedManagement";

const page = () => {
  return (
    <div>
      <DefaultLayout>
        <ShedManagement />
      </DefaultLayout>
    </div>
  );
};

export default page;
