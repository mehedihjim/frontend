import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

const page = () => {
  return (
    <DefaultLayout>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-bold">batch Page</h1>
        <p className="text-lg">This is a trial page for the farmer section.</p>
      </div>
    </DefaultLayout>
  );
};

export default page;
